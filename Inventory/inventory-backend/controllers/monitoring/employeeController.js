import Employee from "../../models/monitoring/employee.js";

/**
 * Create a new employee
 */
export const createEmployee = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { emp_name, emp_email, emp_contact_number, emp_role, emp_designation, emp_department } = req.body;

    if (!emp_name || !emp_email || !emp_role || !emp_department) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const employee = await Employee.create({
    emp_name,
      emp_email,
      emp_contact_number,
      emp_role,
      emp_designation, 
      emp_department,  });
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.findAll({
        attributes: { exclude: ["password"] } 
      });
  
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

/**
 * Get a single employee by ID
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update an employee
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await employee.update(updatedFields);
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete an employee
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await employee.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
