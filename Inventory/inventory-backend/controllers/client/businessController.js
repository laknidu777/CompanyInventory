import Business from "../../models/client/business.js";

/**
 * Create a New Business
 */
export const createBusiness = async (req, res) => {
    try {
        const { name, business_type, registration_number, tax_id, email, phone, address } = req.body;
        const owner_id = req.user.bo_id;

        if (!name || !business_type || !email || !phone) {
            return res.status(400).json({ error: "Business name, type, email, and phone are required" });
        }

        const newBusiness = await Business.create({
            name,
            business_type,
            registration_number,
            tax_id,
            email,
            phone,
            address,
            owner_id,
            created_at: new Date(),
        });

        res.status(201).json({ message: "Business created successfully", business: newBusiness });
    } catch (error) {
        console.error("Error creating business:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
/**
 * Get Business Details by ID
 */
export const getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        const bo_id = req.user?.bo_id; // ✅ Ensure `bo_id` is available

        if (!bo_id) {
            return res.status(401).json({ error: "Unauthorized: No Business Owner ID found" });
        }

        const business = await Business.findOne({
            where: { id, owner_id: bo_id }, // ✅ Only return business if owner matches
            attributes: ["id", "name", "business_type", "registration_number", "tax_id", "email", "phone", "address", "created_at"],
        });

        if (!business) {
            return res.status(404).json({ error: "Business not found or unauthorized" });
        }

        res.json(business);
    } catch (error) {
        console.error("Error fetching business:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


