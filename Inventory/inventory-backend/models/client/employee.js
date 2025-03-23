import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import BusinessOwner from "./businessowner.js";  // Import BusinessOwner model
import Business from "./business.js";  // Import Business model

class Employee extends Model {}

Employee.init(
  {
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
      validate: {
        isEmail: true,
      },
    },
    emp_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_role: {
      type: DataTypes.ENUM("Admin", "Manager", "HR", "Editor", "Viewer"),
      allowNull: false,
    },
    bo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: BusinessOwner,
        key: "bo_id",
      },
      onDelete: "CASCADE",
    },
    designation: {  // ✅ New column
      type: DataTypes.STRING,
      allowNull: true,
    },
    assigned_business_id: {  // ✅ Renamed from business_id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Businesses", // Ensure this matches the actual table name
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdEmpId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ensure an employee must be created by another employee
      references: {
        model: Employee,  // Reference the Employee model itself
        key: "emp_id",
      },
      onDelete: "CASCADE",
    },    
  },
  {
    sequelize: inventoryDB,
    modelName: "Employee",
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Establish the relationship between BusinessOwner and Employee
BusinessOwner.hasMany(Employee, { foreignKey: "bo_id", onDelete: "CASCADE" });
Employee.belongsTo(BusinessOwner, { foreignKey: "bo_id" });
Business.hasMany(Employee, { foreignKey: "assigned_business_id", onDelete: "CASCADE" });
Employee.belongsTo(Business, { foreignKey: "assigned_business_id" });



export default Employee;
