import express from "express";
import { 
  createEmployee, 
  getEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee 
} from "../../controllers/monitoring/employeeController.js";
import { authenticateMonitoring, authorizeMonitoringRoles } from "../../middlewares/monitoring/authMonitoring.js"; 

const router = express.Router();

// ✅ Apply authentication & role-based access
router.post("/", authenticateMonitoring, authorizeMonitoringRoles("Super Admin", "HR"), createEmployee);
router.get("/", authenticateMonitoring, authorizeMonitoringRoles("Super Admin", "HR", "Admin", "Manager"), getEmployees);
router.get("/:id", authenticateMonitoring, authorizeMonitoringRoles("Super Admin", "HR", "Admin", "Manager"), getEmployeeById);
router.patch("/:id", authenticateMonitoring, authorizeMonitoringRoles("Super Admin"), updateEmployee);
router.delete("/:id", authenticateMonitoring, authorizeMonitoringRoles("Super Admin"), deleteEmployee);

export default router;
