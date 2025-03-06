import ManuProcess from "../../../models/client/manufacturing/manu_process.js";
/**
 * Create a new manufacturing process for a product
 */
export const createProcess = async (req, res) => {
  try {
    const { product_id, process_name, type, estimated_time } = req.body;

    if (!product_id || !process_name || !type) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProcess = await ManuProcess.create({ product_id, process_name, type, estimated_time });
    return res.status(201).json({ message: "Process created successfully", process: newProcess });

  } catch (error) {
    console.error("Error creating process:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all processes for a product
 */
export const getProcessesByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const processes = await ManuProcess.findAll({ where: { product_id } });
    return res.json(processes);

  } catch (error) {
    console.error("Error fetching processes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
