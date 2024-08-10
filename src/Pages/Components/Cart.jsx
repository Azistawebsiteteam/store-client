/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Cookies from "js-cookie";
import swalHandle from "./ErrorHandler";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { MdCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GoPlus, GoMinus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { calculateTotal } from "../Cart/Functions";

const Cart = ({ handleCart }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
  const { userDetails, updateCartData, cartList, setCartList, cartCount } =
    useContext(searchResultContext);

  // const onCheckout = async (Products) => {
  //   try {
  //     const url = `${baseUrl}/cart`;
  //     const headers = {
  //       Authorization: `Bearer ${jwtToken}`,
  //     };
  //     const cartProducts = Products.map((p) => ({
  //       productId: p.productId,
  //       variantId: p.variantId,
  //       quantity: p.azst_quantity,
  //     }));
  //     const response = await axios.post(url, { cartProducts }, { headers });
  //     if (response.status === 200) {
  //       swalHandle.onSuccess("Product added to cart");
  //       if (isClear === "ClearCart") {
  //         localStorage.removeItem(process.env.REACT_APP_LOACL_CART);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRemoveItem = async (id) => {
    console.log(id, "ididid");
    let url = `${baseUrl}/cart/data`;
    const response = await axios.patch(url, { cartId: id });
    updateCartData();
    console.log(response);
  };

  const closeCart = () => {
    handleCart(false);
  };

  const productTotalPrice = (price, offerPrice, quantity) => {
    if (price !== "") {
      return parseInt(price) * parseInt(quantity);
    } else {
      return parseInt(offerPrice) * parseInt(quantity);
    }
  };

  const savingCalculator = () => {
    return cartList.reduce(
      (total, item) =>
        total +
        (item.is_varaints_aval !== 0
          ? (parseInt(item.product_compare_at_price) - parseInt(item.price)) *
            parseInt(item.azst_cart_quantity)
          : (parseInt(item.product_compare_at_price) - parseInt(item.price)) *
            parseInt(item.azst_cart_quantity)),
      0
    );
  };

  const updateQuantity = async (body) => {
    try {
      const url = `${baseUrl}/cart`;
      body = { ...body, customerId: userDetails.azst_customer_id ?? 0 };
      await axios.put(url, body);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantityCounter = (cartId) => {
    const product = cartList.find((c) => c.azst_cart_id === cartId);
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
      console.log(updatedCart, "updatedCart");
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

  console.log(cartList, "cartList");

  return (
    <div className="cartPageSec">
      <div className="cartPageLeftSec">
        <span onClick={closeCart} style={{ color: "#fff" }}>
          Continue Shopping
        </span>
      </div>
      {cartList.length ? (
        <div className="cartPageRightSec">
          <div className="cartPageTopSec">
            <h5>
              Shopping Cart{" "}
              <small style={{ fontWeight: "400" }}>
                ({cartList.length} Product)
              </small>
            </h5>
            <RxCross2
              style={{
                backgroundColor: "#fff",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={closeCart}
            />
            {/* <div className="checkOutBtnCont">
              <span>
                Sub Total
                <br />
                {calculateTotal().toFixed(2)}
              </span>
              <Link className="checkOutBtn" to="/checkout">
                <FaCartShopping /> Check out
              </Link>
            </div> */}
          </div>
          <div
            className="savedAmtStrip"
            style={{ backgroundColor: "#F2FFFC", padding: "1rem" }}
          >
            <small style={{ color: "#000", fontWeight: "600" }}>
              You are Saving Rs.{savingCalculator()} from this order.
            </small>
          </div>
          {cartList.map((each, i) => (
            <div key={i} className="cartProduct d-flex justify-content-around">
              <div className="imgCont">
                <img
                  src={
                    each.variant_image.slice(
                      each.variant_image.lastIndexOf("/") + 1
                    ) !== ""
                      ? each.variant_image
                      : each.image_src
                  }
                  alt="sparkelImg"
                  className="cartProductImg"
                />
              </div>
              <div
                className="d-flex flex-column justify-content-between cartProductMidSec"
                style={{ padding: "0.6rem 0" }}
              >
                <div className="">
                  <small className="d-block">
                    <strong>{each.product_main_title}</strong>
                  </small>
                  {each.is_varaints_aval === 1 && <small>Pack of 3</small>}
                </div>
                <div>
                  <small>
                    <strong>
                      Rs.
                      {productTotalPrice(
                        each.price,
                        each.offer_price,
                        each.azst_cart_quantity
                      )}
                      .00
                    </strong>
                  </small>
                </div>
              </div>
              <div
                className="d-flex flex-column justify-content-between align-items-end"
                style={{ padding: "0.4rem 0", cursor: "pointer" }}
              >
                <GiCancel
                  fill="rgb(180, 180, 180)"
                  onClick={() => handleRemoveItem(each.azst_cart_id)}
                />
                <div
                  style={{
                    border: "1px solid #B4B4B4",
                    borderRadius: "6px",
                    padding: "0 0.6rem;",
                  }}
                >
                  <span className="me-2">
                    <HiMiniMinusSmall
                      onClick={() => decreaseQuantityCounter(each.azst_cart_id)}
                    />
                  </span>
                  <span>{each.azst_cart_quantity}</span>
                  <span className="ms-2">
                    <GoPlus
                      onClick={() => increaseQuantityCounter(each.azst_cart_id)}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="relatedVariants">
            <div className="">
              <h5>Try Other variants</h5>
              <div className=""></div>
            </div>
            <div className="cartProduct d-flex justify-content-around">
              <div className="imgCont">
                <img
                  src={`${process.env.process.env.PUBLIC_URL}/images/sparkelImg.png`}
                  alt="sparkelImg"
                  className="cartProductImg"
                />
              </div>
              <div
                className="d-flex flex-column justify-content-between cartProductMidSec"
                style={{ padding: "0.6rem 0" }}
              >
                <div className="">
                  <small className="d-block">
                    <strong>Sparkel Youth - Anti-Aging Face Sheet Mask</strong>
                  </small>
                </div>
                <div>
                  <small>
                    <strong>Rs. 382.00 - Rs.1520.00</strong>
                  </small>
                </div>
              </div>
            </div>
          </div> */}
          <div
            className="freeShippingStrip"
            style={{ backgroundColor: "#F2FFFC", padding: "1rem" }}
          >
            <small style={{ color: "#000", fontWeight: "600" }}>
              {calculateTotal(cartList) > 150 &&
                "Congratulations, You are eligible for free shipping."}
            </small>
          </div>
          <div className="cartPgbotSec">
            <Link className="linkBtn productPgBtn d-block">
              Check Out - Rs.{calculateTotal(cartList)}
            </Link>
            <small style={{ color: "#000", fontWeight: "600" }}>
              Discounts and shipping calculated at checkout
            </small>
          </div>
          {/* <div className="cartPageProductSec">
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
                      <span className="comparedPrice">
                        {each.compare_at_price ?? each.product_compare_at_price}
                        /-
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="QuantityDropdown"
                      aria-label=".form-select-sm example"
                      value={each.azst_quantity}
                      onChange={(e) =>
                        handleQuantityChange(e, each.azst_cart_id)
                      }
                    >
                      variant_quantity: output?.variant_quantity,
                      {Array.from(
                        {
                          length:
                            each.variant_quantity &&
                            each.variant_quantity !== null
                              ? parseInt(each.variant_quantity)
                              : parseInt(each.chintal_quantity) +
                                parseInt(each.corporate_office_quantity),
                        },
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
                    <GiCancel
                      onClick={() => handleRemoveItem(each.azst_cart_id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      ) : (
        <div className="cartPageRightSec">
          <img
            src={`${process.env.PUBLIC_URL}/images/emptyCart.gif`}
            alt="empty cart"
            className="emptyCartImg"
          />
          <span style={{ color: "grey", marginTop: "0.4rem" }}>
            Your Cart is Empty
          </span>
        </div>
      )}
    </div>
  );
};

export default Cart;
