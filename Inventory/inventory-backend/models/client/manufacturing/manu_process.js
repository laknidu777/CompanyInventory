import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../../db.js";
import ManuProduct from "./manu_product.js";

class ManuProcess extends Model {}

ManuProcess.init(
  {
    process_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ManuProduct,
        key: "product_id",
      },
      onDelete: "CASCADE",
    },
    process_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Dependent", "Independent"),
      allowNull: false,
    },
    estimated_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Ongoing", "Completed"),
      defaultValue: "Pending",
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "ManuProcess",
    tableName: "manu_process",
    timestamps: true,
  }
);

// Relationships
ManuProduct.hasMany(ManuProcess, { foreignKey: "product_id", onDelete: "CASCADE" });
ManuProcess.belongsTo(ManuProduct, { foreignKey: "product_id" });

export default ManuProcess;
