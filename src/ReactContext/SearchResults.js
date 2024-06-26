import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  getProfileDetails,
  getWishlist,
} from "../Pages/UserDashboard/UserProfile/GetUseDetails";

export const searchResultContext = createContext();

const SearchResultsProvider = (props) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishList, setWishlist] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    console.log(jwtToken);
    getWishlist(jwtToken, setWishlist, setWishlistCount);
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setWishlist, setWishlistCount, setUserDetails]);

  return (
    <searchResultContext.Provider
      value={{
        searchResults,
        setSearchResults,
        wishlistCount,
        setWishlistCount,
        wishList,
        setWishlist,
        cartTotal,
        setCartTotal,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </searchResultContext.Provider>
  );
};

export default SearchResultsProvider;
