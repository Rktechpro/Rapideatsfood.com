import React, { useContext, useState } from "react";
import "./contact.css";
import axios from "axios";
import { context_store } from "../../context/ContextStore";
import { toast } from "react-toastify";
const Contact = () => {
  const { url } = useContext(context_store);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respose = await axios.post(`${url}/api/food/contact`, formData);
      if (respose.data.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.success(respose.data.message)
      }
      else{
        toast.error(respose.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <div className="contact-form">
      <h5>Contact Us</h5>
      <form className="formContact" onSubmit={handleSubmit}>
        <label className="contactLable">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contactInput"
        />

        <label className="contactLable">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contactInput"
        />

        <label className="contactLable">Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="contactInput"
        ></textarea>
        <button className="contact-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
