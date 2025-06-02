import React from "react";
import "./Dish.css";
import { Link } from "react-router-dom";
const Dish = () => {
  return (
    <div className="dish" id="dish">
      <div className="banner-image">
        <h1>Restaurants Near Me</h1>
      </div>
      <div className="crard-detail-restrutn">
        <div className="col">
          <Link to="/">
            <div className="imge-card">
              <img src="./res.jpg" alt="" />
              <div className="titles">
                <h3>the cafe nation</h3>
                <p>The Cafe Nation offers great coffee, snacks, and a cozy ambiance.</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/">
            <div className="imge-card">
              <img src="./second.png" alt="" />
              <div className="titles">
                <h3>Restaurant Name</h3>
                <p> restaurant para </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/">
            <div className="imge-card">
              <img src="./3.png" alt="" />
              <div className="titles">
                <h3>Restaurant Name</h3>
                <p> restaurant para </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Dish;
