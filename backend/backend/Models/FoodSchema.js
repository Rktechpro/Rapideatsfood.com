import mongoose from "mongoose";

const foodSechma = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});
// const foodModel = mongoose.models.food || mongoose.Model("Food", foodSechma);
const foodModel = mongoose.model("Food", foodSechma);
export default foodModel;
