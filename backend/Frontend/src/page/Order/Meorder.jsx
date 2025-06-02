import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { context_store } from "../../context/ContextStore";
import axios from "axios";
import { asssets } from "../../assets/assets";

const Meorder = () => {
  const { url, token } = useContext(context_store);
  const [orderData, setorderData] = useState([]);

  const fetchdataOrder = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.post(
        url + "/api/order/userOrder",
        {},
        { headers: { token } }
      );
      setorderData(response.data.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchdataOrder();
    }
  }, [token]);
  return (
    <div className="MyOrders">
      <h1 className="font-bold">My Order</h1>
      <div className="container-order">
        {orderData.map((orders, index) => {
          return (
            <div key={index} className="OrderValue">
              <img className="parcel" src={asssets.parcel} alt="" />
              <p>
                {orders.items.map((item, index) => {
                  if (index === orders.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " ,";
                  }
                })}
              </p>

              <p>₹{orders.amount}</p>
              <p>Items:{orders.items.length}</p>
              <p>Method:{orders.paymentMethod}</p>
              <p>Payment:{orders.payment ? 'Done':'Pending'}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{orders.status}</b>
              </p>
              <button onClick={fetchdataOrder}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Meorder;
