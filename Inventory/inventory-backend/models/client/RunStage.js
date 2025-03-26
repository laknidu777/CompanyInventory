import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";

class RunStage extends Model {}

RunStage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    run_id: {
      type: DataTypes.UUID, // Changed from INTEGER to UUID
      allowNull: false,
    },
    stage_id: {
      type: DataTypes.UUID, // Changed from INTEGER to UUID
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Not Started",
    },
    assigned_to: DataTypes.STRING, // e.g. emp_1 or bo_4
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    remarks: DataTypes.TEXT,
  },
  {
    sequelize: inventoryDB,
    modelName: "RunStage",
    tableName: "run_stages",
    timestamps: true,
  }
);

export default RunStage;
