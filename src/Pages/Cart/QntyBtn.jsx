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
      await axios.put(url, body); // Wait for this call to finish
      await updateCartData(); // Fetch updated cart data once the update is complete
    } catch (error) {
      ErrorHandler.onError(error);
    }
  };

  // Increase quantity counter for a specific cart item
  const increaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);

    if (product && product.azst_cart_quantity < product.max_cart_quantity) {
      const updatedQuantity = parseInt(product.azst_cart_quantity) + 1;

      const updatedCart = cartList.map((eachProduct) =>
        eachProduct.azst_cart_id === cartId
          ? { ...eachProduct, azst_cart_quantity: updatedQuantity }
          : eachProduct
      );

      setCartList(updatedCart);
      updateQuantity({ cartId, quantity: updatedQuantity });
    }
  };

  // Decrease quantity counter for a specific cart item
  const decreaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);

    if (product && product.azst_cart_quantity > product.min_cart_quantity) {
      const updatedQuantity = parseInt(product.azst_cart_quantity) - 1;

      const updatedCart = cartList.map((eachProduct) =>
        eachProduct.azst_cart_id === cartId
          ? { ...eachProduct, azst_cart_quantity: updatedQuantity }
          : eachProduct
      );

      setCartList(updatedCart);
      updateQuantity({ cartId, quantity: updatedQuantity });
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
        <FaMinus
          fill="grey"
          style={{ cursor: "pointer" }}
          onClick={() => decreaseQuantityCounter(cartId)}
        />
      </span>
      <span style={{ fontWeight: "600", fontSize: "16px", padding: "0 8px" }}>
        {cartQuantity}
      </span>
      <span className="ms-2">
        <FaPlus
          style={{ cursor: "pointer" }}
          fill="grey"
          onClick={() => increaseQuantityCounter(cartId)}
        />
      </span>
    </div>
  );
};

export default QntyBtn;
