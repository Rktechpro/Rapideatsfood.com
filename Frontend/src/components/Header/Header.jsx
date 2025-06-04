import React from "react";
import "./Header.css";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_content">
        <div className="hero-container">
          <h1 className="title">
            <span className="high-l">Rapid</span>
            <span className="high-ls"> eatsFood</span>
          </h1>
          <h2 className="subtitle">Be The Quickest in your Food Delivery!</h2>
          <p className="animated-text">
            <ReactTyped
              strings={[
                "🍔Hamburger",
                "🌭Hot Dog",
                "🍖Meat",
                "🍕Pizza",
                "🥪Sandwich",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </p>
        </div>
        <p className="head_p">
          Discover delicious recipes, cooking tips, and culinary inspiration on
          our food website. From quick meals to gourmet dishes, we make cooking
          easy and enjoyable for everyone. Savor the flavor!
        </p>
        <div className="flex ">
          <Link to="/meorders" className="link">
          <button className="order_btn">Order</button>
          </Link>
          <button className="order_btn mx-3 ">Contact Me</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
