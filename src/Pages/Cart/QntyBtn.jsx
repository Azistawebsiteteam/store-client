import React, { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { HiMiniMinusSmall } from "react-icons/hi2";
import axios from "axios";

const QntyBtn = ({ cartQuantity, cartId }) => {
  console.log(cartQuantity, "cart");
  const { userDetails, cartList, setCartList } =
    useContext(searchResultContext);
  const baseUrl = process.env.REACT_APP_API_URL;

  const updateQuantity = async (body) => {
    try {
      const url = `${baseUrl}/cart`;
      body = { ...body, customerId: userDetails.azst_customer_id ?? 0 };
      await axios.put(url, body);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartList, "ddddd");
  const increaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);
    console.log(product, "kkk");
    let quantity = product.azst_cart_quantity ?? 1;
    if (product) {
      const updatedCart = cartList.map((eachProduct) => {
        if (eachProduct.azst_cart_id === cartId) {
          if (eachProduct.azst_cart_quantity < eachProduct.max_cart_quantity) {
            quantity = eachProduct.azst_cart_quantity + 1;
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
            quantity = eachProduct.azst_cart_quantity - 1;
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
        padding: "0 4px",
      }}
    >
      <span className="me-2">
        <HiMiniMinusSmall onClick={() => decreaseQuantityCounter(cartId)} />
      </span>
      <span>{cartQuantity}</span>
      <span className="ms-2">
        <GoPlus onClick={() => increaseQuantityCounter(cartId)} />
      </span>
    </div>
  );
};

export default QntyBtn;
