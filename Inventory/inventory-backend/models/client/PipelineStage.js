import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import Pipeline from "./Pipeline.js";
class PipelineStage extends Model {}

PipelineStage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize generates UUID
      primaryKey: true,
    },
    pipeline_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    stage_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sequence_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  {
    sequelize: inventoryDB,
    modelName: "PipelineStage",
    tableName: "pipeline_stages",
    timestamps: true,
  }
);

export default PipelineStage;
