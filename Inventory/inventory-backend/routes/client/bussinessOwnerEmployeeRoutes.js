import express from "express";
import { 
  getEmployeesByBusiness, 
  createEmployeeByBusinessOwner, 
  updateEmployee, 
  deleteEmployee ,getEmployeeById
} from "../../controllers/client/employeeController.js";

import { authenticateBusinessOwner, validateBusinessAccess} from "../../middlewares/client/authBusinessOwner.js";
import { authorizeRoles } from "../../middlewares/client/roleMiddleware.js";

const router = express.Router();

// Business Owner View Employees
router.get("/:business_id/employees", 
    authenticateBusinessOwner, 
    validateBusinessAccess, // 🔹 NEW: Ensures user owns the business
    authorizeRoles("Super Admin", "Admin", "HR", "Manager", "Viewer"), 
    getEmployeesByBusiness
  );
  
  
// Business Owner Create Employee
router.post("/:business_id/employees",
  authenticateBusinessOwner,
  authorizeRoles("Super Admin", "Admin", "HR"),
  createEmployeeByBusinessOwner
);
// Business Owner Update Employee
router.put("/employees/:emp_id",
  authenticateBusinessOwner,
  authorizeRoles("Super Admin", "Admin", "HR", "Manager"),
  updateEmployee
);
router.get("/employees/:emp_id",
  authenticateBusinessOwner,
  authorizeRoles("Super Admin", "Admin", "HR", "Manager", "Viewer"),
  getEmployeeById
);
// Business Owner Delete Employee
router.delete("/employees/:emp_id",
  authenticateBusinessOwner,
  authorizeRoles("Super Admin", "Admin"),
  deleteEmployee
);
export default router;
