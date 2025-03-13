import ManuProcess from "../../../models/client/manufacturing/manu_process.js";
import ManuProduct from "../../../models/client/manufacturing/manu_product.js";
import Business from "../../../models/client/business.js";


/**
 * Create a new manufacturing process for a product
 */
export const createProcess = async (req, res) => {
  try {
    const { product_id, process_name, type, estimated_time } = req.body;

    if (!product_id || !process_name || !type) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if product_id exists in the database
    const productExists = await ManuProduct.findByPk(product_id);
    if (!productExists) {
      return res.status(400).json({ error: "Invalid product_id. Product does not exist." });
    }

    const newProcess = await ManuProcess.create({ product_id, process_name, type, estimated_time });
    return res.status(201).json({ message: "Process created successfully", process: newProcess });

  } catch (error) {
    console.error("Error creating process:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get process from employee
export const getProcessesForEmployee = async (req, res) => {
  try {
    const assignedBusinessId = req.user.assigned_business_id; // ✅ Extracted from the token

    if (!assignedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: No business assigned to employee." });
    }

    // Fetch only processes related to products within the assigned business
    const processes = await ManuProcess.findAll({
      include: {
        model: ManuProduct,
        where: { business_id: assignedBusinessId }, // 🔹 Only fetch processes from the employee's business
      }
    });

    return res.json(processes);
  } catch (error) {
    console.error("Error fetching processes for employee:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
/**
 * Get all processes for a product
 */
/**
 * Business Owner Gets All Processes for Their Business
 */
export const getProcessesByBusinessOwner = async (req, res) => {
  try {
    const { business_id } = req.params;

    // Ensure Business Owner can only access their own business
    const business = await Business.findOne({ where: { id: business_id, owner_id: req.user.bo_id } });

    if (!business) {
      return res.status(403).json({ error: "Unauthorized: You do not own this business." });
    }

    // Get all processes for all products in this business
    const processes = await ManuProcess.findAll({
      include: [{
        model: ManuProduct,
        where: { business_id }
      }]
    });

    res.json(processes);
  } catch (error) {
    console.error("Error fetching processes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

