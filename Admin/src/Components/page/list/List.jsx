// import { CloseOutlined } from "@ant-design/icons";
// import axios from "axios";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "./List.css";

// const List = ({ url, token }) => {
//   const [data, setdata] = useState([]);
//   const foodlist = async () => {
//     try {
//       const response = await axios.get(url + `/api/food/list`);
//       if (response.data.success) {
//         setdata(response.data.data);
//       }
//     } catch (error) {
//       toast.error("Databse is not fetch data", error);
//     }
//   };
//   const removeitem = async (foodid) => {
//     const respone = await axios.post(
//       url + `/api/food/delete`,
//       { id: foodid },
//       { headers: { token } }
//     );
//     await foodlist();
//     if (respone.data.success) {
//       toast.success(respone.data.message);
//     } else {
//       toast.error("not remove your item");
//     }
//   };
//   useEffect(() => {
//     foodlist();
//   }, []);

//   return (
//     <div
//       className="list add flex-col"
//       style={{
//         marginRight: "23px",
//       }}
//     >
//       <p>All food list item</p>
//       <div className="list-table">
//         <div className="list-table-format main-title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {data.map((item, index) => {
//           return (
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/` + item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.price}</p>
//               <p>
//                 <CloseOutlined
//                   onClick={() => removeitem(item._id)}
//                   className="icon"
//                 />
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default List;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url, token }) => {
  const [data, setData] = useState([]);

  // Fetch food list
  const foodList = async () => {
    try {
      const response = await axios.get(url + `/api/food/list`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Error fetching data from database");
      console.error(error);
    }
  };

  // Delete item
  const removeItem = async (foodId) => {
    try {
      const response = await axios.post(
        url + `/api/food/delete`,
        { id: foodId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        foodList(); // refresh list
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error deleting food item");
      console.error(error);
    }
  };

  useEffect(() => {
    foodList();
  }, []);

  return (
    <div className="list add flex-col" style={{ marginRight: "23px" }}>
      <p>All Food List Items</p>
      <div className="list-table">
        <div className="list-table-format main-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {data.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onError={(e) => (e.target.src = "/default.jpg")}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p>
              <CloseOutlined
                onClick={() => removeItem(item._id)}
                className="icon"
                style={{ color: "red", cursor: "pointer" }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
