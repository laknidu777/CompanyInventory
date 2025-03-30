import express from "express";
import {authenticateBusinessOwner} from "../../middlewares/client/authBusinessOwner.js";
import { getRunById } from "../../controllers/client/runPipelineController.js";

import {
  createPipeline,
  getPipelinesForBusiness,
  getPipelineByIdWithStages,
  deletePipeline,
  addPipelineStage,
  getPipelineStages,
  deletePipelineStage,
} from "../../controllers/client/pipelineController.js";

import {
  createRunPipeline,
  getPipelineRuns,
  assignEmployeeToStage,
  updateRunStageStatus,
  getProcessLogs,
  deleteRunPipeline
} from "../../controllers/client/runPipelineController.js";

const router = express.Router();

// 🔧 PIPELINES
router.post("/businesses/:business_id/pipelines", authenticateBusinessOwner, createPipeline);
router.get("/businesses/:business_id/pipelines", authenticateBusinessOwner, getPipelinesForBusiness);
router.get("/businesses/:business_id/pipelines/:pipeline_id", authenticateBusinessOwner, getPipelineByIdWithStages);
router.delete("/businesses/:business_id/pipelines/:pipeline_id", authenticateBusinessOwner, deletePipeline);

// 📦 PIPELINE STAGES
router.post("/businesses/:business_id/pipelines/:pipeline_id/stages", authenticateBusinessOwner, addPipelineStage);
router.get("/businesses/:business_id/pipelines/:pipeline_id/stages", authenticateBusinessOwner, getPipelineStages);
router.delete("/businesses/:business_id/pipelines/:pipeline_id/stages/:stage_id", authenticateBusinessOwner, deletePipelineStage);

// 🚀 PIPELINE RUNS
router.post("/businesses/:business_id/pipelines/:pipeline_id/runs", authenticateBusinessOwner, createRunPipeline);
router.get("/businesses/:business_id/pipelines/:pipeline_id/runs", authenticateBusinessOwner, getPipelineRuns);
router.delete(
  "/businesses/:business_id/pipeline-runs/:run_id",
  authenticateBusinessOwner,
  deleteRunPipeline
);



// 👇 Add this new route
router.get("/businesses/:business_id/pipelines/:pipeline_id/runs/:run_id", authenticateBusinessOwner, getRunById);


// 👷 STAGE ASSIGNMENT & STATUS
router.put("/businesses/:business_id/pipeline-runs/:run_id/stages/:stage_id/assign", authenticateBusinessOwner, assignEmployeeToStage);
router.patch("/businesses/:business_id/pipeline-runs/:run_id/stages/:stage_id/status", authenticateBusinessOwner, updateRunStageStatus);

// 📜 PROCESS LOGS
router.get("/businesses/:business_id/pipeline-runs/:run_id/stages/:stage_id/logs", authenticateBusinessOwner, getProcessLogs);

export default router;
