import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controller/cart/index.js";

const router = express.Router();

// Get all products in the cart
router.get("/getCart", getCart);

// Add product to cart
router.post("/addCart", addToCart);

// Remove product from cart
router.delete("/removeCart/:productId", removeFromCart);

export default router;
