import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";
import BusinessOwner from "./businessowner.js";  // Import BusinessOwner model

class Business extends Model {}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {  // ✅ Links to BusinessOwner (bo_id)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BusinessOwner,
        key: "bo_id",
      },
      onDelete: "CASCADE",
    },
    business_type: {
      type: DataTypes.ENUM("Buying & Selling", "Manufacturing", "Renting"),
      allowNull: false,
      //defaultValue: "Buying & Selling",
    },  
    registration_number: {
      type: DataTypes.STRING, // ✅ New column
      allowNull: true, // Can be optional
    },
    tax_id: {
        type: DataTypes.STRING, // ✅ New column
        allowNull: true, // Can be optional
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },  
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // ✅ Automatically set timestamp
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "Business",
    tableName: "Businesses",
    timestamps: false, // ✅ Prevent Sequelize from auto-adding timestamps
  }
);

// Relationship: Each BusinessOwner can have multiple businesses
BusinessOwner.hasMany(Business, { foreignKey: "owner_id", onDelete: "CASCADE" });
Business.belongsTo(BusinessOwner, { foreignKey: "owner_id" });

export default Business;
