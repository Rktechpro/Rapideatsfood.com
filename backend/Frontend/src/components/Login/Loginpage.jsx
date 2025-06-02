import React, { useContext, useState } from "react";
import "./Login.css";
import { context_store } from "../../context/ContextStore";
import axios from "axios";

const Loginpage = ({ setLoginpage }) => {
  const { url,setToken } = useContext(context_store);
  const [currentstate, setcurrentstate] = useState("Login");
  
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };
  const onLogins = async (e) => {
    e.preventDefault();
    let newUrl=url;
    if (currentstate==="Login") {
      newUrl +="/api/User/login"
    }
    else{
     newUrl +="/api/User/Singup"
    }
   const response= await axios.post(newUrl,data);
   if (response.data.success) {
    setToken(response.data.token)
    localStorage.setItem("token",response.data.token)
    setLoginpage(false)
   }
   else{
    alert(response.data.message)
   }
  };
  return (
    <>
      <div className="loginpage">
        <form
          action=""
          className="show_login_pop_container"
          onSubmit={onLogins}
        >
          <div className="login-page-title">
            <h1>{currentstate}</h1>
            <span
              onClick={() => setLoginpage(false)}
              className="material-symbols-outlined cross-icon "
            >
              close
            </span>
          </div>
          <div className="login-page-input">
            {currentstate === "Login" ? (
              <></>
            ) : (
              <input
                value={data.name}
                onChange={onchangehandler}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your name"
                required
              />
            )}

            <input
              onChange={onchangehandler}
              type="email"
              name="email"
              id="email"
              value={data.email}
              placeholder="Enter your  E-mail"
              required
            />
            <input
              onChange={onchangehandler}
              type="password"
              name="password"
              id="password"
              value={data.password}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">
            {currentstate === "Sign Up" ? " Create Account" : "Login"}
          </button>
          <div className="login-page-cond">
            <input type="checkbox" required />
            <p>By Continuing,I agree to the terms of use & privacy policy</p>
          </div>
          {currentstate === "Login" ? (
            <p className="click">
              Create a New Account?
              <span className="span" onClick={() => setcurrentstate("Sign Up")}>
                Click here
              </span>
            </p>
          ) : (
            <p className="click">
              Already have an account?
              <span className="span" onClick={() => setcurrentstate("Login")}>
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Loginpage;
