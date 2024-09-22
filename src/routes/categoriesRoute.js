import express from "express";
import {
  getAllCategory,
  createCategory,
  deleteCategory,
} from "../controller/category/index.js";

const router = express.Router();

// get all categories
router.get("/getallcategories", getAllCategory);

// create category
router.post("/createcategory", createCategory);

// delete category
router.delete("/deletecategory/:id", deleteCategory);

export default router;
