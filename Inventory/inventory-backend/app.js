import express from "express";
import cors from "cors";
import { inventoryDB, monitoringDB } from "./db.js"; 
import dotenv from "dotenv";
dotenv.config();


// Import Routes
import businessOwnerRoutes from "./routes/client/businessOwners.js";
import bussiness_employeeRoutes from "./routes/client/employeeRoutes.js";
import employeeRoutes from "./routes/monitoring/employeeRoutes.js";
import employeeAuthRoutes from "./routes/monitoring/employeeAuthRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
//Monitoring Side Routes
app.use("/api/employees/auth", employeeAuthRoutes);
app.use("/api/employees", employeeRoutes);

//Client Side Routes
app.use("/api/business-owners", businessOwnerRoutes);
app.use("/api/business-owners/employees", bussiness_employeeRoutes);

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
