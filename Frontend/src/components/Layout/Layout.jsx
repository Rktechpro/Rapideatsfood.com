import React, { useContext, useState } from "react";
import "./Layout.css";
import { asssets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { context_store } from "../../context/ContextStore";
import {
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";

const Layout = ({ setLoginpage, children }) => {
  const [listitem, navset] = useState("Home");
  const { getTotalAmountcart, token, setToken, setCartItems } =
    useContext(context_store);
  const usenavgate = useNavigate();
  const navgateOrder = useNavigate();
  const Adminnavagate = useNavigate();
  const logout = () => {
    usenavgate("/");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  const orders = () => {
    navgateOrder("/meorders");
  };
  const Admin = () => {
    Adminnavagate("/adminlogin");
  };
  const [open, setOpen] = useState(false);
  const onPhoneMenuOpen = () => {
    setOpen(true);
  };
  const onPhoneMenuClose = () => {
    setOpen(false);
  };

  const lists = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Dish",
      link: "/dish",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="menu-web">
      <h1 className="logo">
        Rapid<span className="logo-s">eatsfood</span>
      </h1>
      <ul className="list">
        <Link
          to="/"
          onClick={() => navset("Home")}
          className={listitem === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => navset("About")}
          className={listitem === "About" ? "active" : ""}
        >
          About
        </Link>
        <Link
          to="/restaurants"
          onClick={() => navset("dish")}
          className={listitem === "dish" ? "active" : ""}
        >
          Restaurants
        </Link>
        <Link
          to="/contact"
          onClick={() => navset("contact")}
          className={listitem === "contact" ? "active" : ""}
        >
          Contact
        </Link>
      </ul>
      <div className="right">
        <div className="search_icon">
          <Link to="/search">
            <SearchOutlined className="search_icon" />
          </Link>
        </div>
        <div className="seach">
          <Link to="/cart">
            <ShoppingCartOutlined className="shopbtn" />
            <div className={getTotalAmountcart() === 0 ? " " : "Dot"}></div>
          </Link>
        </div>
      </div>
      {!token ? (
        <button onClick={() => setLoginpage(true)} className="under_btn">
          Sing in
        </button>
      ) : (
        <div className="navbar-profile">
          <img src={asssets.userprofile} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={orders}>
              <ShoppingFilled />
              <p> Order</p>
            </li>
            <hr />
            <li onClick={logout}>
              <LoginOutlined />
              Logout
            </li>
            <hr />
            <li onClick={Admin}>
              <UserAddOutlined/>
              Admin
            </li>
          </ul>
        </div>
      )}
      <div className="sidebar-container">
        <Button
          icon={<MenuOutlined />}
          size="large"
          onClick={onPhoneMenuOpen}
          className="menu-button"
        />
        {children}
      </div>

      <Drawer
        title={null}
        closable={false}
        placement="left"
        onClose={onPhoneMenuClose}
        open={open}
        width="50%"
        style={{ background: "#171C20" }}
      >
        <div className="drawer-content">
          <h1 className="logo-md">
            Rapid<span className="logo-mds">eatsfood</span>
          </h1>
          <div className="menu-list">
            {lists.map((item, index) => (
              <Link to={item.link} key={index} className="menu-item">
                <p
                  style={{
                    margin: "50px 0px",
                  }}
                >
                  <span>{item.name}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Layout;
