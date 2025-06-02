import React from "react";
import "./About.css";
import banner from "../../assets/img/banner.jpg"
const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Rapideatsfood, your go-to destination for delicious meals
        delivered right to your doorstep. Our mission is to bring you
        high-quality food from your favorite restaurants with speed and
        convenience.
      </p>
      <h2>Our Story</h2>
      <p>
        Founded in 2025, FoodExpress was created with the vision of making food
        ordering simple and hassle-free. We partner with top restaurants to
        ensure you get a variety of options, whether you're craving fast food,
        healthy meals, or gourmet dishes.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Fast and reliable delivery</li>
        <li>Wide variety of restaurants</li>
        <li>Secure online payments</li>
        <li>24/7 customer support</li>
      </ul>
      <div className="image-about">
        <img src={banner}  alt="" />
      </div>
    </div>
  );
};

export default About;
