import React, { createContext, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getProfileDetails } from "../Pages/UserDashboard/UserProfile/GetUseDetails";
import { cartItems, calculateTotal } from "../Pages/Cart/Functions";

export const searchResultContext = createContext();

const SearchResultsProvider = (props) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [cartCount, setCartCount] = useState();

  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const fetchIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return null;
    }
  };

  const generateRandomKey = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const updateCartData = useCallback(() => {
    cartItems(userDetails.azst_customer_id).then((data) => {
      if (data) {
        setCartList(data);
        setCartCount(data.length);
        setCartTotal(calculateTotal(data));
      }
    });
  }, [userDetails.azst_customer_id]);

  useEffect(() => {
    const initialize = async () => {
      // Fetch the IP address if not found in localStorage
      const storedIP = await fetchIPAddress();
      if (storedIP) {
        const storedKey = generateRandomKey();

        const sub = storedKey.substring(1, 5);
        console.log(sub);
        localStorage.setItem(
          process.env.REACT_APP_CART_KEY,
          `${sub}-${storedIP}`
        );
      } else {
        const storedKey = generateRandomKey();
        localStorage.setItem(process.env.REACT_APP_CART_KEY, storedKey);
      }
    };

    const initializeAndUpdateCart = async () => {
      // Check if the IP and key already exist in localStorage
      let storedIP = localStorage.getItem(process.env.REACT_APP_CART_KEY);
      if (!storedIP) {
        await initialize();
      } // Wait for initialize() to complete
      updateCartData(); // Then call updateCartData()
    };

    initializeAndUpdateCart();
  }, [updateCartData]);

  useEffect(() => {
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setUserDetails]);

  return (
    <searchResultContext.Provider
      value={{
        searchResults,
        setSearchResults,
        cartTotal,
        setCartTotal,
        userDetails,
        setUserDetails,
        cartCount,
        setCartCount,
        cartList,
        setCartList,
        updateCartData,
      }}
    >
      {children}
    </searchResultContext.Provider>
  );
};

export default SearchResultsProvider;
