import express from "express";
import {
  getAllCategory,
  createCategory,
  deleteCategory,
} from "../controller/category/index.js";
import {
  adminAuth,
  authenticate,
  userAuth,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// get all categories
router.get("/getallcategories", authenticate, userAuth, getAllCategory);

// create category
router.post("/createcategory", authenticate, adminAuth, createCategory);

// delete category
router.delete("/deletecategory/:id", authenticate, adminAuth, deleteCategory);

export default router;
