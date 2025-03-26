import Run from "../../models/client/Run.js";
import RunStage from "../../models/client/RunStage.js";
import ProcessLog from "../../models/client/ProcessLog.js";
import Pipeline from "../../models/client/Pipeline.js";
import PipelineStage from "../../models/client/PipelineStage.js";
import InventoryItem from "../../models/client/inventoryitem.js";
import { v4 as uuidv4 } from "uuid";
import { checkPermission } from "../../middlewares/client/checkPermission.js";

// ✅ Create a new pipeline run from a pipeline template
export const createRunPipeline = async (req, res) => {
  try {
    const { pipeline_id } = req.params;
    const { inventory_item_id } = req.body;
    const created_by = req.user.bo_id ? `bo_${req.user.bo_id}` : `emp_${req.user.emp_id}`;

    // Step 1: Create run
    const run = await Run.create({
      pipeline_id,
      inventory_item_id,
      created_by,
      updated_by: created_by,
    });

    // Step 2: Fetch stages for this pipeline
    const stages = await PipelineStage.findAll({
      where: { pipeline_id },
      order: [["sequence_order", "ASC"]],
    });

    if (!stages.length) return res.status(400).json({ error: "No stages found for pipeline." });

    // Step 3: Insert into run_stages
    const runStageData = stages.map((stage) => ({
      run_id: run.id,
      stage_id: stage.id, 
      stage_name: stage.stage_name,
      sequence_order: stage.sequence_order,
      status: "Not Started",
    }));

    await RunStage.bulkCreate(runStageData);

    res.status(201).json({ message: "Pipeline run created", run_id: run.id });
  } catch (err) {
    console.error("Create pipeline run error:", err);
    res.status(500).json({ error: "Server error while creating run" });
  }
};

// ✅ Get all pipeline runs for a business
export const getPipelineRuns = async (req, res) => {
  try {
    const { business_id } = req.params;

    const runs = await Run.findAll({
      where: { business_id },
      include: [
        { model: Pipeline, as: "pipeline" },
        { model: InventoryItem, as: "inventory_item" },
        { model: RunStage, as: "stages", order: [["order", "ASC"]] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ runs });
  } catch (err) {
    console.error("Fetch pipeline runs error:", err);
    res.status(500).json({ error: "Failed to fetch pipeline runs" });
  }
};

// ✅ Assign an employee to a stage
export const assignEmployeeToStage = async (req, res) => {
  try {
    const { business_id, run_id, stage_id } = req.params;
    const { emp_id } = req.body;

    const user = req.user;
    const isOwner = user.bo_id;
    if (!isOwner) {
      const allowed = await checkPermission(user.emp_id, business_id, "Processes", "Update");
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    const runStage = await RunStage.findOne({ where: { run_pipeline_id: run_id, id: stage_id } });
    if (!runStage) return res.status(404).json({ error: "Run stage not found" });

    runStage.assigned_to = emp_id;
    await runStage.save();

    res.json({ message: "Employee assigned successfully", runStage });
  } catch (err) {
    console.error("Assign employee error:", err);
    res.status(500).json({ error: "Failed to assign employee" });
  }
};

// ✅ Update stage status
// PATCH /api/businesses/:business_id/pipeline-runs/:run_id/stages/:stage_id
export const updateRunStageStatus = async (req, res) => {
  try {
    const { run_id, stage_id } = req.params;
    const { status, remarks } = req.body;

    const runStage = await RunStage.findOne({
      where: { run_id, stage_id },
    });

    if (!runStage) return res.status(404).json({ error: "Run stage not found" });

    runStage.status = status || runStage.status;
    runStage.remarks = remarks || runStage.remarks;

    // Automatically handle start/end timestamps based on status
    const now = new Date();
    if (status === "In Progress" && !runStage.start_time) {
      runStage.start_time = now;
    } else if (status === "Completed" && !runStage.end_time) {
      runStage.end_time = now;
    }

    runStage.updated_by = req.user.bo_id ? `bo_${req.user.bo_id}` : `emp_${req.user.emp_id}`;
    await runStage.save();

    res.json({ message: "Stage updated successfully", runStage });
  } catch (err) {
    console.error("Update run stage error:", err);
    res.status(500).json({ error: "Failed to update run stage" });
  }
};

// ✅ Get logs for a specific run stage
export const getProcessLogs = async (req, res) => {
  try {
    const { stage_id } = req.params;

    const logs = await ProcessLog.findAll({
      where: { run_stage_id: stage_id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ logs });
  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};
