import ManuProcessAssignment from "../../../models/client/manufacturing/manu_process_assignment.js";


/**
 * Assign a product to a client (wholesale buyer/agent)
 */
export const assignProductToClient = async (req, res) => {
  try {
    const { client_id, product_id } = req.body;

    if (!client_id || !product_id) {
      return res.status(400).json({ error: "Both client_id and product_id are required." });
    }

    const assignment = await ManuProcessAssignment.create({ client_id, product_id });
    return res.status(201).json({ message: "Product assigned successfully", assignment });

  } catch (error) {
    console.error("Error assigning product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all assigned products for a client
 */
export const getAssignedProductsForClient = async (req, res) => {
  try {
    const { client_id } = req.params;

    const assignments = await ManuProcessAssignment.findAll({ where: { client_id } });
    return res.json(assignments);

  } catch (error) {
    console.error("Error fetching assigned products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
