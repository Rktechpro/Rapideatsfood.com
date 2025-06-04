import React, { useState } from "react";
import "./AdminLogin.css";
import admin from "../../assets/img/admin.png";
import { LockFilled, UserOutlined } from "@ant-design/icons";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const admininputhandel = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };
  const AdminFormHandle = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as sending the data to your backend
    console.log("Admin Data Submitted:", adminData);
    // Reset the form after submission
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-right">
        <h2>Login as a Admin User</h2>
        <form className="login-form" onSubmit={AdminFormHandle}>
          <div className="input-group">
            <input
              onChange={admininputhandel}
              type="email"
              placeholder="johndoe@xyz.com"
              required
              name="email"
            />
            <span className="icon">
              <UserOutlined />
            </span>
          </div>
          <div className="input-group">
            <input
              onChange={admininputhandel}
              type="password"
              placeholder="********"
              required
              name="password"
            />
            <span className="icon">
              <LockFilled style={{cursor:"pointer"}} />
            </span>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="terms">
          <a href="#">Terms of use.</a> <a href="#">Privacy policy</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
