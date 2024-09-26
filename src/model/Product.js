import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  categoryType: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true },
  productId: {
    type: String,
    required: true,
    default: uuidv4,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
