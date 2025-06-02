import mongoose from "mongoose";

const OrderFoodSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number,required: true },
  address: { type: Object,required: true },
  status: { type: String, required: true, default: "Food processing.." },
  date: { type: Date, required: true, default: Date.now() },
  payment: { type: Boolean, required: true, default: false },
  paymentMethod: { type: String, required: true },
});
const OrderModel = mongoose.model("Order", OrderFoodSchema);

export default OrderModel;
