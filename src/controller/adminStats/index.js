import Category from "../../model/Category.js";
import Product from "../../model/Product.js";
import User from "../../model/User.js";

export const getAllStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();

    return res.status(200).json({
      stats: {
        products: productCount,
        users: userCount,
        categories: categoryCount,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
