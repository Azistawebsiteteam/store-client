import React, { useEffect, createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import swalHandle from "../Pages/Components/ErrorHandler";

export const searchResultContext = createContext();

const SearchResultsProvider = (props) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishList, setWishlist] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);

  useEffect(() => {
    const getWishlist = async () => {
      if (!jwtToken) return;
      try {
        const url = `${baseUrl}/whish-list`;
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        swalHandle.onLoading();
        const response = await axios.post(url, {}, { headers });
        setWishlist(response.data.whish_list);
        setWishlistCount(response.data.whish_list.length);
        Swal.close();
      } catch (error) {
        Swal.close();
        swalHandle.onError(error);
      }
    };
    getWishlist();
  }, [baseUrl, jwtToken, wishlistCount]);

  return (
    <searchResultContext.Provider
      value={{
        searchResults,
        setSearchResults,
        wishlistCount,
        setWishlistCount,
        wishList,
        setWishlist,
      }}
    >
      {children}
    </searchResultContext.Provider>
  );
};

export default SearchResultsProvider;
