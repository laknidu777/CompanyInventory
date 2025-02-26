import { DataTypes } from "sequelize";
import { monitoringDB } from "../../db.js";
import bcrypt from "bcryptjs";

const Employee = monitoringDB.define("Employee", {
  emp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  emp_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  emp_contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_role: {
    type: DataTypes.ENUM("Super Admin", "Admin", "HR", "Manager", "Viewer"),
    allowNull: false,
    defaultValue: "Viewer",
  },
  emp_designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emp_department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (employee) => {
      if (employee.password) {
        const salt = await bcrypt.genSalt(10);
        employee.password = await bcrypt.hash(employee.password, salt);
      }
    },
  },
});

export default Employee;
