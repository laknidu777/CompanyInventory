import InventoryItem from "../../models/client/inventoryitem.js";
import Business from "../../models/client/businessowner.js"; // for ownership validation
import { checkPermission as hasPermission } from "../../middlewares/client/checkPermission.js";
import Sequelize, { Op } from 'sequelize';

// Helper to get user identifier
const getUserId = (user) => {
  return user.bo_id ? `bo_${user.bo_id}` : `emp_${user.emp_id}`;
};// 📦 GET all inventory items for a business
export const getInventoryItems = async (req, res) => {
    try {
      const { business_id } = req.params;
      const { page = 1, limit = 5, search = '' } = req.query;
  
      const offset = (parseInt(page) - 1) * parseInt(limit);
  
      // Only fetch for authorized business
      const whereCondition = {
        business_id,
        ...(search && {
            [Op.or]: [
                // Use sequelize.where + fn + col to force lowercase comparison
                {
                  [Op.and]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), {
                      [Op.like]: `%${search.toLowerCase()}%`,
                    }),
                  ]
                },
                {
                  [Op.and]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category')), {
                      [Op.like]: `%${search.toLowerCase()}%`,
                    }),
                  ]
                }
              ]              
        })
      };
  
      const { rows: items, count: totalItems } = await InventoryItem.findAndCountAll({
        where: whereCondition,
        offset,
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']],
      });
  
      const totalPages = Math.ceil(totalItems / limit);
  
      res.json({ items, totalPages });
    } catch (err) {
      console.error("Inventory fetch error:", err);
      res.status(500).json({ error: "Failed to fetch inventory items." });
    }
  }

// 📦 GET single item
export const getInventoryItemById = async (req, res) => {
  try {
    const { business_id, item_id } = req.params;

    const item = await InventoryItem.findOne({ where: { business_id, id: item_id } });

    if (!item) return res.status(404).json({ error: "Item not found" });

    const userId = getUserId(req.user);
    const isOwner = req.user.bo_id;

    if (!isOwner) {
      const allowed = await hasPermission(req.user.emp_id, business_id, 'Inventory', 'Read');
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    res.json({ item });
  } catch (err) {
    console.error("Fetch item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 📦 POST create new inventory item
export const createInventoryItem = async (req, res) => {
    try {
      const { business_id } = req.params;
      const bo_id = req.user.bo_id;
      const {
        name,
        category,
        type,
        unique_number,
        quantity,
        components,
        description,
      } = req.body;
  
      const payload = {
        business_id,
        name,
        category,
        type,
        description,
        created_by: `bo_${bo_id}`,
        updated_by: `bo_${bo_id}`,
      };
  
      let finalQuantity = quantity;
  
      if (type === "single-item") {
        if (!unique_number) return res.status(400).json({ error: "Unique number is required" });
        payload.unique_number = unique_number;
        finalQuantity = 1; // Always 1 for single-item
      }
  
      if (type === "item-group") {
        if (!finalQuantity || finalQuantity < 1) {
          return res.status(400).json({ error: "Quantity must be at least 1" });
        }
      }
  
      if (type === "composite-item") {
        if (!Array.isArray(components) || components.length === 0)
          return res.status(400).json({ error: "Components are required for composite item" });
  
        if (!finalQuantity || finalQuantity < 1) {
          return res.status(400).json({ error: "Quantity is required for composite item and must be at least 1" });
        }
  
        payload.components = components;
      }
  
      payload.quantity = finalQuantity;
  
      const item = await InventoryItem.create(payload);
      res.status(201).json({ message: "Item created successfully", item });
  
    } catch (err) {
      console.error("Create item error:", err);
      res.status(500).json({ error: "Server error while creating item" });
    }
  };  
// 📦 PUT update item
export const updateInventoryItem = async (req, res) => {
  try {
    const { business_id, item_id } = req.params;
    const { name, category, quantity, type } = req.body;

    const userId = getUserId(req.user);
    const isOwner = req.user.bo_id;

    if (!isOwner) {
      const allowed = await hasPermission(req.user.emp_id, business_id, 'Inventory', 'Update');
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    const item = await InventoryItem.findOne({ where: { business_id, id: item_id } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = name;
    item.category = category;
    item.quantity = quantity;
    item.type = type;
    item.updated_by = userId;

    await item.save();

    res.json({ item });
  } catch (err) {
    console.error("Update item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 📦 DELETE item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { business_id, item_id } = req.params;

    const userId = getUserId(req.user);
    const isOwner = req.user.bo_id;

    if (!isOwner) {
      const allowed = await hasPermission(req.user.emp_id, business_id, 'Inventory', 'Delete');
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    const item = await InventoryItem.findOne({ where: { business_id, id: item_id } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
