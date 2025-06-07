import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "./Components/page/add/Add";
import List from "./Components/page/list/List";
import Order from "./Components/page/order/Order";
import { useState } from "react";
import AdminLogin from "./Components/Login/AdminLogin";

const url = import.meta.env.VITE_API_URL;
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <AdminLogin url={url} setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} token={token} />} />
              <Route path="/list" element={<List url={url} token={token} />} />
              <Route path="/order" element={<Order url={url} token={token} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
