import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const context_store = createContext(null);

const ContextStoreProvider = (props) => {
  const url = import.meta.env.VITE_BACKED_URL;
  const Key_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [cartItem, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_lists, setfoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/Cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removefromcart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/Cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const getTotalAmountcart = () => {
    let totalAmounts = 0;
    for (const items in cartItem) {
      let iteminfos = food_lists.find((product) => product._id === items);
      try {
        if (iteminfos && cartItem[items] > 0) {
          totalAmounts += iteminfos.price * cartItem[items];
        }
      } catch (error) {
        console.error(error);
      }
    }
    return totalAmounts;
  };

  const fetchfoodlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setfoodList(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  const loadCartData = async (token) => {
    const respone = await axios.post(
      url + "/api/Cart/getcart",
      {},
      { headers: { token } }
    );
    setCartItems(respone.data.cartData);
  };
  useEffect(() => {
    async function loddata() {
      await fetchfoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loddata();
  }, []);

  const contextValue = {
    food_lists,
    cartItem,
    addToCart,
    removefromcart,
    getTotalAmountcart,
    url,
    token,
    setToken,
    Key_ID,
    setCartItems,
  };
  return (
    <context_store.Provider value={contextValue}>
      {props.children}
    </context_store.Provider>
  );
};
export default ContextStoreProvider;
