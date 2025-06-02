import fs from "fs";
import foodModel from "../Models/FoodSchema.js";
//add food items
const foodItems = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res
      .status(200)
      .json({ success: true, message: "Food Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error added food item" });
  }
};
//add of food list items
const food_list = async (req, res) => {
  const { category, name } = req.query;
  const queryobject = {};
  if (category) {
    queryobject.category = { $regex: category, $options: "" };
  }
  if (name) {
    queryobject.name = { $regex: name, $options: "" };
  }
  

  try {
    const foodList = await foodModel.find(queryobject);
    res.status(200).json({ success: true, data: foodList });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching food list" });
  }
};
// remove this food item
const foodList_remove = async (req, res) => {
  try {
    const foodToremove = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${foodToremove.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Food Item removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing food item" });
  }
};

export { foodItems, food_list, foodList_remove };
