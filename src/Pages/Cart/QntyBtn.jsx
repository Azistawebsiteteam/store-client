import React, { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { searchResultContext } from "../../ReactContext/SearchResults";
import axios from "axios";
import ErrorHandler from "../Components/ErrorHandler";

const QntyBtn = ({ cartQuantity, cartId }) => {
  const { updateCartData, userDetails, cartList, setCartList } =
    useContext(searchResultContext);
  const baseUrl = process.env.REACT_APP_API_URL;

  const updateQuantity = async (body) => {
    try {
      const url = `${baseUrl}/cart`;
      body = { ...body, customerId: userDetails.azst_customer_id ?? 0 };
      await axios.put(url, body);
      updateCartData();
    } catch (error) {
      ErrorHandler.onError(error);
    }
  };
  const increaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);
    let quantity = product.azst_cart_quantity ?? 1;
    if (product) {
      const updatedCart = cartList.map((eachProduct) => {
        if (eachProduct.azst_cart_id === cartId) {
          if (eachProduct.azst_cart_quantity < eachProduct.max_cart_quantity) {
            quantity = parseInt(eachProduct.azst_cart_quantity) + 1;
            return {
              ...eachProduct,
              azst_cart_quantity: quantity,
            };
          }
          return eachProduct;
        } else {
          return eachProduct;
        }
      });
      setCartList(updatedCart);
      const body = { cartId, quantity };
      updateQuantity(body);
    }
  };

  const decreaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);
    let quantity = 0;
    if (product) {
      const updatedCart = cartList.map((eachProduct) => {
        if (eachProduct.azst_cart_id === cartId) {
          if (eachProduct.azst_cart_quantity > eachProduct.min_cart_quantity) {
            quantity = parseInt(eachProduct.azst_cart_quantity) - 1;
            return {
              ...eachProduct,
              azst_cart_quantity: quantity,
            };
          }
          return eachProduct;
        } else {
          return eachProduct;
        }
      });
      setCartList(updatedCart);
      const body = { cartId, quantity };
      updateQuantity(body);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #B4B4B4",
        borderRadius: "6px",
        width: "max-content",
        padding: "3px 6px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span className="me-2">
        <FaMinus fill="grey" onClick={() => decreaseQuantityCounter(cartId)} />
      </span>
      <span style={{ fontWeight: "600", fontSize: "16px", padding: "0 8px" }}>
        {cartQuantity}
      </span>
      <span className="ms-2">
        <FaPlus fill="grey" onClick={() => increaseQuantityCounter(cartId)} />
      </span>
    </div>
  );
};

export default QntyBtn;
