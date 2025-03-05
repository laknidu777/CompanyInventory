import jwt from "jsonwebtoken";

export const authenticateUniversal = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    let decoded;

    // Try verifying with Business Owner secret first
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
      req.user = decoded;
      req.user.isBusinessOwner = true;
      console.log("✅ Business Owner authenticated:", req.user);
      return next();
    } catch (err) {
      console.log("❌ Not a Business Owner token, checking Employee token...");
    }

    // If Business Owner token fails, try verifying Employee token
    try {
      decoded = jwt.verify(token, process.env.EMPLOYEE_JWT_SECRET);
      req.user = decoded;
      req.user.isBusinessOwner = false;
      console.log("✅ Employee authenticated:", req.user);
      return next();
    } catch (err) {
      console.log("❌ Invalid token for both Business Owner & Employee");
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
