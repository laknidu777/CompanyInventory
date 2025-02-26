import express from "express";
import { signupEmployee, employeeLogin } from "../../controllers/monitoring/employeeAuthController.js";

const router = express.Router();

router.post("/signup", signupEmployee); // Employee signup
router.post("/login", employeeLogin);

export default router;
