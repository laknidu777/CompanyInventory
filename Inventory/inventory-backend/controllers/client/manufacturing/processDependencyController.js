import ManuProcessDependency from "../../../models/client/manufacturing/manu_process_dependency.js";
import ManuProcess from "../../../models/client/manufacturing/manu_process.js";

/**
 * Set a dependency between two processes
 */
export const createProcessDependency = async (req, res) => {
  try {
    const { process_id, dependent_on } = req.body;

    if (!process_id || !dependent_on) {
      return res.status(400).json({ error: "Both process_id and dependent_on are required." });
    }

    // Ensure the user owns both processes
    const mainProcess = await ManuProcess.findByPk(process_id);
    const dependentProcess = await ManuProcess.findByPk(dependent_on);

    if (!mainProcess || !dependentProcess) {
      return res.status(400).json({ error: "Invalid process_id or dependent_on. Ensure both processes exist." });
    }

    if (mainProcess.business_id !== req.user.assigned_business_id ||
        dependentProcess.business_id !== req.user.assigned_business_id) {
      return res.status(403).json({ error: "Unauthorized: You cannot modify processes outside your business." });
    }

    // Create the dependency
    const dependency = await ManuProcessDependency.create({ process_id, dependent_on });

    return res.status(201).json({ message: "Dependency created successfully", dependency });
  } catch (error) {
    console.error("Error creating dependency:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

