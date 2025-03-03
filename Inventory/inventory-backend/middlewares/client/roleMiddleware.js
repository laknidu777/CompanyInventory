export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.bo_role || req.user.emp_role; // ✅ Check both roles
      console.log("🔹 User Role:", userRole);
      console.log("🔹 Allowed Roles:", allowedRoles);
  
      if (!userRole || !allowedRoles.includes(userRole)) {
        //console.log("❌ Access Denied - Role Not Allowed");
        return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
      }
  
      //console.log("✅ Access Granted");
      next();
    };
  };
  