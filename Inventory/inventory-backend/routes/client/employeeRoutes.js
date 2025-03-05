import express from "express";
import { 
  employeeLogin,
  getEmployeeProfile,
  updateEmployeeSelf,
  getEmployeesByBusinessEmployees, 
  createEmployeeByEmployee, 
  updateEmployeeByEmployee,   
  deleteEmployeeByEmployee
} from "../../controllers/client/employeeController.js";
import { authenticateEmployee } from "../../middlewares/client/authEmployee.js";
import { authorizeRoles } from "../../middlewares/client/roleMiddleware.js"

const router = express.Router();
// ✅ Employee Login Route
router.post("/login", employeeLogin);
// ✅ Employees Can View & Edit Their Own Profile
router.get("/profile", authenticateEmployee, getEmployeeProfile);
router.put("/profile", authenticateEmployee, updateEmployeeSelf);
// ✅ Role-Based Employee Management (New Routes)
router.get("/manage", 
        authenticateEmployee, 
        authorizeRoles("Super Admin", "Admin", "HR", "Manager", "Viewer"),
        getEmployeesByBusinessEmployees
      );
router.post("/manage", 
        authenticateEmployee, 
        authorizeRoles("Super Admin", "Admin", "HR"),
        createEmployeeByEmployee
      );
router.put("/manage/:emp_id", 
        authenticateEmployee, 
        authorizeRoles("Super Admin", "Admin", "HR"),
        updateEmployeeByEmployee
      );
router.delete("/manage/:emp_id", 
        authenticateEmployee, 
        authorizeRoles("Super Admin", "Admin","HR"),
        deleteEmployeeByEmployee
      );
export default router;
