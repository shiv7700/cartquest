import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already has a cart
    let cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      // If cart exists, check if the product is already in the cart
      const productIndex = cart.products.findIndex((p) =>
        p.productId.equals(productId)
      );

      if (productIndex > -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product does not exist, add new product
        cart.products.push({ productId, quantity });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
    }

    // Save the cart
    const savedCart = await cart.save();
    res.json({ message: "Product added to cart", cart: savedCart });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message || error });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter((p) => !p.productId.equals(productId));

    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
};
