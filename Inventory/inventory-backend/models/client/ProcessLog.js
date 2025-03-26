import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";

class ProcessLog extends Model {}

ProcessLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    run_stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: DataTypes.TEXT,
  },
  {
    sequelize: inventoryDB,
    modelName: "ProcessLog",
    tableName: "process_logs",
    timestamps: true,
  }
);

export default ProcessLog;
