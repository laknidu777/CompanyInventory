// controllers/pipelineController.js
import Pipeline from "../../models/client/Pipeline.js";
import PipelineStage from "../../models/client/pipelineStage.js";
import { checkPermission as hasPermission } from "../../middlewares/client/checkPermission.js";

// ✅ Create new pipeline (owner only)
// controllers/client/pipelineController.js
export const createPipeline = async (req, res) => {
    try {
      const { business_id } = req.params;
      const { name, description, stages } = req.body;
  
      if (!name || !Array.isArray(stages) || stages.length === 0) {
        return res.status(400).json({ error: "Pipeline name and stages are required." });
      }
  
      const pipeline = await Pipeline.create({
        business_id,
        name,
        description,
      });
  
      const stageRecords = stages.map((stage, index) => ({
        pipeline_id: pipeline.id,
        stage_name: stage,
        sequence_order: index + 1,
      }));
  
      await PipelineStage.bulkCreate(stageRecords);
  
      res.status(201).json({ message: "Pipeline created successfully", pipeline });
    } catch (err) {
      console.error("Create pipeline error:", err);
      res.status(500).json({ error: "Server error while creating pipeline" });
    }
  };
  

// ✅ Get all pipelines for a business (owner + employee with permission)
export const getPipelinesForBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;

    if (!req.user.bo_id) {
      const allowed = await hasPermission(req.user.emp_id, business_id, 'Processes', 'Read');
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    const pipelines = await Pipeline.findAll({ where: { business_id } });
    res.json({ pipelines });
  } catch (err) {
    console.error("Fetch pipelines error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const addPipelineStage = async (req, res) => {
    try {
      const { pipeline_id, business_id } = req.params;
      const { name, order } = req.body;
  
      if (!name || typeof order !== "number") {
        return res.status(400).json({ error: "Stage name and order are required." });
      }
  
      const stage = await PipelineStage.create({
        pipeline_id,
        name,
        order,
      });
  
      res.status(201).json({ message: "Stage added successfully", stage });
    } catch (err) {
      console.error("Add stage error:", err);
      res.status(500).json({ error: "Server error while adding stage" });
    }
  };
// ✅ Get a single pipeline with its stages
export const getPipelineByIdWithStages = async (req, res) => {
  try {
    const { business_id, pipeline_id } = req.params;

    if (!req.user.bo_id) {
      const allowed = await hasPermission(req.user.emp_id, business_id, 'Processes', 'Read');
      if (!allowed) return res.status(403).json({ error: "Access denied" });
    }

    const pipeline = await Pipeline.findOne({
      where: { id: pipeline_id, business_id },
      include: [
        {
          model: PipelineStage,
          as: 'stages',
          order: [['order', 'ASC']],
        },
      ],
    });

    if (!pipeline) return res.status(404).json({ error: "Pipeline not found" });

    res.json({ pipeline });
  } catch (err) {
    console.error("Fetch pipeline error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// ✅ Delete a pipeline
export const deletePipeline = async (req, res) => {
    try {
      const { pipeline_id, business_id } = req.params;
  
      const pipeline = await Pipeline.findOne({ where: { id: pipeline_id, business_id } });
      if (!pipeline) return res.status(404).json({ error: "Pipeline not found" });
  
      await PipelineStage.destroy({ where: { pipeline_id } }); // optional: clean up stages
      await pipeline.destroy();
  
      res.json({ message: "Pipeline deleted successfully" });
    } catch (err) {
      console.error("Delete pipeline error:", err);
      res.status(500).json({ error: "Server error while deleting pipeline" });
    }
  };
// ✅ Delete a specific pipeline stage
export const deletePipelineStage = async (req, res) => {
    try {
      const { pipeline_id, stage_id } = req.params;
  
      const stage = await PipelineStage.findOne({ where: { id: stage_id, pipeline_id } });
      if (!stage) return res.status(404).json({ error: "Stage not found" });
  
      await stage.destroy();
      res.json({ message: "Stage deleted successfully" });
    } catch (err) {
      console.error("Delete stage error:", err);
      res.status(500).json({ error: "Server error while deleting stage" });
    }
  };
  
// ✅ Get all stages for a specific pipeline
export const getPipelineStages = async (req, res) => {
    try {
      const { business_id, pipeline_id } = req.params;
  
      // Access control for employees
      if (!req.user.bo_id) {
        const allowed = await hasPermission(req.user.emp_id, business_id, 'Processes', 'Read');
        if (!allowed) return res.status(403).json({ error: "Access denied" });
      }
  
      const stages = await PipelineStage.findAll({
        where: { pipeline_id },
        order: [['order', 'ASC']],
      });
  
      res.json({ stages });
    } catch (err) {
      console.error("Fetch pipeline stages error:", err);
      res.status(500).json({ error: "Server error while fetching stages" });
    }
  };
  