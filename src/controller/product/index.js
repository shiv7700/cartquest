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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // If page and limit are provided, implement pagination
    if (page && limit) {
      const skip = (page - 1) * limit;
      const totalProducts = await Product.countDocuments();
      const products = await Product.find().skip(skip).limit(limit);

      return res.json({
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        products,
      });
    }

    // If page and limit are not provided, fetch all products
    const products = await Product.find();
    const totalProducts = products.length;

    return res.json({
      totalProducts,
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
