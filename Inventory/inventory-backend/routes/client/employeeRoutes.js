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
import { checkPermission } from "../../middlewares/client/checkPermission.js";

const router = express.Router();
// ✅ Employee Login Route
router.post("/login", employeeLogin);
// ✅ Employees Can View & Edit Their Own Profile
router.get("/profile", authenticateEmployee, getEmployeeProfile);
router.put("/profile", authenticateEmployee, updateEmployeeSelf);
// ✅ Role-Based Employee Management (New Routes)
router.get("/manage", 
        authenticateEmployee, 
        checkPermission("Employees", "Read"),
        getEmployeesByBusinessEmployees
      );
router.post("/manage", 
        authenticateEmployee, 
        checkPermission("Employees", "Create"),
        createEmployeeByEmployee
      );
router.put("/manage/:emp_id", 
        authenticateEmployee, 
        checkPermission("Employees", "Update"),
        updateEmployeeByEmployee
      );
router.delete("/manage/:emp_id", 
        authenticateEmployee, 
        checkPermission("Employees", "Delete"),
        deleteEmployeeByEmployee
      );
export default router;
