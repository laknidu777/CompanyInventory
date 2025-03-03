import bcrypt from "bcryptjs";
import Employee from "../../models/client/employee.js";
import Business from "../../models/client/business.js";


// export const getEmployeesByBusinessOwner = async (req, res) => {
//   try {
//     const employees = await Employee.findAll({ where: { bo_id: req.user.bo_id } });
//     res.json(employees);
//   } catch (err) {
//     console.error("Error fetching employees:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const getEmployeesByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params; // ✅ Extract business_id from request

    console.log("🔹 Fetching Employees for Business ID:", business_id);

    // ✅ Ensure the requesting Business Owner owns this business
    const business = await Business.findOne({
      where: { id: business_id, owner_id: req.user.bo_id }, // ✅ Use `owner_id`
    });

    if (!business) {
      return res.status(403).json({ error: "Unauthorized access to this business." });
    }

    // ✅ Fetch only employees for the requested business
    const employees = await Employee.findAll({
      attributes: [
        "emp_id",
        "emp_name",
        "emp_email",
        "emp_role",
        "bo_id",
        "assigned_business_id", // ✅ Ensure correct column is selected
        "createdAt",
        "updatedAt",
      ],
      where: { assigned_business_id: business_id }, // ✅ Ensure correct field is used
    });

    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const createEmployeeForBusinessOwner = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role, emp_password } = req.body;
    const { business_id } = req.params; // ✅ Extract business_id (matches route)

    console.log("🔹 Extracted business_id:", business_id); // Debugging

    if (!business_id) {
      return res.status(400).json({ error: "Business ID is required." });
    }

    if (isNaN(business_id)) {
      return res.status(400).json({ error: "Invalid Business ID format." });
    }

    if (!emp_name || !emp_email || !emp_role || !emp_password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Ensure business_id is valid
    const business = await Business.findOne({ where: { id: business_id } });
    if (!business) {
      return res.status(404).json({ error: "Business not found." });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(emp_password, 10);

    // ✅ Assign the employee to the specified business
    const employee = await Employee.create({
      emp_name,
      emp_email,
      emp_role,
      emp_password: hashedPassword,
      assigned_business_id: business_id, // ✅ Use assigned_business_id for DB column
      bo_id: business.owner_id,
    });

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { emp_name, emp_email, emp_role } = req.body;
    const { emp_id } = req.params;

    console.log("🔹 Updating Employee ID:", emp_id);

    if (!emp_name && !emp_email && !emp_role) {
      return res.status(400).json({ error: "At least one field is required to update." });
    }

    // ✅ Ensure employee exists
    const employee = await Employee.findOne({ where: { emp_id } });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // ✅ Ensure that the employee belongs to the correct business
    if (employee.assigned_business_id !== req.user.assigned_business_id) {
      return res.status(403).json({ error: "Unauthorized to update this employee." });
    }

    // ✅ Update fields dynamically
    if (emp_name) employee.emp_name = emp_name;
    if (emp_email) employee.emp_email = emp_email;
    if (emp_role) employee.emp_role = emp_role;

    await employee.save();

    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params; // ✅ Extract employee ID from URL

    console.log("🔹 Deleting Employee ID:", emp_id);

    // ✅ Ensure employee exists
    const employee = await Employee.findByPk(emp_id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    await employee.destroy();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
