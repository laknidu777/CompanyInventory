import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js"; // Import auth middleware
import { getUsers } from "../controllers/userController.js"; // Import user controller

const router = express.Router();

// ✅ Protect this route with JWT
router.get("/users", authMiddleware, getUsers);

export default router;
