import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  message: { type: String, required: true },
});
const ContactModel = mongoose.model("FoodContactUserData", ContactSchema);
export default ContactModel;
