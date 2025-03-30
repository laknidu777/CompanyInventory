import { DataTypes, Model } from "sequelize";
import { inventoryDB } from "../../db.js";


class Run extends Model {}

Run.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ Important!
    },
    pipeline_id: {
      type: DataTypes.UUID, // ✅ Corrected
      allowNull: false,
    },
    inventory_item_id: { // ✅ Use correct DB column name
      type: DataTypes.UUID,
      allowNull: false,
    },  
    assigned_to: {
      type: DataTypes.STRING,
      allowNull: true, // ✅ this is critical
    },    
    status: {
      type: DataTypes.STRING,
      defaultValue: "Not Started",
    },
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  },
  {
    sequelize: inventoryDB,
    modelName: "Run",
    tableName: "runs",
    timestamps: true,
  }
);
export default Run;
