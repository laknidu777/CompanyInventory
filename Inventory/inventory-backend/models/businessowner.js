import { DataTypes, Model } from "sequelize";
import {inventoryDB} from "../db.js";

class BusinessOwner extends Model {}

BusinessOwner.init(
  {
    bo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bo_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bo_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    bo_contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bo_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bo_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bo_nic: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    
    
  },
  {
    sequelize: inventoryDB, 
    modelName: "BusinessOwner",
    timestamps: true, // ✅ Ensures createdAt and updatedAt columns exist
  }
);

// ✅ Default export (Fixes "does not provide an export named 'default'")
export default BusinessOwner;
