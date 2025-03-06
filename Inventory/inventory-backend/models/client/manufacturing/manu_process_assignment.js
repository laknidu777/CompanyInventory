import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../../db.js";
import Clients from "../clients.js";
import ManuProduct from "./manu_product.js";

class ManuProcessAssignment extends Model {}

ManuProcessAssignment.init(
  {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clients,
        key: "client_id",
      },
      onDelete: "CASCADE",
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
  },
  {
    sequelize: inventoryDB,
    modelName: "ManuProcessAssignment",
    tableName: "manu_process_assignment",
    timestamps: false,
  }
);

// Relationships
Clients.hasMany(ManuProcessAssignment, { foreignKey: "client_id", onDelete: "CASCADE" });
ManuProcessAssignment.belongsTo(Clients, { foreignKey: "client_id" });

ManuProduct.hasMany(ManuProcessAssignment, { foreignKey: "product_id", onDelete: "CASCADE" });
ManuProcessAssignment.belongsTo(ManuProduct, { foreignKey: "product_id" });

export default ManuProcessAssignment;
