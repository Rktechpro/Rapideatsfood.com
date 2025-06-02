import React from "react";
import "./menu.css";
import { menu_lists } from "../../assets/assets";
const Menu = ({ category, setCatgory }) => {
  return (
    <div className="Menu_items" id="Menu_items">
      <h1 className="menu_item_h">Menu Items</h1>
      <p className="menu_item_p">
        "Explore our menu featuring fresh, locally-sourced ingredients. Enjoy
        gourmet dishes, handcrafted desserts, and artisanal beverages in a cozy,
        welcoming atmosphere."
      </p>
      <div className="menu_list_item">
        {menu_lists.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCatgory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="menu_item_lists"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Menu;
