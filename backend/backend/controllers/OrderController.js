import OrderModel from "../Models/OrderFoodSchema.js";
import foodUserModel from "../Models/UserSchema.js";
import razorpay from "razorpay";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing user Order for frontend.
const PlaceOrder = async (req, res) => {
  try {
    const { UserId, items, amount, address, status, date, payment } = req.body;
    const orderData = {
      UserId,
      items,
      amount,
      address,
      status,
      date,
      payment,
      paymentMethod: "COD",
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await foodUserModel.findByIdAndUpdate(UserId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Place" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const PlaceOrderRazorpay = async (req, res) => {
  try {
    const { UserId, items, amount, address, status, date, payment } = req.body;
    const orderData = {
      UserId,
      items,
      amount,
      address,
      status,
      date,
      payment,
      paymentMethod: "Razorpay",
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
      }
      res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyRazorpay = async (req,res) => {
  try {
    const { UserId, razorpay_order_id } = req.body;
    const Orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (Orderinfo.status==="paid") {
        await OrderModel.findByIdAndUpdate(Orderinfo.receipt,{payment:true});
        await foodUserModel.findByIdAndUpdate(UserId,{cartData:{}})
        res.status(200).json({success:true,message:"Payment Success!"})
    }
    else{
      res.status(500).json({success:false,message:"Payment is not paid"})
    }
  } catch (error) {
     console.error(error)
     res.status(500).json({success:false,message:error.message})
  }
};

//user order using frontend
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ UserId: req.body.UserId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Errors!" });
  }
};
// list of order in admin page
const getlistOrderadmin = async (req, res) => {
  try {
    const Order = await OrderModel.find({});
    res.status(200).json({ success: true, data: Order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Errors!" });
  }
};
//update order status in admin page
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Errors!" });
  }
};
export {
  PlaceOrder,
  PlaceOrderRazorpay,
  verifyRazorpay,
  getUserOrders,
  getlistOrderadmin,
  updateOrderStatus,
};
