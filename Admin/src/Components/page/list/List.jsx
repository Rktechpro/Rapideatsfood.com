import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url }) => {
  const [data, setdata] = useState([]);
  const foodlist = async () => {
    try {
      const response = await axios.get(url + `/api/food/list`);
      if (response.data.success) {
        setdata(response.data.data);
      }
    } catch (error) {
      toast.error("Databse is not fetch data", error);
    }
  };
  const removeitem = async (foodid) => {
    const respone = await axios.post(`${url}/api/food/delete`, { id: foodid });
    await foodlist();
    if (respone.data.success) {
      toast.success(respone.data.message);
    } else {
      toast.error("not remove your item");
    }
  };
  useEffect(() => {
    foodlist();
  }, []);

  return (
    <div
      className="list add flex-col"
      style={{
        marginRight: "23px",
      }}
    >
      <p>All food list item</p>
      <div className="list-table">
        <div className="list-table-format main-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p>
                <CloseOutlined
                  onClick={() => removeitem(item._id)}
                  className="icon"
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
