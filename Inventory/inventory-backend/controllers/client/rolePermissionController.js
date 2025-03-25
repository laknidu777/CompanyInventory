import RolePermission from "../../models/client/rolePermission.js";
import Business from "../../models/client/business.js"; 

export const saveRolePermissions = async (req, res) => {
  try {
    const { business_id } = req.params;
    const { permissions } = req.body;
    const bo_id = req.user.bo_id;

    // 🛡️ Ensure Business Owner owns the business
    const business = await Business.findOne({ where: { id: business_id, owner_id: bo_id } });
    if (!business) {
      return res.status(403).json({ error: "Unauthorized: You do not own this business" });
    }

    // 🧠 Flatten the nested permissions structure
    const updates = [];
    for (const role in permissions) {
      for (const module in permissions[role]) {
        updates.push({
          business_id,
          role,
          module,
          permissions: permissions[role][module]
        });
      }
    }

    // 🧼 Remove existing permissions for this business (to avoid duplicate insert)
    await RolePermission.destroy({ where: { business_id } });

    // 🔁 Bulk insert
    await RolePermission.bulkCreate(updates);

    res.json({ message: "Permissions updated successfully" });
  } catch (err) {
    console.error("Permission update error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// controllers/client/rolePermissionController.js

export const getRolePermissions = async (req, res) => {
    try {
      const { business_id } = req.params;
      const bo_id = req.user.bo_id;
  
      const business = await Business.findOne({ where: { id: business_id, owner_id: bo_id } });
      if (!business) {
        return res.status(403).json({ error: "Unauthorized: You do not own this business" });
      }
  
      const records = await RolePermission.findAll({ where: { business_id } });
  
      // Convert flat DB format to nested { role: { module: { permissionType: boolean } } }
      const result = {};
  
      for (const record of records) {
        const { role, module, permissions } = record;
  
        if (!result[role]) result[role] = {};
        result[role][module] = permissions;
      }
  
      res.json({ permissions: result });
    } catch (err) {
      console.error("Fetch role permissions error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  