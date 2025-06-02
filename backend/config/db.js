import mongoose from "mongoose";

export const ContectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB conntected successfully");
  } catch (error) {
    console.error("connection error", error);
    process.exit(1); 
  }
};
