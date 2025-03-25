// routes/client/rolePermissionRoutes.js
import express from "express";
import { saveRolePermissions,getRolePermissions } from "../../controllers/client/rolePermissionController.js";
import { authenticateBusinessOwner, validateBusinessAccess } from "../../middlewares/client/authBusinessOwner.js";

const router = express.Router();

router.post(
  "/:business_id/permissions",
  authenticateBusinessOwner,
  validateBusinessAccess, // 🛡️ Ensure this business belongs to logged-in BO
  saveRolePermissions
);

router.get(
  "/:business_id/permissions",
  authenticateBusinessOwner,
  validateBusinessAccess,
  getRolePermissions
);

export default router;
