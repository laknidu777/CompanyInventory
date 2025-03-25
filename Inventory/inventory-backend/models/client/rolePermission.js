import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";

export class RolePermission extends Model {}
RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Manager", "HR", "Editor"),
      allowNull: false,
    },
    module: {
      type: DataTypes.ENUM(
        "Employees",
        "Inventory",
        "Processes",
        "Sales",
        "Purchases",
        "Income",
        "Reports",
        "Business Profile"
      ),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
    sequelize: inventoryDB,
    modelName: "RolePermission",
    timestamps: true,
    indexes: [
      {
        name: "idx_business_id",
        fields: ["business_id"]
      }
    ]
  }
);
export default RolePermission;