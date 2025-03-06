import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import Business from "./business.js";

class Clients extends Model {}

Clients.init(
  {
    client_id: {
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
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    client_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "Clients",
    tableName: "Clients",
    timestamps: true,
  }
);

// Relationships
Business.hasMany(Clients, { foreignKey: "business_id", onDelete: "CASCADE" });
Clients.belongsTo(Business, { foreignKey: "business_id" });

export default Clients;
