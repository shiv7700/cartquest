import Category from "../../model/Category.js";

// get all category
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    return res
      .status(200)
      .json({ message: "Successfully retrieved categories", categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create category
export const createCategory = async (req, res) => {
  try {
    const { name, description, id, image } = req.body;
    if (!name || !description || !id || !image) {
      return res.status(500).json({
        message: "All fields are required",
      });
    }
    const existingCategory = await Category.findOne({ id });
    if (existingCategory) {
      return res.status(409).json({
        message: "Category with this ID already exists",
      });
    }
    const newCategory = await Category.create({ name, description, id, image });
    res
      .status(201)
      .json({ message: "Successfully created category", ...newCategory._doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findOneAndDelete({ id: Number(id) });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
