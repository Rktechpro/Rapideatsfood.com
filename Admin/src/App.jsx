import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "./Components/page/add/Add";
import List from "./Components/page/list/List";
import Order from "./Components/page/order/Order";

const App = () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:5500";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
