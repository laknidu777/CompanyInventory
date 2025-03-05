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


/**
 * ✅ Employee Creates Another Employee
 */
export const createEmployeeByEmployee = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role, emp_password } = req.body;
    const business_id = req.user.assigned_business_id;
    const createdEmpId = req.user.emp_id;  // ✅ Employee ID is taken from token

    if (!createdEmpId) {
      return res.status(400).json({ error: "Invalid request: Missing creator Employee ID" });
    }

    const hashedPassword = await bcrypt.hash(emp_password, 10);

    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_role,
      emp_password: hashedPassword,
      assigned_business_id: business_id,
      createdEmpId: createdEmpId, // ✅ Created by an Employee
      bo_id: null, // ✅ No Business Owner is associated
    });

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * ✅ Business Owner Creates an Employee
 */
export const createEmployeeByBusinessOwner = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role, emp_password } = req.body;
    const { business_id } = req.params;
    const bo_id = req.user.bo_id;  // ✅ Business Owner ID

    const existingEmployee = await Employee.findOne({ where: { emp_email } });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee with this email already exists" });
    }


    if (!bo_id) {
      return res.status(400).json({ error: "Invalid request: Missing Business Owner ID" });
    }

    const hashedPassword = await bcrypt.hash(emp_password, 10);

    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_role,
      emp_password: hashedPassword,
      assigned_business_id: business_id,
      createdEmpId: -bo_id, // ✅ Negative value to indicate Business Owner
      bo_id: bo_id, // ✅ Assign Business Owner ID
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
//get employees by employees who has specific user roles.
export const getEmployeesByBusinessEmployees = async (req, res) => {
  try {
    const assignedBusinessId = req.user.assigned_business_id; // 🔹 Get business from token

    // 🔹 Fetch employees ONLY for the logged-in employee's assigned business
    const employees = await Employee.findAll({
      where: { assigned_business_id: assignedBusinessId },
      attributes: ["emp_id", "emp_name", "emp_email", "emp_role", "assigned_business_id"],
    });

    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
//update employee by employee("Admin" or "HR")
export const updateEmployeeByEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const { emp_name, emp_email, emp_role } = req.body;
    const loggedInEmpRole = req.user.emp_role;
    const assignedBusinessId = req.user.assigned_business_id; // ✅ Get assigned business from token

    // 🔹 Step 1: Find the employee to update
    const employee = await Employee.findOne({ where: { emp_id } });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // 🔹 Step 2: Ensure the logged-in employee is from the same assigned business
    if (employee.assigned_business_id !== assignedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: You cannot update employees from another business." });
    }

    // 🔹 Step 3: Ensure only valid roles can update employees
    const allowedRoles = ["Super Admin", "Admin", "HR", "Manager"];
    if (!allowedRoles.includes(loggedInEmpRole)) {
      return res.status(403).json({ error: "Access denied: Insufficient permissions to update employees." });
    }

    // 🔹 Step 4: Update employee
    await Employee.update(
      { emp_name, emp_email, emp_role },
      { where: { emp_id } }
    );

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//update employee by himself
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
//get employee profile to himself
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
    const { emp_name, emp_email, emp_role } = req.body;
    const bo_id = req.user.bo_id; // Get Business Owner ID from token

    // 🔹 Step 1: Find the employee
    const employee = await Employee.findOne({ where: { emp_id } });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // 🔹 Step 2: Find the business to which this employee is assigned
    const business = await Business.findOne({ where: { id: employee.assigned_business_id, owner_id: bo_id } });

    if (!business) {
      return res.status(403).json({ error: "Unauthorized: You do not own this business" });
    }

    // 🔹 Step 3: Update the employee (only if authorized)
    const [updated] = await Employee.update(
      { emp_name, emp_email, emp_role },
      { where: { emp_id } }
    );

    if (updated) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(400).json({ error: "Employee update failed" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const bo_id = req.user.bo_id; // Get Business Owner ID from token

    // 🔹 Step 1: Find the employee
    const employee = await Employee.findOne({ where: { emp_id } });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // 🔹 Step 2: Check if the employee belongs to a business owned by the logged-in Business Owner
    const business = await Business.findOne({ where: { id: employee.assigned_business_id, owner_id: bo_id } });

    if (!business) {
      return res.status(403).json({ error: "Unauthorized: You do not own this business" });
    }

    // 🔹 Step 3: Delete the employee (only if authorized)
    await Employee.destroy({ where: { emp_id } });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//delete employee by "Admin" or "HR" employee
export const deleteEmployeeByEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const loggedInEmpRole = req.user.emp_role;
    const assignedBusinessId = req.user.assigned_business_id; // ✅ Get assigned business from token

    // 🔹 Step 1: Find the employee to delete
    const employee = await Employee.findOne({ where: { emp_id } });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // 🔹 Step 2: Ensure the logged-in employee is from the same assigned business
    if (employee.assigned_business_id !== assignedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: You cannot delete employees from another business." });
    }

    // 🔹 Step 3: Ensure only valid roles can delete employees
    const allowedRoles = ["Super Admin", "Admin", "HR"];
    if (!allowedRoles.includes(loggedInEmpRole)) {
      return res.status(403).json({ error: "Access denied: Insufficient permissions to delete employees." });
    }

    // 🔹 Step 4: Delete employee
    await Employee.destroy({ where: { emp_id } });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

