import express from "express";
import { getEmployeesByBusinessOwner, 
        createEmployeeForBusinessOwner } from "../../controllers/client/employeeController.js";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";

const router = express.Router();

// ✅ Business Owners can only view their own employees
router.get("/", authenticateBusinessOwner, getEmployeesByBusinessOwner);
// ✅ Business Owners can only add employees to their own business
router.post("/", authenticateBusinessOwner, createEmployeeForBusinessOwner);

export default router;
