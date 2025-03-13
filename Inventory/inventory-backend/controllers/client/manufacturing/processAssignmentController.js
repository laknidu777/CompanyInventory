import ManuProcessAssignment from "../../../models/client/manufacturing/manu_process_assignment.js";
import Clients from "../../../models/client/clients.js";
import ManuProduct from "../../../models/client/manufacturing/manu_product.js";

/**
 * Assign a product to a client (wholesale buyer/agent)
 */
export const assignProductToClient = async (req, res) => {
  try {
    const { client_id, product_id } = req.body;

    if (!client_id || !product_id) {
      return res.status(400).json({ error: "Both client_id and product_id are required." });
    }
    // Check if client exists
    const client = await Clients.findByPk(client_id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    const productExists = await ManuProduct.findByPk(product_id);
    if (!productExists) {
      return res.status(400).json({ error: "Invalid product_id. Product does not exist." });
    }
    const assignment = await ManuProcessAssignment.create({ client_id, product_id });
    return res.status(201).json({ message: "Product assigned successfully", assignment });

  } catch (error) {
    console.error("Error assigning product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//  
//   Employee Fetches Assigned Clients in Their Business
//  
export const getClientsForEmployee = async (req, res) => {
  try {
    const assignedBusinessId = req.user.assigned_business_id; // ✅ Extracted from the token

    if (!assignedBusinessId) {
      return res.status(403).json({ error: "Unauthorized: No business assigned to employee." });
    }

    // Fetch only clients assigned to products in the employee's business
    const clients = await ManuProcessAssignment.findAll({
      include: {
        model: Clients,
      },
      include: {
        model: ManuProduct,
        where: { business_id: assignedBusinessId }, // 🔹 Only fetch clients assigned to employee's business
      }
    });

    return res.json(clients);
  } catch (error) {
    console.error("Error fetching clients for employee:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

/**
 * Get all assigned products for a client
 */
export const getAssignedProductsForClient = async (req, res) => {
  try {
    const { client_id } = req.params;

    // Ensure client can only access their own assigned products
    if (req.user.client_id !== parseInt(client_id)) {
      return res.status(403).json({ error: "Unauthorized: You cannot access another client's products." });
    }

    const assignments = await ManuProcessAssignment.findAll({ where: { client_id } });
    return res.json(assignments);
  } catch (error) {
    console.error("Error fetching assigned products:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
