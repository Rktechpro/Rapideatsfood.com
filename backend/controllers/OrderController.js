// import OrderModel from "../Models/OrderFoodSchema.js";
// import foodUserModel from "../Models/UserSchema.js";
// import razorpay from "razorpay";

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// //placing user Order for frontend.
// const PlaceOrder = async (req, res) => {
//   try {
//     const { UserId, items, amount, address, status, date, payment } = req.body;
//     const orderData = {
//       UserId,
//       items,
//       amount,
//       address,
//       status,
//       date,
//       payment,
//       paymentMethod: "COD",
//     };
//     const newOrder = new OrderModel(orderData);
//     await newOrder.save();

//     await foodUserModel.findByIdAndUpdate(UserId, { cartData: {} });

//     res.status(200).json({ success: true, message: "Order Place" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const PlaceOrderRazorpay = async (req, res) => {
//   try {
//     const { UserId, items, amount, address, status, date, payment } = req.body;
//     const orderData = {
//       UserId,
//       items,
//       amount,
//       address,
//       status,
//       date,
//       payment,
//       paymentMethod: "Razorpay",
//     };
//     const newOrder = new OrderModel(orderData);
//     await newOrder.save();

//     const options = {
//       amount: amount * 100,
//       receipt: newOrder._id.toString(),
//     };
//     await razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error });
//       }
//       res.status(200).json({ success: true, order });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const verifyRazorpay = async (req,res) => {
//   try {
//     const { UserId, razorpay_order_id } = req.body;
//     const Orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);
//     if (Orderinfo.status==="paid") {
//         await OrderModel.findByIdAndUpdate(Orderinfo.receipt,{payment:true});
//         await foodUserModel.findByIdAndUpdate(UserId,{cartData:{}})
//         res.status(200).json({success:true,message:"Payment Success!"})
//     }
//     else{
//       res.status(500).json({success:false,message:"Payment is not paid"})
//     }
//   } catch (error) {
//      console.error(error)
//      res.status(500).json({success:false,message:error.message})
//   }
// };

// //user order using frontend
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await OrderModel.find({ UserId: req.body.UserId });
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Errors!" });
//   }
// };
// // list of order in admin page
// const getlistOrderadmin = async (req, res) => {
//   try {
//     const Order = await OrderModel.find({});
//     res.status(200).json({ success: true, data: Order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Errors!" });
//   }
// };
// //update order status in admin page
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     await OrderModel.findByIdAndUpdate(orderId, { status });
//     res.status(200).json({ success: true, message: "Status Updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Errors!" });
//   }
// };
// export {
//   PlaceOrder,
//   PlaceOrderRazorpay,
//   verifyRazorpay,
//   getUserOrders,
//   getlistOrderadmin,
//   updateOrderStatus,
// };
import OrderModel from "../Models/OrderFoodSchema.js";
import foodUserModel from "../Models/UserSchema.js";
import razorpay from "razorpay";
import nodemailer from "nodemailer";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderEmail = async (email, subject, text) => {
  if (!email) {
    console.warn("User email not found, skipping email notification.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Food Service" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

// Place COD Order
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

    const user = await foodUserModel.findById(UserId);

    await sendOrderEmail(
      user.email,
      "Order Placed Successfully - COD",
      `Hi ${user.name},\n\nYour order (ID: ${newOrder._id}) has been placed successfully with Cash on Delivery.\nTotal Amount: ₹${amount}\n\nThank you for ordering from us!`
    );

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Razorpay Order
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

    razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error });
      }

      const user = await foodUserModel.findById(UserId);
      await sendOrderEmail(
        user.email,
        "Order Created - Razorpay",
        `Hi ${user.name},\n\nYour order (ID: ${newOrder._id}) has been created.\nPlease complete the Razorpay payment of ₹${amount}.\n\nThank you!`
      );

      res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Razorpay verification
const verifyRazorpay = async (req, res) => {
  try {
    const { UserId, razorpay_order_id } = req.body;
    const Orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (Orderinfo.status === "paid") {
      await OrderModel.findByIdAndUpdate(Orderinfo.receipt, { payment: true });
      await foodUserModel.findByIdAndUpdate(UserId, { cartData: {} });

      const user = await foodUserModel.findById(UserId);
      await sendOrderEmail(
        user.email,
        "Payment Successful - Razorpay",
        `Hi ${user.name},\n\nYour payment for order ID: ${Orderinfo.receipt} is successful.\nThank you for your order!`
      );

      res.status(200).json({ success: true, message: "Payment Success!" });
    } else {
      res.status(500).json({ success: false, message: "Payment is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ UserId: req.body.UserId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Errors!" });
  }
};

// Get all orders for admin
const getlistOrderadmin = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Errors!" });
  }
};

// Update order status
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
