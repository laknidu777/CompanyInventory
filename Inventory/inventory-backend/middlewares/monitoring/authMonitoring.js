import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Ensure correct JWT secret key from .env
const JWT_SECRET = process.env.JWT_SECRET_MONITORING;

export const authenticateMonitoring = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export const authorizeMonitoringRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.emp_role)) {
      return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
    }
    next();
  };
};
