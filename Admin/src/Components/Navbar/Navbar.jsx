import React from "react";
import "./Navbar.css";
import profile from "../../assets/img/profile.png";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <h1 className="logo">
          Rapid<span className="logo-s">eatsfood</span>
        </h1>
        <img className="profile" src={profile} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
