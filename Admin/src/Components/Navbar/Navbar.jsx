import React, { useState } from "react";
import "./Navbar.css";
import profile from "../../assets/img/profile.png";

const Navbar = ({ setToken }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <h1 className="navbar-logo">
        Rapid<span className="navbar-logo-highlight">eatsfood</span>
      </h1>

      <div
        className="navbar-profile-container"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img className="navbar-profile" src={profile} alt="User profile" />
        <div className={`navbar-dropdown ${dropdownOpen ? "show" : ""}`}>
          <a href="#">Profile</a>
          <a onClick={() => setToken("")}>Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
