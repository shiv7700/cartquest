import express from "express";
import { adminAuth, authenticate } from "../middleware/authMiddleware.js";
import { getAllStats } from "../controller/adminStats/index.js";

const router = express.Router();

// get all stats
router.get("/getallstats", authenticate, adminAuth, getAllStats);

export default router;
