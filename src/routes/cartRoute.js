import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controller/cart/index.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products in cart
router.get("/getCart", authenticateToken, getCart);

// Add product to cart
router.post("/addCart", authenticateToken, addToCart);

// Remove product from cart
router.delete("/removeCart/:productId", authenticateToken, removeFromCart);

export default router;
