import React, { useState } from "react";
import "./Navbar.css";
import profile from "../../assets/img/profile.png";
import { Link } from "react-router-dom";

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
         
          <Link onClick={() => setToken("")}>Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
