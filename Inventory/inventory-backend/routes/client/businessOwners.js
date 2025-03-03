import express from "express";
import { createBusinessOwner, businessOwnerLogin } from "../../controllers/client/businessOwnerController.js";

const router = express.Router();

router.post("/signup", createBusinessOwner);
router.post("/login", businessOwnerLogin);

export default router;
