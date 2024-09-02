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
