import React, { useContext } from "react";
import "./Food_disp.css";
import { context_store } from "../../context/ContextStore";
import FoodItam from "../Foods_Itams/FoodItam";

const Food_disp = ({ category }) => {
  const { food_lists } = useContext(context_store);
  return (
    <div className="food_disp" id="food_disp">
      <h1 className="mx-10">The Top Dishes near you</h1>
      <div className="container food_disp_list">
        {food_lists.map((item, index) => {
          if (category == "All" || category === item.category) {
            return (
              <FoodItam
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Food_disp;
