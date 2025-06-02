import React from "react";
import {
  CheckSquareOutlined,
  PlusCircleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <PlusCircleOutlined className="icon" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <CheckSquareOutlined className="icon" />
          <p>List Item</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option">
          <ShopOutlined className="icon" />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
