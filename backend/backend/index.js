import express from "express";
import cors from "cors";
import { ContectDB } from "./config/db.js";
import foodRouter from "./Routes/Foodroutes.js";
import "dotenv/config.js";
import UserRouter from "./Routes/Userroutes.js";
import CartRouter from "./Routes/Cartroutes.js";
import OrderRouter from "./Routes/OrderRoutes.js";
import ContactRouter from "./Routes/ContactRoutes.js";

//config
const app = express();
const port = process.env.PORT || 6000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//db connections
ContectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/User", UserRouter);
app.use("/api/Cart", CartRouter);
app.use("/api/order", OrderRouter);
app.use("/api/food", ContactRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});
const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};
start();
