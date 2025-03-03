import BusinessOwner from "../../models/client/businessowner.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_CLIENT;

/**
 * Business Owner Signup
 */
export const createBusinessOwner = async (req, res) => {
  console.log("Received request body:", req.body);

  const { bo_name, bo_email, bo_contact_number, bo_address, bo_type, bo_nic, bo_password, bo_role } = req.body;

  if (!bo_name || !bo_email || !bo_password || !bo_role) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    const existingOwner = await BusinessOwner.findOne({ where: { bo_email } });
    if (existingOwner) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(bo_password, 10);

    const newBusinessOwner = await BusinessOwner.create({
      bo_name,
      bo_email,
      bo_contact_number,
      bo_address,
      bo_type,
      bo_nic,
      bo_password: hashedPassword,
      bo_role
    });

    res.status(201).json({ message: "Business owner created successfully" });
  } catch (err) {
    console.error("Error creating business owner:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Business Owner Login
 */
export const businessOwnerLogin = async (req, res) => {
  const { bo_email, bo_password } = req.body;

  try {
    const businessOwner = await BusinessOwner.findOne({ where: { bo_email } });
    if (!businessOwner) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(bo_password, businessOwner.bo_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        bo_id: businessOwner.bo_id,
        bo_email: businessOwner.bo_email,
        bo_role: businessOwner.bo_role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    //console.log("✅ Login Successful - Issued Token:", token);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

