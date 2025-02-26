import express from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Signup Route
router.post("/signup", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["superadmin", "admin", "editor", "viewer"]).withMessage("Invalid role")
], signup);

// Login Route
router.post("/login", login);

export default router;
