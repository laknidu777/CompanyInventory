import Pipeline from './Pipeline.js';
import Run from './Run.js';
import RunStage from './RunStage.js';
import PipelineStage from './PipelineStage.js';
import InventoryItem from './inventoryitem.js'; // If used in relation

// 1. Pipeline has many Runs
Pipeline.hasMany(Run, { foreignKey: 'pipeline_id', as: 'runs' });
Run.belongsTo(Pipeline, { foreignKey: 'pipeline_id', as: 'pipeline' });

// 2. Pipeline has many Stages
Pipeline.hasMany(PipelineStage, { foreignKey: 'pipeline_id', as: 'stages' });
PipelineStage.belongsTo(Pipeline, { foreignKey: 'pipeline_id', as: 'pipeline' });

// 3. Run has many RunStages
Run.hasMany(RunStage, { foreignKey: 'run_id', as: 'run_stages' });
RunStage.belongsTo(Run, { foreignKey: 'run_id', as: 'run' });

// 4. Each RunStage belongs to a Pipel  ineStage
PipelineStage.hasMany(RunStage, { foreignKey: 'stage_id', as: 'run_stages' });
RunStage.belongsTo(PipelineStage, { foreignKey: 'stage_id', as: 'pipeline_stage' });

// 5. (Optional) Run belongs to InventoryItem (for traceability)
InventoryItem.hasMany(Run, { foreignKey: 'inventory_item_id', as: 'runs' });
Run.belongsTo(InventoryItem, { foreignKey: 'inventory_item_id', as: 'inventory_item' });

export default function applyAssociations() {
  // You can optionally call this from `app.js`
}
