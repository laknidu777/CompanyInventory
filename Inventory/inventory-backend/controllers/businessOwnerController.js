import BusinessOwner from "../models/businessowner.js";
import { body, validationResult } from "express-validator";

// Get all business owners
export const getAllBusinessOwners = async (req, res) => {
  try {
    const businessOwners = await BusinessOwner.findAll();
    res.json(businessOwners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//get bussiness owner by id
export const getBusinessOwnerById = async (req, res) => {
  try { 
    const { id } = req.params;
    const businessOwner = await BusinessOwner.findOne({ where: { bo_id: id } });

    if (!businessOwner) {
      return res.status(404).json({ error: "Business owner not found" });
    }

    res.json(businessOwner);
  } catch (err) {
    console.error("Error fetching business owner:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteBusinessOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BusinessOwner.destroy({ where: { bo_id: id } });

    if (!deleted) {
      return res.status(404).json({ error: "Business owner not found" });
    }

    res.json({ message: "Business owner deleted successfully" });
  } catch (err) {
    console.error("Error deleting business owner:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Create a new business owner with validation
export const createBusinessOwner = async (req, res) => {
  console.log("Received request body:", req.body);

  // Ensure all validation is awaited
  await Promise.all([
    body("bo_name").notEmpty().withMessage("Name is required").run(req),
    body("bo_email").isEmail().withMessage("Invalid email").run(req),
    body("bo_contact_number").notEmpty().withMessage("Phone number is required").run(req),
    body("bo_address").notEmpty().withMessage("Address is required").run(req),
    body("bo_type").notEmpty().withMessage("Type is required").run(req),
    body("bo_nic").notEmpty().withMessage("NIC is required").run(req)
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { bo_name, bo_email, bo_contact_number, bo_address, bo_type, bo_nic } = req.body;

  try {
    const existingOwner = await BusinessOwner.findOne({ where: { bo_email } });
    if (existingOwner) return res.status(400).json({ error: "Email already in use" });

    const newBusinessOwner = await BusinessOwner.create({
      bo_name,
      bo_email,
      bo_contact_number,
      bo_address,
      bo_type,
      bo_nic
    });

    res.status(201).json(newBusinessOwner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a business owner
export const updateBusinessOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { bo_name, bo_email, bo_contact_number, bo_address, bo_type, bo_nic } = req.body;

    const businessOwner = await BusinessOwner.findByPk(id);
    if (!businessOwner) {
      return res.status(404).json({ error: "Business owner not found" });
    }

    await businessOwner.update({
      bo_name,
      bo_email,
      bo_contact_number,
      bo_address,
      bo_type,
      bo_nic
    });

    res.json({ message: "Business owner updated successfully", businessOwner });
  } catch (err) {
    console.error("Error updating business owner:", err);
    res.status(500).json({ error: "Server error" });
  }
};

