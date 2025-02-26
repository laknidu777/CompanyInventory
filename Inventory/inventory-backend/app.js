import express from "express";
import cors from "cors";
import { inventoryDB, monitoringDB } from "./db.js"; 

// Import Routes
import businessOwnerRoutes from "./routes/businessOwners.js";
//import authRoutes from "./routes/authRoutes.js";
//import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/monitoring/employeeRoutes.js";
import employeeAuthRoutes from "./routes/monitoring/employeeAuthRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees/auth", employeeAuthRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/business-owners", businessOwnerRoutes);
//app.use("/api/auth", authRoutes);
//app.use("/api/users", userRoutes);

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
