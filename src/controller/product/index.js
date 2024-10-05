import chalk from "chalk";
import Product from "../../model/Product.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products with pagination
export const getAllProducts = async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || "";

    const searchCriteria = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};

    const totalProducts = await Product.countDocuments(searchCriteria);

    const products = await Product.find(searchCriteria)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Requested ID:", productId);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Fetch the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by custom ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
