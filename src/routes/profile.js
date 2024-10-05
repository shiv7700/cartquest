import express from "express";
import { getProfile, updateProfile } from "../controller/profile/index.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// get profile
router.get("/profile", authenticate, getProfile);

// update profile
router.put("/profile", authenticate, updateProfile);

export default router;
