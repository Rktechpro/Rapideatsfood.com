import express from "express";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "../controllers/cartController.js";
import middlewareAuth from "../Middleware/auth.js";
const CartRouter = express.Router();

CartRouter.post("/add", middlewareAuth, addToCart);
CartRouter.post("/remove", middlewareAuth, removeFromCart);
CartRouter.post("/getcart", middlewareAuth, getUserCart);

export default CartRouter;
