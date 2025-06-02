import React, { useContext, useEffect } from "react";
import "./Verify.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { context_store } from "../../context/ContextStore";
function Verify() {
  const { url, setCartItems, token } = useContext(context_store);
  const [searchparms, setSearchParms] = useSearchParams();
  const success = searchparms.get("success");
  const orderId = searchparms.get("orderId");
  const navgate = useNavigate();

  const verifypayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await  axios.post(
        url + "/api/order/verify",
        {
          orderId,
          success,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navgate("/meorders");
      } else {
        navgate("/cart");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    verifypayment();
  }, [token]);

  return <div></div>;
}

export default Verify;
