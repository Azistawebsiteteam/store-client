import React, { useContext } from "react";
import { searchResultContext } from "../ReactContext/SearchResults";
import { handleAddtoCart } from "../Pages/Cart/Functions";

const AddToCart = (props) => {
  const { productQty, quantity } = props;

  const { userDetails, updateCartData } = useContext(searchResultContext);
  return (
    <>
      {parseInt(productQty) > 0 &&
        parseInt(productQty) >= parseInt(quantity) && (
          <button
            className="hoveredCardButton"
            onClick={() =>
              handleAddtoCart(
                userDetails.azst_customer_id,
                props,
                updateCartData
              )
            }
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/cardCartIcon.svg`}
              alt="cartIcon"
              className="hoverIcon"
            />
          </button>
        )}
    </>
  );
};

export default AddToCart;
