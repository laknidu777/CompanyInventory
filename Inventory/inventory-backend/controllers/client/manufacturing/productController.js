import ManuProduct from "../../../models/client/manufacturing/manu_product.js";


/**
 * Create a new manufacturing product
 */
export const createProduct = async (req, res) => {
  try {
    const { business_id, product_name, quantity } = req.body;

    if (!business_id || !product_name || !quantity) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProduct = await ManuProduct.create({ business_id, product_name, quantity });
    return res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all products for a business
 */
export const getProductsByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;

    const products = await ManuProduct.findAll({ where: { business_id } });
    return res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
