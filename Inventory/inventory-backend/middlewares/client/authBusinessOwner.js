import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import Business from "../../models/client/business.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
//dotenv.config();

// Ensure correct JWT secret key from .env
const JWT_SECRET = process.env.JWT_SECRET_CLIENT;

export const authenticateBusinessOwner = (req, res, next) => {
  const token = req.cookies.accessToken; // Read token from cookies

  if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
      const decoded = jwt.verify(token,JWT_SECRET);
      req.user = decoded;
      if (!req.user.bo_id) {
        return res.status(403).json({ error: "Invalid token: Missing Business Owner ID" });
    }
      next();
  } catch (err) {
      console.error("JWT Verification Failed:", err);
      return res.status(403).json({ error: "Invalid or expired token" });
  }
};



export const validateBusinessAccess = async (req, res, next) => {
  try {
    const { business_id } = req.params;
    const user_id = req.user.bo_id; // Get Business Owner ID from token

    // Check if the business belongs to the logged-in user
    const business = await Business.findOne({ where: { id: business_id, owner_id: user_id } });

    if (!business) {
      return res.status(403).json({ error: "Unauthorized access to this business" });
    }

    next(); // Proceed if valid
  } catch (error) {
    console.error("Business access validation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Middleware to check if business_id exists after selection
export const validateBusinessSelection = (req, res, next) => {
  if (!req.user.business_id) {
      return res.status(403).json({ error: "Unauthorized: No business selected" });
  }
  next();
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
