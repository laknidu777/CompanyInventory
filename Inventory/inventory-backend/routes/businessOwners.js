import express from "express";
import { getAllBusinessOwners,
    createBusinessOwner,
    getBusinessOwnerById,
    deleteBusinessOwner,
    updateBusinessOwner } from "../controllers/businessOwnerController.js";
//import { authenticate } from "../middlewares/authmiddleware.js";

const router = express.Router();

// router.get("/", authenticate, getAllBusinessOwners);
// router.post("/", authenticate, createBusinessOwner);

router.get("/", getAllBusinessOwners);
router.post("/", createBusinessOwner);
router.get("/:id", getBusinessOwnerById);
router.delete("/:id", deleteBusinessOwner);
router.patch("/:id", updateBusinessOwner);


export default router;
