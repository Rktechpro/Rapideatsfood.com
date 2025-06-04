import React, { useState } from "react";

import About from "./components/About/About";
import Dish from "./components/Dish/Dish";
import Contact from "./components/contact/Contact";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./components/Login/Loginpage";
import Cart from "./page/Cart/Cart";
import Home from "./page/Home/Home";
import Footer from "./components/footer/Footer";
import Placeorder from "./page/Placeorder/Placeorder";
import Meorder from "./page/Order/Meorder";
import Verify from "./page/verfiy/Verify";
import Layout from "./components/Layout/Layout";
import Search from "./components/Search/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showloginpage, setLoginpage] = useState(false);
  return (
    <>
      <ToastContainer />
      {showloginpage ? <Loginpage setLoginpage={setLoginpage} /> : <></>}
      <Layout setLoginpage={setLoginpage} />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/restaurants" element={<Dish />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/meorders" element={<Meorder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
