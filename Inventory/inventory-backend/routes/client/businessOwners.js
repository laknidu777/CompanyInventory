import express from "express";
import { createBusinessOwner, businessOwnerLogin } from "../../controllers/client/businessOwnerController.js";

const router = express.Router();

// ✅ Business Owner Signup
router.post("/signup", createBusinessOwner);
// ✅ Business Owner Login
router.post("/login", businessOwnerLogin);

export default router;
