import express from "express";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";
import { getBusinessById } from "../../controllers/client/businessController.js";

const router = express.Router();

router.get("/:id", authenticateBusinessOwner, getBusinessById);

export default router;