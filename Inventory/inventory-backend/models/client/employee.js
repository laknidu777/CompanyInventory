import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import BusinessOwner from "./businessowner.js";  // Import BusinessOwner model

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
      type: DataTypes.ENUM("Manager", "Technician", "Staff"),
      allowNull: false,
    },
    bo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BusinessOwner,
        key: "bo_id",
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

export default Employee;
