import React from "react";
import "./Order.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import persal from "../../../assets/img/parcel.png";
const Order = ({ url }) => {
  const [orderAdmin, setOrderAdmin] = useState([]);
  const fetchallorder = async () => {
    try {
      const response = await axios.get(url + "/api/order/listadmin");
      // console.log(response.data);
      if (response.data.success) {
        setOrderAdmin(response.data.data.reverse());
      }
    } catch (error) {
      toast.error("error! not fetch data");
    }
  };
  const HandleStaus = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/Status`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchallorder();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("error! not update status");
    }
  };
  useState(() => {
    fetchallorder();
  }, []);
  return (
    <div className="order add">
      <h2>Order Data</h2>
      <div className="orderlist">
        {orderAdmin.map((Order, index) => (
          <div key={index} className="orderlist-item">
            <img src={persal} alt="" />
            <div>
              <p className="orderlist-item-food">
                {Order.items.map((item, index) => {
                  if (index === Order.items.length - 1) {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>

              <p className="orderlist-item-name">
                {Order.address.firstName + " " + Order.address.lastName}
              </p>
              <p>{Order.address.street + ","}</p>
              <div className="orderlist-item-address">
                {Order.address.city +
                  " ," +
                  Order.address.state +
                  " ," +
                  Order.address.country +
                  " ," +
                  Order.address.pincode}
              </div>
              <p className="orderlist-item-phone">{Order.address.phone}</p>
            </div>
            <p>Item:{Order.items.length}</p>
            <p>Method:{Order.paymentMethod}</p>
            <p>Payment:{Order.payment ? "Done" : "Pending"}</p>
            <p>₹{Order.amount}</p>
            <select
              onChange={(e) => HandleStaus(e, Order._id)}
              value={Order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
