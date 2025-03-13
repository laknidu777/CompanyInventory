import ManuProduct from "../../../models/client/manufacturing/manu_product.js";
import Business from "../../../models/client/business.js";

/**
 * Create a new manufacturing product
 */
export const createProduct = async (req, res) => {
  try {
    const { business_id, product_name, quantity } = req.body;

    if (!business_id || !product_name || !quantity) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Check if business exists before creating a product
    const businessExists = await Business.findByPk(business_id);
    if (!businessExists) {
      return res.status(400).json({ error: "Invalid business_id: Business does not exist." });
    }
    const newProduct = await ManuProduct.create({ business_id, product_name, quantity });
    return res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//get product from employee
export const getProductsForEmployee = async (req, res) => {
  try {
    const assignedBusinessId = req.user.assigned_business_id; // ✅ Extract from token

    if (!assignedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: No business assigned to employee." });
    }

    // Fetch only products from the assigned business
    const products = await ManuProduct.findAll({
      where: { business_id: assignedBusinessId }
    });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching employee products:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
/**
 * Get all products for a business
 */
export const getProductsByBusiness = async (req, res) => {
  try {
    console.log("🔹 User making request:", req.user);

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found in request." });
    }

    const { business_id } = req.params;

    // Check if Business Owner is making the request
    if (req.user.isBusinessOwner) {
      const business = await Business.findOne({ where: { id: business_id, owner_id: req.user.bo_id } });

      if (!business) {
        return res.status(403).json({ error: "Unauthorized: You do not own this business." });
      }
    } else {
      // Check if Employee is accessing the correct business
      if (req.user.assigned_business_id !== parseInt(business_id)) {
        return res.status(403).json({ error: "Unauthorized: You cannot access this business's products." });
      }
    }

    const products = await ManuProduct.findAll({ where: { business_id } });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

