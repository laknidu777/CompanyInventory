import express from "express";
import { 
  employeeLogin,
  getEmployeeProfile,
  updateEmployeeSelf
} from "../../controllers/client/employeeController.js";
import { authenticateEmployee } from "../../middlewares/client/authEmployee.js";


const router = express.Router();

// ✅ Employee Login Route
router.post("/login", employeeLogin);

// ✅ Employees Can View & Edit Their Own Profile
router.get("/profile", authenticateEmployee, getEmployeeProfile);
router.put("/profile", authenticateEmployee, updateEmployeeSelf);//

export default router;
