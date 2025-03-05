import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../../models/client/employee.js";
import Business from "../../models/client/business.js";

export const employeeLogin = async (req, res) => {
  try {
      //console.log("🔹 Login Request Received:", req.body);
      const { emp_email, emp_password } = req.body;

      // Check if email exists in database
      const employee = await Employee.findOne({ where: { emp_email } });
      if (!employee) {
          console.log("❌ Employee not found");
          return res.status(401).json({ error: "Invalid email or password" });
      }
      //console.log("✅ Employee Found:", employee);

      // Compare password
      const isMatch = await bcrypt.compare(emp_password, employee.emp_password);
      if (!isMatch) {
          console.log("❌ Password incorrect");
          return res.status(401).json({ error: "Invalid email or password" });
      }
      //console.log("✅ Password Matched");

      // Generate Token
      const token = jwt.sign(
          {
              emp_id: employee.emp_id,
              emp_email: employee.emp_email,
              emp_role: employee.emp_role,
              assigned_business_id: employee.assigned_business_id
          },
          process.env.EMPLOYEE_JWT_SECRET,
          { expiresIn: "6h" }
      );

      //console.log("✅ Token Generated:", token);
      res.json({ message: "Login successful", token });
  } catch (error) {
      console.error("🔥 Login Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role, emp_password } = req.body;
    const { business_id } = req.params;

    if (!emp_name || !emp_email || !emp_role || !emp_password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Allow Business Owners or Employees to create an employee
    const isBusinessOwner = req.user.bo_id ? true : false;
    const isEmployee = req.user.emp_id ? true : false;

    if (!isBusinessOwner && !isEmployee) {
      return res.status(403).json({ error: "Unauthorized: Only Business Owners or Admin/HR Employees can create employees." });
    }

    // ✅ Ensure Admins & HR Employees can only create employees within their assigned business
    if (isEmployee && req.user.assigned_business_id !== parseInt(business_id)) {
      return res.status(403).json({ error: "Unauthorized: You can only create employees in your assigned business." });
    }

    // ✅ Hash password before storing
    const hashedPassword = await bcrypt.hash(emp_password, 10);

    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_role,
      emp_password: hashedPassword,
      assigned_business_id: business_id,
      bo_id: isBusinessOwner ? req.user.bo_id : null // ✅ Store Business Owner ID if applicable
    });

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployeesByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;

    const employees = await Employee.findAll({
      where: { assigned_business_id: business_id },
      attributes: ["emp_id", "emp_name", "emp_email", "emp_role", "assigned_business_id"],
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployeeSelf = async (req, res) => {
  try {
    const { emp_name, emp_email } = req.body;
    const emp_id = req.user.emp_id; 

    if (!emp_name && !emp_email) {
      return res.status(400).json({ error: "At least one field is required to update." });
    }

    const employee = await Employee.findOne({ where: { emp_id } });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    if (req.body.emp_role) {
      return res.status(403).json({ error: "You cannot change your role." });
    }

    if (emp_name) employee.emp_name = emp_name;
    if (emp_email) employee.emp_email = emp_email;

    await employee.save();
    res.json({ message: "Profile updated successfully", employee });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { emp_id: req.user.emp_id },
      attributes: ["emp_id", "emp_name", "emp_email", "emp_role", "assigned_business_id", "createdAt"],
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const { emp_name, emp_email, emp_role, emp_password } = req.body;

    console.log(`🔹 Updating Employee ID: ${emp_id}`);

    // ✅ Find Employee using `assigned_business_id`
    const employee = await Employee.findByPk(emp_id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // ✅ Ensure the update request is coming from the correct business
    if (req.user.assigned_business_id && req.user.assigned_business_id !== employee.assigned_business_id) {
      return res.status(403).json({ error: "Unauthorized: Cannot update employees from another business." });
    }

    // ✅ Update fields only if provided
    if (emp_name) employee.emp_name = emp_name;
    if (emp_email) employee.emp_email = emp_email;
    if (emp_role) employee.emp_role = emp_role;
    if (emp_password) employee.emp_password = await bcrypt.hash(emp_password, 10);

    await employee.save();

    res.json({ message: "Employee updated successfully", employee });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const selectedBusinessId = req.user.business_id; // ✅ Fix: Get business_id from req.user

    if (!selectedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: No business selected." });
    }

    // Fetch the employee to verify business ownership
    const employee = await Employee.findByPk(emp_id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    if (employee.assigned_business_id !== selectedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: You can only delete employees in your assigned business." });
    }

    await employee.destroy();
    return res.json({ message: "Employee deleted successfully" });

  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

