//import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { searchResultContext } from "../ReactContext/SearchResults";
import { handleAddtoCart } from "../Pages/Cart/Functions";
//import ErrorHandler from "../Pages/Components/ErrorHandler";

const AddToCart = (props) => {
  const { productId, variantId, quantity } = props;
  console.log(productId, variantId, quantity, "productId, variantId, quantity");
  const { userDetails, updateCartData } = useContext(searchResultContext);
  // const baseUrl = process.env.REACT_APP_API_URL;
  return (
    <>
      <button
        className="linkBtn beforeHover"
        style={{ border: "none" }}
        onClick={() =>
          handleAddtoCart(userDetails.azst_customer_id, props, updateCartData)
        }
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCart;
