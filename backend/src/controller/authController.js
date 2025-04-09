import User from "../db/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../lib/generateToken.js";

dotenv.config();

/**
 * @desc    Register a new user
 * @route   POST /v1/api/auth/register
 */
export const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Normalize email
    const normalizedEmail = email?.trim().toLowerCase();

    // Validate fields
    if (!fullname || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const emailExists = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      fullname,
      email: normalizedEmail,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(`Error in user register: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /v1/api/auth/login
 */
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize email
    const normalizedEmail = email?.trim().toLowerCase();

    // Validate fields
    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT and set in cookie
    //   const token = generateToken(res, user.id);
    generateToken(res, user.id);

    // Remove password before sending user data
    const userResponse = user.get({ plain: true });
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    console.error(`Error in user login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Logout user
 * @route GET /v1/api/auth/logout
 */
export const logOut = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(`Error in user logout: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
