import express from "express";
import cors from "cors";
import { inventoryDB, monitoringDB } from "./db.js"; 

// Import Routes
//client side routes
import businessOwnerRoutes from "./routes/client/businessOwners.js";
import businessOwnerEmployeeRoutes from "./routes/client/bussinessOwnerEmployeeRoutes.js";
import employeeClientRoutes from "./routes/client/employeeRoutes.js";
import manufacturingRoutes from "./routes/client/manufacturingRoutes.js";
//monitoring side routes
import employeeRoutes from "./routes/monitoring/employeeRoutes.js";
import employeeAuthRoutes from "./routes/monitoring/employeeAuthRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

// Routes
//Monitoring Side Routes
app.use("/api/monitoring/employees/auth", employeeAuthRoutes);
app.use("/api/monitoring/employees", employeeRoutes);

//Client Side Routes
app.use("/api/employees", employeeClientRoutes);
app.use("/api/business-owners", businessOwnerRoutes);
// Business Owners Managing Employees

app.use("/api/business-owners", businessOwnerEmployeeRoutes);
// Ensure both databases are connected before starting the server
(async () => {
  try {
    await inventoryDB.authenticate();
    console.log("✅ Connected to Inventory Database");

    await monitoringDB.authenticate();
    console.log("✅ Connected to Monitoring Database");

    app.listen(5002, () => {
      console.log("🚀 Server running on port 5002");
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
})();
