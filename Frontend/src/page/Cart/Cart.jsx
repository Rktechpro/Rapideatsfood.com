// import React, { useContext } from "react";
// import "./Cart.css";
// import { context_store } from "../../context/ContextStore";
// import { useNavigate } from "react-router-dom";
// const Cart = () => {
//   const { cartItem, food_lists, removefromcart, getTotalAmountcart, url } =
//     useContext(context_store);

//   const navigate = useNavigate();
//   return (
//     <div className="cart m-10">
//       <div className="cartItem m-8">
//         <div className="cartitemtitile">
//           <h1>Item</h1>
//           <h1>Title</h1>
//           <h1>Price</h1>
//           <h1>Quantity</h1>
//           <h1>Total</h1>
//           <h1>Remove</h1>
//         </div>
//         <br />
//         <hr />
//         {food_lists.map((item, index) => {
//           if (cartItem[item._id] > 0) {
//             return (
//               <div key={index}>
//                 <div className="cartitemtitile cart-items">
//                   <img src={url + "/images/" + item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>₹{item.price}</p>
//                   <p>{cartItem[item._id]}</p>
//                   <p>₹{item.price * cartItem[item._id]}</p>
//                   <p onClick={() => removefromcart(item._id)} className="cross">
//                     x
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>
//       <div className="bottom-cart">
//         <div className="totalcart">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-detials">
//               <p>Subtotal</p>
//               <p>₹{getTotalAmountcart()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detials">
//               <p>Delivery</p>
//               <p>₹{getTotalAmountcart() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detials">
//               <b>Total</b>
//               <p>
//                 ₹{getTotalAmountcart() === 0 ? 0 : getTotalAmountcart() + 2}
//               </p>
//             </div>
//           </div>
//           <button onClick={() => navigate("/order")}>
//             Procced to Checkout
//           </button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If You have a promo code,Place your enter</p>
//             <div className="promocode-input">
//               <input type="text" placeholder="promo code" />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext } from "react";
import "./Cart.css";
import { context_store } from "../../context/ContextStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_lists, removefromcart, getTotalAmountcart } =
    useContext(context_store);

  const navigate = useNavigate();

  return (
    <div className="cart m-10">
      <div className="cartItem m-8">
        <div className="cartitemtitile">
          <h1>Item</h1>
          <h1>Title</h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1>Total</h1>
          <h1>Remove</h1>
        </div>
        <br />
        <hr />

        {food_lists.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cartitemtitile cart-items">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    onError={(e) => (e.target.src = "/default.jpg")}
                  />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p
                    onClick={() => removefromcart(item._id)}
                    className="cross"
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="bottom-cart">
        <div className="totalcart">
          <h2>Cart Totals</h2>
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
          <button
            onClick={() => navigate("/order")}
            disabled={getTotalAmountcart() === 0}
            style={{
              background: "#000",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here:</p>
            <div className="promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
