import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const JWT_SECRET = process.env.JWT_SECRET_CLIENT;

export const authenticateEmployee = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid or missing token format." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // ✅ Restrict access to the employee's own business
    req.user = {
      emp_id: decoded.emp_id,
      emp_role: decoded.emp_role,
      business_id: decoded.business_id,
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
