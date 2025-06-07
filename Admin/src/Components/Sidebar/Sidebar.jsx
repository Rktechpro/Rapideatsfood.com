
import React, { useState } from "react";
import {
  CheckSquareOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-options">
          <NavLink
            to="/add"
            className="sidebar-option"
          >
            <PlusCircleOutlined className="icon" />
            <span>Add Item</span>
          </NavLink>
          <NavLink
            to="/list"
            className="sidebar-option"
            
          >
            <CheckSquareOutlined className="icon" />
            <span>List Item</span>
          </NavLink>
          <NavLink
            to="/order"
            className="sidebar-option"
            
          >
            <ShopOutlined className="icon" />
            <span>Order</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
