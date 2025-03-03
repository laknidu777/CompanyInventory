import bcrypt from "bcryptjs";
import Employee from "../../models/client/employee.js";


export const getEmployeesByBusinessOwner = async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { bo_id: req.user.bo_id } });
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmployeeForBusinessOwner = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role, emp_password } = req.body;

    if (!emp_name || !emp_email || !emp_role || !emp_password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(emp_password, 10);

    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_role,
      emp_password: hashedPassword, // Store hashed password
      bo_id: req.user.bo_id,
    });

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
