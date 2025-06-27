// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { asssets } from "../../assets/assets";
// import { context_store } from "../../context/ContextStore";

// const FoodItam = ({ id, name, price, description, image }) => {
//   const { cartItem, addToCart, removefromcart, url } =
//     useContext(context_store);
//   return (
//     <div className="Food-item">
//       <div className="food-item-img-container">
//         <img src={url + "/images/" + image} alt="" className="food-item-img" />
//         {!cartItem[id] ? (
//           <img
//             onClick={() => addToCart(id)}
//             src={asssets.add}
//             alt=""
//             className="add w-10"
//           />
//         ) : (
//           <div className="food_item_count">
//             <img
//               onClick={() => removefromcart(id)}
//               src={asssets.remove}
//               alt=""
//             />
//             <p>{cartItem[id]}</p>
//             <img onClick={() => addToCart(id)} src={asssets.add_green} alt="" />
//           </div>
//         )}
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={asssets.rating_img} alt="" className="rating" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItam;

import React, { useContext } from "react";
import "./FoodItem.css";
import { asssets } from "../../assets/assets";
import { context_store } from "../../context/ContextStore";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removefromcart } = useContext(context_store);

  return (
    <div className="Food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-img" />

        {!cartItem[id] ? (
          <img
            onClick={() => addToCart(id)}
            src={asssets.add}
            alt="Add to cart"
            className="add w-10"
          />
        ) : (
          <div className="food_item_count">
            <img
              onClick={() => removefromcart(id)}
              src={asssets.remove}
              alt="Remove one"
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={asssets.add_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={asssets.rating_img} alt="Rating" className="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
