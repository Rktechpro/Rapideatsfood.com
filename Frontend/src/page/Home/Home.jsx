import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Menu from "../../components/menu/Menu";
import Food_disp from "../../components/food_item_display/Food_disp";

const Home = () => {
  const [category, setCatgory] = useState("All");
  return (
    <div className="Home" id="Home">
      <Header />
      <div>
        <Menu category={category} setCatgory={setCatgory} />
      </div>
      <Food_disp category={category} />
    </div>
  );
};
export default Home;
