import express from "express";
import { createProduct, getProductsByBusiness } from "../../controllers/client/manufacturing/productController.js";
import { createProcess, getProcessesByProduct } from "../../controllers/client/manufacturing/processController.js";
import { createProcessDependency } from "../../controllers/client/manufacturing/processDependencyController.js";
import { assignProductToClient, getAssignedProductsForClient } from "../../controllers/client/manufacturing/processAssignmentController.js";

const router = express.Router();

// Product Routes
router.post("/products", createProduct);
router.get("/products/:business_id", getProductsByBusiness);

// Process Routes
router.post("/processes", createProcess);
router.get("/processes/:product_id", getProcessesByProduct);

// Process Dependency Routes
router.post("/dependencies", createProcessDependency);

// Process Assignment Routes
router.post("/assignments", assignProductToClient);
router.get("/assignments/:client_id", getAssignedProductsForClient);

export default router;
