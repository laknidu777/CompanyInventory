import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Required for reading cookies
import { inventoryDB, monitoringDB } from "./db.js";

// Import Routes
import businessOwnerRoutes from "./routes/client/businessOwners.js";
import businessOwnerEmployeeRoutes from "./routes/client/bussinessOwnerEmployeeRoutes.js";
import employeeClientRoutes from "./routes/client/employeeRoutes.js";
import manufacturingRoutes from "./routes/client/manufacturingRoutes.js";
import employeeRoutes from "./routes/monitoring/employeeRoutes.js";
import employeeAuthRoutes from "./routes/monitoring/employeeAuthRoutes.js";
import businessRoutes from "./routes/client/businessRoutes.js";

const app = express();

// ✅ Apply CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true // Allows cookies to be sent in requests
}));

app.use(express.json());
app.use(cookieParser()); // ✅ Enable Cookie Parsing

// Routes
app.use("/api/monitoring/employees/auth", employeeAuthRoutes);
app.use("/api/monitoring/employees", employeeRoutes);
app.use("/api/employees", employeeClientRoutes);
app.use("/api/business-owners", businessOwnerRoutes);
app.use("/api/manufacturing", manufacturingRoutes);
app.use("/api/business-owners", businessOwnerEmployeeRoutes);
app.use("/api/business-owners/business", businessRoutes); 

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
