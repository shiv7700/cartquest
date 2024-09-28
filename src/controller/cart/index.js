// controllers/cartController.js

// Add product to cart
export const addToCart = (req, res) => {
  console.log(req.user);
  return res.status(200).json({
    message: "worked",
  });
};

// Remove product from cart
export const removeFromCart = (req, res) => {
  // Function logic will go here
};

// Get all products in the cart
export const getCart = (req, res) => {
  // Function logic will go here
};
