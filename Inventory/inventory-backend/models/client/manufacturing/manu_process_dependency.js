import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../../db.js";
import ManuProcess from "./manu_process.js";

class ManuProcessDependency extends Model {}

ManuProcessDependency.init(
  {
    dependency_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ManuProcess,
        key: "process_id",
      },
      onDelete: "CASCADE",
    },
    dependent_on: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ManuProcess,
        key: "process_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "ManuProcessDependency",
    tableName: "manu_process_dependency",
    timestamps: false,
  }
);

// Relationships
ManuProcess.hasMany(ManuProcessDependency, { foreignKey: "process_id", onDelete: "CASCADE" });
ManuProcessDependency.belongsTo(ManuProcess, { foreignKey: "process_id" });

export default ManuProcessDependency;
