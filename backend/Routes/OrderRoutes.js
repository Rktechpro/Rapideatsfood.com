import express from "express";
import middlewareAuth from "../Middleware/auth.js";
import {
  getlistOrderadmin,
  getUserOrders,
  PlaceOrder,
  PlaceOrderRazorpay,
  updateOrderStatus,
  verifyRazorpay,
} from "../controllers/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", middlewareAuth, PlaceOrder);
OrderRouter.post("/razorpay", middlewareAuth, PlaceOrderRazorpay);
OrderRouter.post("/verfiyrazorpay", middlewareAuth, verifyRazorpay);
OrderRouter.post("/userOrder", middlewareAuth, getUserOrders);
OrderRouter.get("/listadmin", getlistOrderadmin);
OrderRouter.post("/Status", updateOrderStatus);

export default OrderRouter;
