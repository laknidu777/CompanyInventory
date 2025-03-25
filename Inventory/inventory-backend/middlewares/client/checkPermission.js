import RolePermission from "../../models/client/rolePermission.js";

export const checkPermission = (module, permissionType) => {
  return async (req, res, next) => {
    try {
      // Super Admin (Business Owner) is always allowed
      if (req.user.bo_id) return next();

      const role = req.user.emp_role;
      const business_id = req.user.assigned_business_id;

      if (!role || !business_id) {
        return res.status(400).json({ error: "Missing role or business ID" });
      }

      const permissionEntry = await RolePermission.findOne({
        where: {
          role,
          business_id,
          module,
        },
      });

      if (!permissionEntry || !permissionEntry.permissions?.[permissionType]) {
        return res.status(403).json({ error: `Access denied: You don't have ${permissionType} access to ${module}` });
      }

      next();
    } catch (err) {
      console.error("Permission check failed:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
