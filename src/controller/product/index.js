import chalk from "chalk";
import Product from "../../model/Product.js";
import { v4 as uuidv4 } from "uuid";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "successfully created product",
      data: { ...savedProduct._doc, id: uuidv4() },
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

    const products = await Product.find();
    const totalProducts = products.length;

    res.json({
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  console.log(chalk.red(typeof req.params.id));

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
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

// Delete a product by ID
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
