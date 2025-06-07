// import React, { useState } from "react";
// import "./AdminLogin.css";
// import axios from "axios";

// import { LockFilled, UserOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";

// const AdminLogin = ({ url, setToken }) => {
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');

//   const AdminFormHandle = async (e) => {
//     try {
//       e.preventDefault();
//       const response = await axios.post(url + "/api/admin/adminlogin", {
//         email,
//         password,
//       });
//       if (response.data.success) {
//         console.log(response.data);
//         setToken(response.data.token);
//       } else {
//         toast.error(response.data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-right">
//         <h2>Login as a Admin User</h2>
//         <form className="login-form" onSubmit={AdminFormHandle}>
//           <div className="input-group">
//             <input
//               onChange={(e) => setemail(e.target.value)}
//               value={email}
//               placeholder="johndoe@email.com"
//               required
//               type="email"
//               name="email"
//             />
//             <span className="icon">
//               <UserOutlined />
//             </span>
//           </div>
//           <div className="input-group">
//             <input
//               onChange={(e) => setpassword(e.target.value)}
//               type="password"
//               value={password}
//               placeholder="********"
//               required
//               name="password"
//             />
//             <span className="icon">
//               <LockFilled style={{ cursor: "pointer" }} />
//             </span>
//           </div>
//           <button type="submit" className="login-button">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const AdminLogin = ({ url, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/api/admin/adminlogin`, {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-right">
        <h2>Login as an Admin</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon">
              <UserOutlined />
            </span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon">
              <LockFilled />
            </span>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
