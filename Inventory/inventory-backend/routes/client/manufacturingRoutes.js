import express from "express";
import { createProduct, getProductsByBusiness,
        getProductsForEmployee
 } from "../../controllers/client/manufacturing/productController.js";
import { createProcess, 
    getProcessesByBusinessOwner,
    getProcessesForEmployee } from "../../controllers/client/manufacturing/processController.js";
import { createProcessDependency } from "../../controllers/client/manufacturing/processDependencyController.js";
import { assignProductToClient,
     getAssignedProductsForClient } from "../../controllers/client/manufacturing/processAssignmentController.js";
import { authorizeRoles } from "../../middlewares/client/roleMiddleware.js";
import { authenticateBusinessOwner } from "../../middlewares/client/authBusinessOwner.js";
import { authenticateEmployee } from "../../middlewares/client/authEmployee.js";
const router = express.Router();

// Product Routes
router.post("/products", authorizeRoles(["Admin", "Super Admin"]), createProduct);
router.get("/products/:business_id",authenticateBusinessOwner, getProductsByBusiness);
router.get("/products",authenticateEmployee ,getProductsForEmployee);

// Process Routes
router.post("/processes", authorizeRoles(["Admin", "Super Admin"]), createProcess);
router.get("/processes/:business_id", authenticateBusinessOwner, getProcessesByBusinessOwner);
router.get("/processes", authenticateEmployee, getProcessesForEmployee);

// Process Dependency Routes
router.post("/dependencies", authorizeRoles(["Admin", "Super Admin"]), createProcessDependency);

// Process Assignment Routes
router.post("/assignments", authorizeRoles(["Admin", "Super Admin"]), assignProductToClient);
router.get("/assignments/:client_id", getAssignedProductsForClient);

export default router;
