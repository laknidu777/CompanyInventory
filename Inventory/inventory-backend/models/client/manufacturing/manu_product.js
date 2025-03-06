import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../../db.js";
import Business from "../business.js";

class ManuProduct extends Model {}

ManuProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Business,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "ManuProduct",
    tableName: "manu_product",
    timestamps: true,
  }
);

// Relationships
Business.hasMany(ManuProduct, { foreignKey: "business_id", onDelete: "CASCADE" });
ManuProduct.belongsTo(Business, { foreignKey: "business_id" });

export default ManuProduct;
