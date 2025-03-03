import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
//dotenv.config();

// Ensure correct JWT secret key from .env
const JWT_SECRET = process.env.JWT_SECRET_CLIENT;

/**
 * Middleware to authenticate Business Owners
 */
export const authenticateBusinessOwner = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token or incorrect format received.");
      return res.status(401).json({ error: "Invalid or missing token format." });
  }

  const token = authHeader.split(" ")[1];
  //console.log("🔹 Received Token:", token);

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      console.error("❌ JWT Verification Failed:", err);
      return res.status(403).json({ error: "Invalid token" });
  }
};


/**
 * Middleware to check role-based access for Business Owners
 */
export const authorizeBusinessOwner = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.bo_role)) {
      return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
    }
    next();
  };
};
