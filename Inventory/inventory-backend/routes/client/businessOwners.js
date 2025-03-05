import express from "express";
import { createBusinessOwner,
         businessOwnerLogin,
         selectBusiness } from "../../controllers/client/businessOwnerController.js";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";

const router = express.Router();

router.post("/signup", createBusinessOwner);
router.post("/login",businessOwnerLogin);
router.post("/select-business", authenticateBusinessOwner, selectBusiness);

export default router;
