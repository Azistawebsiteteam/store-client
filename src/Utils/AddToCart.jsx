import React, { useContext } from "react";
import { searchResultContext } from "../ReactContext/SearchResults";
import { handleAddtoCart } from "../Pages/Cart/Functions";

const AddToCart = (props) => {
  const { productQty, quantity } = props;

  const { userDetails, updateCartData } = useContext(searchResultContext);
  return (
    <>
      {parseInt(productQty) > 0 &&
      parseInt(productQty) >= parseInt(quantity) ? (
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
      ) : (
        <button
          className="linkBtn beforeHover"
          style={{
            border: "1px solid red",
            backgroundColor: "#fff",
            color: "red",
          }}
        >
          Out Of Stock
        </button>
      )}
    </>
  );
};

export default AddToCart;
