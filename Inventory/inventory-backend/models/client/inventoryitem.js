import { DataTypes, Model } from 'sequelize';
import { inventoryDB } from '../../db.js';

export class InventoryItem extends Model {}

InventoryItem.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('single-item', 'item-group', 'composite-item'),
    allowNull: false,

  },
  unique_number: {
    type: DataTypes.STRING,
    allowNull: true // Only used for single-item
  },
  
  components: {
    type: DataTypes.JSON, // Array of strings for composite items
    allowNull: true
  },
  
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: inventoryDB,
  modelName: 'InventoryItem',
  tableName: 'inventory_items',
  timestamps: true,
  indexes: [
    {
      name: 'idx_inventory_business',
      fields: ['business_id'],
    },
  ],
});

export default InventoryItem;
