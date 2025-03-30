import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";

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

export default Pipeline;
