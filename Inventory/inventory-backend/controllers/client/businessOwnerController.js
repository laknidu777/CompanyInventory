import BusinessOwner from "../../models/client/businessowner.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Business from "../../models/client/business.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_CLIENT;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // Add a refresh token secret

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

        // Generate Access Token (Short-lived)
        const accessToken = jwt.sign(
            {
                bo_id: businessOwner.bo_id,
                bo_email: businessOwner.bo_email,
                bo_role: businessOwner.bo_role,
                isBusinessOwner: true,
            },
            JWT_SECRET,
            { expiresIn: "30m" }
        );
        //console.log("Access Token:", accessToken);

        // Generate Refresh Token (Long-lived)
        const refreshToken = jwt.sign(
            { bo_id: businessOwner.bo_id },
            REFRESH_SECRET,
            { expiresIn: "15h" }
        );

        // Store tokens in HTTP-only cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 60 * 1000 // 30 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000 // 15 hours
        });

        res.json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Refresh Token for Business Owner
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
      return res.status(403).json({ error: "No refresh token provided" });
  }

  try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = jwt.sign(
          { bo_id: decoded.bo_id },
          process.env.JWT_SECRET_CLIENT,
          { expiresIn: "30m" } // New access token valid for 30 minutes
      );

      res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 30 * 60 * 1000 // 30 minutes
      });

      res.json({ message: "Token refreshed" });

  } catch (error) {
      console.error("Refresh token error:", error);
      res.status(403).json({ error: "Invalid refresh token" });
  }
};
export const getUser = async (req, res) => {
  try {
      console.log("User in Request:", req.user); // ✅ Debugging

      if (!req.user) {
          return res.status(401).json({ error: "Unauthorized" });
      }

      res.json({ name: req.user.bo_name }); // ✅ Ensure we return bo_name
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};



export const businessOwnerLogout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

/**
 * Get Businesses Owned by Logged-in Business Owner
 */
export const getBusinessOwnerBusinesses = async (req, res) => {
  try {
      const bo_id = req.user.bo_id; // Get Business Owner ID from token

      const businesses = await Business.findAll({
          where: { owner_id: bo_id }, // Fetch only businesses owned by this user
          attributes: ["id", "name", "business_type", "created_at"], // ✅ Use correct column names
      });

      res.json(businesses);
  } catch (error) {
      console.error("Error fetching businesses:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
//Business Owner Selects a Business
export const selectBusiness = async (req, res) => {
  try {
      const { business_id } = req.body;
      const bo_id = req.user.bo_id; // Extracted from the token

      // Check if the business belongs to the owner
      const business = await Business.findOne({ where: { id: business_id, owner_id: bo_id } });

      if (!business) {
          return res.status(403).json({ error: "Unauthorized: Business not found or not owned by you" });
      }

      res.json({ message: "Business selected successfully", business_id });
  } catch (error) {
      console.error("Business selection error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};


