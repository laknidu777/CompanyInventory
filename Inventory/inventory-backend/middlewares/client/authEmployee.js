import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const EMPLOYEE_JWT_SECRET = process.env.EMPLOYEE_JWT_SECRET; // ✅ Use the correct secret

export const authenticateEmployee = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid or missing token format." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, EMPLOYEE_JWT_SECRET); // ✅ Verify employee token
    
    req.user = {
      emp_id: decoded.emp_id,
      emp_role: decoded.emp_role,
      assigned_business_id: decoded.assigned_business_id, // ✅ Ensure proper assignment
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
