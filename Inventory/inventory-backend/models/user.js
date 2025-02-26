import { DataTypes, Model } from "sequelize";
//import sequelize from "../db.js";
import { inventoryDB } from "../db.js";

class User extends Model {}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "editor", "viewer"),
      allowNull: false,
    },
  },
  {
    sequelize: inventoryDB,
    modelName: "User",
    timestamps: true, // ✅ Ensures Sequelize uses createdAt & updatedAt
    underscored: false, // If true, Sequelize uses snake_case (created_at)
  }
);

export default User;
