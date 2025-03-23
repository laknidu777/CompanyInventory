import express from "express";
import { createBusinessOwner,
         businessOwnerLogin,
         selectBusiness,refreshToken,businessOwnerLogout,
        getBusinessOwnerBusinesses,
        getUser } from "../../controllers/client/businessOwnerController.js";
import { createBusiness } from "../../controllers/client/businessController.js";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";

const router = express.Router();

router.post("/signup", createBusinessOwner);
router.post("/login", businessOwnerLogin);
router.get("/user", authenticateBusinessOwner, getUser);
router.post("/logout", businessOwnerLogout);
router.post("/refresh-token", refreshToken); 
router.get("/my-businesses", authenticateBusinessOwner, getBusinessOwnerBusinesses);
router.post("/create-business", authenticateBusinessOwner, createBusiness);
router.post("/select-business", authenticateBusinessOwner, selectBusiness);

export default router;
