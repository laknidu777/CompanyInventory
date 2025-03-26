import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import PipelineStage from "./PipelineStage.js";
class Pipeline extends Model {}

Pipeline.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize generates UUID
      primaryKey: true,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  {
    sequelize: inventoryDB,
    modelName: "Pipeline",
    tableName: "pipelines",
    timestamps: true,
  }
);
Pipeline.hasMany(PipelineStage, {
  foreignKey: "pipeline_id",
  as: "stages",
});
PipelineStage.belongsTo(Pipeline, {
  foreignKey: "pipeline_id",
  as: "pipeline",
});
export default Pipeline;
