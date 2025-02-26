import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user.js";  // Import User model


export const signup = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      // Generate JWT Token
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, "your-secret-key", { expiresIn: "1h" });
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  //login
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: user.id, role: user.role }, "your-secret-key", { expiresIn: "1h" });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
