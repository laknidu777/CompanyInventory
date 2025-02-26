import Employee from "../../models/monitoring/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_MONITORING;

/**
 * Employee Login
 */
export const employeeLogin = async (req, res) => {
    const { emp_email, password } = req.body;
  
    try {
      const employee = await Employee.findOne({ where: { emp_email } });
      if (!employee) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        {
          emp_id: employee.emp_id,
          emp_email: employee.emp_email,
          emp_role: employee.emp_role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// 🔐 Signup Employee
export const signupEmployee = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_contact_number, emp_role, emp_designation, emp_department, password } = req.body;

    if (!emp_name || !emp_email || !password || !emp_role) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Check if email is already registered
    const existingEmployee = await Employee.findOne({ where: { emp_email } });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee email already registered." });
    }

    // Create employee
    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_contact_number,
      emp_role,
      emp_designation,
      emp_department,
      password, // Hashing is handled in Model
    });

    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (error) {
    console.error("Error signing up employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
