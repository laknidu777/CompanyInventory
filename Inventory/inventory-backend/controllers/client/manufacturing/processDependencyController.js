import ManuProcessDependency from "../../../models/client/manufacturing/manu_process_dependency.js";


/**
 * Set a dependency between two processes
 */
export const createProcessDependency = async (req, res) => {
  try {
    const { process_id, dependent_on } = req.body;

    if (!process_id || !dependent_on) {
      return res.status(400).json({ error: "Both process_id and dependent_on are required." });
    }

    const dependency = await ManuProcessDependency.create({ process_id, dependent_on });
    return res.status(201).json({ message: "Dependency created successfully", dependency });

  } catch (error) {
    console.error("Error creating dependency:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
