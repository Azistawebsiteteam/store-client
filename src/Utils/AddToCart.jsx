import React, { useContext } from "react";
import { searchResultContext } from "../ReactContext/SearchResults";
import { handleAddtoCart } from "../Pages/Cart/Functions";

const AddToCart = (props) => {
  // const { productId, variantId, quantity } = props;
  // console.log(productId, variantId, quantity, "productId, variantId, quantity");
  const { userDetails, updateCartData } = useContext(searchResultContext);
  return (
    <>
      <button
        className="linkBtn beforeHover"
        style={{
          border: "none",
          backgroundColor: "rgba(0, 128, 96, 1)",
          color: "#fff",
        }}
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
