/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Cookies from "js-cookie";

const Cart = () => {
  const [cartList, setCartList] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const localUrl = process.env.REACT_APP_LOCAL_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);

  const cartItems = async () => {
    try {
      const url = `${localUrl}/cart/data`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      const response = await axios.get(url, { headers });
      const { cart_products } = response.data;
      console.log(cart_products, "api cart");
      setCartList(
        cart_products.map((item) => ({
          ...item,
          azst_quantity: item.azst_quantity || 1,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(jwtToken);
    if (jwtToken) {
      cartItems();
    } else {
      let localCart = localStorage.getItem(process.env.REACT_APP_LOACL_CART);
      if (localCart) {
        localCart = JSON.parse(localCart);
        setCartList(localCart);
      }
    }
  }, [localUrl, jwtToken]);

  const handleQuantityChange = (e, id) => {
    const newQuantity = e.target.value;
    setCartList((prevList) =>
      prevList.map((item) =>
        item.azst_cart_id === id
          ? { ...item, azst_quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartList.reduce(
      (total, item) =>
        total +
        parseInt(item.offer_price ?? item.price) * parseInt(item.azst_quantity),
      0
    );
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) =>
      prevList.filter((item) => item.azst_cart_id !== id)
    );
  };

  console.log(cartList);
  return (
    <div className="container mt-5">
      <div className="cartPageTopSec">
        <h3>Your Cart</h3>
        <div className="checkOutBtnCont">
          <span>
            Sub Total
            <br />
            {calculateTotal().toFixed(2)}
          </span>
          <Link className="checkOutBtn" to="">
            <FaCartShopping /> Check out
          </Link>
        </div>
      </div>
      <div className="cartPageBotSec">
        <div className="row">
          {cartList.map((each, i) => (
            <div key={i} className="itemCont">
              <div className="col-sm-1">
                <img
                  className="cartImg"
                  src={
                    each.variant_image.slice(
                      each.variant_image.lastIndexOf("/") + 1
                    ) !== ""
                      ? each.variant_image
                      : each.image_src
                  }
                  alt=""
                />
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <span className="title">{each.product_title}</span>
                  <span className="price">
                    {each.offer_price ?? each.product_compare_at_price}/-
                  </span>
                </div>
              </div>
              <div className="col-sm-3">
                <select
                  className="QuantityDropdown"
                  aria-label=".form-select-sm example"
                  value={each.azst_quantity}
                  onChange={(e) => handleQuantityChange(e, each.azst_cart_id)}
                >
                  <option value="quantity">Quantity</option>
                  {Array.from(
                    { length: parseInt(each.azst_quantity) },
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="col-sm-1">
                <span>
                  {each.offer_price !== null
                    ? each.offer_price * each.azst_quantity
                    : each.price * each.azst_quantity}
                  /-
                </span>
              </div>
              <div className="col-sm-1">
                <GiCancel onClick={() => handleRemoveItem(each.azst_cart_id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
