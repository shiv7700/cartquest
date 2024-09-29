import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product/index.js";
import {
  adminAuth,
  authenticate,
  userAuth,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new product
router.post("/products", authenticate, adminAuth, createProduct);

// Get all products
router.get("/products", authenticate, userAuth, getAllProducts);

// Get product by ID
router.get("/products/:id", authenticate, userAuth, getProductById);

// Update a product by ID
router.put("/products/:id", authenticate, adminAuth, updateProduct);

// Delete a product by ID
router.delete("/products/:id", authenticate, adminAuth, deleteProduct);

export default router;
