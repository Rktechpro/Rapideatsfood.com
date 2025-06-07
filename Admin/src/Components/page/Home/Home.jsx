import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Rapid Eats Food Admin Panel</h1>
      <p className="home-description">
        Manage your food items, orders, and more with ease.
      </p>
      <div className="home-image-container">
        <img src="/Home.jpg" alt="Food Management" className="home-image" />
      </div>
    </div>
  );
};

export default Home;
