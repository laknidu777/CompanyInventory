import express from "express";
import { getEmployeesByBusiness, 
        createEmployeeForBusinessOwner,
        updateEmployee,
        deleteEmployee,
         } from "../../controllers/client/employeeController.js";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";
import { authorizeRoles } from "../../middlewares/client/roleMiddleware.js";

const router = express.Router();

router.get("/:business_id", authenticateBusinessOwner, authorizeRoles("Super Admin", "Admin", "Manager", "HR", "Viewer"), getEmployeesByBusiness);
router.post("/:business_id", authenticateBusinessOwner, authorizeRoles("Super Admin", "Admin", "HR"), createEmployeeForBusinessOwner);
router.put("/:emp_id", authenticateBusinessOwner, authorizeRoles("Super Admin", "Admin", "HR", "Manager"), updateEmployee);
router.delete("/:emp_id", authenticateBusinessOwner, authorizeRoles("Super Admin", "Admin"), deleteEmployee);



export default router;
