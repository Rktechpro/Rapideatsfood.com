import React, { useState } from "react";
import "./Add.css";
import upload from "../../../assets/img/upload.png";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url, token }) => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onsubmithandler = async (e) => {
    try {
      
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("image", image);
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token },
      });
      if (response.data.success) {
        setdata({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setimage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onsubmithandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload} alt="" />
          </label>
          <input
            type="file"
            onChange={(e) => setimage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here.."
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="type description here..."
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p className=""> Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Burgers">Burgers</option>
              <option value="Pizza">Pizza</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              className="price"
              name="price"
              placeholder="₹20"
            />
          </div>
        </div>
        <button type="submit" className="Add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;

