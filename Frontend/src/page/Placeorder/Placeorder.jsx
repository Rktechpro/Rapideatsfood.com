import React, { useContext, useEffect, useState } from "react";
import "./Placeorder.css";
import { context_store } from "../../context/ContextStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import rezorpay from "../../assets/img/Razorpay.png";

const Placeorder = () => {
  const navgateOrder = useNavigate();
  const [method, setMethod] = useState("COD");
  const {
    getTotalAmountcart,
    token,
    food_lists,
    cartItem,
    setCartItems,
    url,
    Key_ID,
  } = useContext(context_store);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const initpay = (order) => {
    const options = {
      key: Key_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            url + "/api/order/verfiyrazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navgateOrder("/meorders");
            setCartItems({});
          }
        } catch (error) {
          console.error(error);
        }
      },
    };
    const res = new window.Razorpay(options);
    res.open();
  };
  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const placeorders = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      food_lists.map((item) => {
        if (cartItem[item._id] > 0) {
          let iteminfo = item;
          iteminfo["quantity"] = cartItem[item._id];
          orderItems.push(iteminfo);
        }
      });
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalAmountcart() + 2,
      };
      //Api call using  COD
      switch (method) {
        case "COD":
          const response = await axios.post(
            url + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navgateOrder("/meorders");
          } else {
            console.error(response.data.message);
          }
          break;
        case "razorpay":
          const responerazorpay = await axios.post(
            url + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responerazorpay.data.success) {
            initpay(responerazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navgations = useNavigate();
  useEffect(() => {
    if (!token) {
      navgations("/cart");
    } else if (getTotalAmountcart() === 0) {
      navgations("/cart");
    }
  }, [token]);
  return (
    <form action="" className="placeOrder" onSubmit={placeorders}>
      <div className="PlaceOrder-left">
        <h2 className="Tiltel">Delivery Information</h2>
        <div className="multi-filds">
          <input
            type="text"
            name="firstName"
            onChange={onchangehandler}
            value={data.firstName}
            placeholder="Enter your First name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onchangehandler}
            value={data.lastName}
            placeholder="Enter your Last name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onchangehandler}
          value={data.email}
          placeholder="Enter your E-mail Address"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onchangehandler}
          value={data.street}
          placeholder=" Enter Your Street"
          required
        />
        <div className="multi-filds">
          <input
            type="text"
            name="city"
            onChange={onchangehandler}
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onchangehandler}
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-filds">
          <input
            type="text"
            name="pincode"
            onChange={onchangehandler}
            value={data.pincode}
            placeholder="Enter your pin code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onchangehandler}
            value={data.country}
            placeholder="Enter your Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onchangehandler}
          value={data.phone}
          placeholder="Enter Your Phone No"
          required
        />
      </div>
      <div className="PlaceOrder-right ">
        <div className="totalcart">
          <h2 className="font-bold ">Cart Totals</h2>
          <div>
            <div className="cart-total-detials">
              <p>Subtotal</p>
              <p>₹{getTotalAmountcart()}</p>
            </div>
            <hr />
            <div className="cart-total-detials">
              <p>Delivery</p>
              <p>₹{getTotalAmountcart() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detials">
              <b>Total</b>
              <p>
                ₹{getTotalAmountcart() === 0 ? 0 : getTotalAmountcart() + 2}
              </p>
            </div>
          </div>
          <div className="">
            <h1 className=" font-bold">Payment Method------</h1>
            <div className=" flex  gap-3 flex-col lg:flex-row my-3">
              <div
                onClick={() => setMethod("razorpay")}
                className="flex items-center gap-3 cursor-pointer  p-2 px-3 border   "
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={rezorpay} alt="" className=" w-24" />
              </div>
              <div
                onClick={() => setMethod("COD")}
                className="flex items-center gap-3 cursor-pointer  p-2 px-3  border mx-2"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "COD" ? "bg-green-500" : ""
                  }`}
                ></p>
                <p className="text-gray-300 text-sm  font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <button type="submit" className="my-5 procced">
              Procced to PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
