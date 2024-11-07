/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { RxCross2 } from "react-icons/rx";
import { calculateTotal } from "../Cart/Functions";
import QntyBtn from "../Cart/QntyBtn";
import SimilarProductsSlider from "../Cart/SimilarProductsSlider";

const Cart = ({ handleCart, showCart }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const {
    updateCartData,
    cartList,
    cartTotal,
    discountAmount,
    similarProducts,
  } = useContext(searchResultContext);

  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const handleRemoveItem = async (id) => {
    let url = `${baseUrl}/cart/data`;
    // eslint-disable-next-line no-unused-vars
    const response = await axios.patch(url, { cartId: id });
    updateCartData();
  };

  const closeCart = () => {
    handleCart(false);
  };

  const productTotalPrice = (isvariantsAval, price, offerPrice, quantity) => {
    if (parseInt(isvariantsAval) !== 1) {
      return parseInt(price) * parseInt(quantity);
    } else {
      return parseInt(offerPrice) * parseInt(quantity);
    }
  };

  const savingCalculator = (cartList, cartTotal) => {
    const totalPrice = cartList.reduce((total, item) => {
      const itemPrice =
        item.is_varaints_aval !== 0
          ? Number(item.compare_at_price)
          : Number(item.product_compare_at_price);
      const price = itemPrice * parseInt(item.azst_cart_quantity);
      return total + price;
    }, 0);
    const saving = totalPrice - cartTotal;
    return Math.max(saving, 0);
  };

  return (
    <div className={`${showCart ? "showCart" : "hideCart"} cartPageSec`}>
      <div className="cartPageLeftSec">
        <button
          onClick={closeCart}
          style={{
            color: "#fff",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.3rem",
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </button>
      </div>
      {cartList.length ? (
        <div className="cartPageRightSec">
          <div className="cartPageTopSec">
            <h5
              style={{
                fontWeight: "600",
                fontFamily: "Outfit",
              }}
            >
              Shopping Cart{" "}
              <sup
                style={{
                  fontWeight: "600",
                  fontSize: "0.7rem",
                  color: "#000",
                }}
              >
                (
                {cartList.length > 1
                  ? `${cartList.length} Products`
                  : `${cartList.length} Product`}{" "}
                )
              </sup>
            </h5>
            <RxCross2
              style={{
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
              size={20}
              strokeWidth={1}
              onClick={closeCart}
            />
          </div>
          <div
            className="savedAmtStrip"
            style={{ backgroundColor: "#F2FFFC", padding: "1rem" }}
          >
            <span
              style={{ color: "#000", fontWeight: "500", fontSize: "0.9rem" }}
            >
              You are Saving Rs.{savingCalculator(cartList, cartTotal)} from
              this order.
            </span>
          </div>
          <div className="cartProducts">
            {cartList.map((each, i) => (
              <Link
                key={i}
                to={`/productitem/${each.product_url_title}`}
                className="linkBtn"
              >
                <div className="cartProduct d-flex justify-content-around">
                  <div className="imgCont">
                    <img
                      src={
                        each.variant_image?.slice(
                          each.variant_image.lastIndexOf("/") + 1
                        ) !== ""
                          ? each.variant_image
                          : each.image_src
                      }
                      alt="productImg"
                      className="cartProductImg"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-between cartProductMidSec">
                    <div className="">
                      <span
                        className="d-block"
                        style={{ fontWeight: "500", fontSize: "0.9rem" }}
                      >
                        {each.product_main_title}
                      </span>
                      {each.is_varaints_aval === 1 && (
                        <small>
                          {each.option1 && each.option1}
                          {each.option2 && " - "}
                          {each.option2 && each.option2}
                          {each.option3 && " - "}
                          {each.option3 && each.option3}
                        </small>
                      )}
                    </div>
                    <div>
                      <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>
                        {each.azst_cart_product_type === "" ||
                        each.azst_cart_product_type === null ? (
                          <span>
                            Rs.
                            {productTotalPrice(
                              each.is_varaints_aval,
                              each.price,
                              each.offer_price,
                              each.azst_cart_quantity
                            )}
                          </span>
                        ) : (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginRight: "5px",
                              }}
                            >
                              Rs.
                              {productTotalPrice(
                                each.is_varaints_aval,
                                each.price,
                                each.offer_price,
                                each.azst_cart_quantity
                              )}
                            </span>
                            <span>
                              {(
                                productTotalPrice(
                                  each.is_varaints_aval,
                                  each.price,
                                  each.offer_price,
                                  each.azst_cart_quantity
                                ) - parseFloat(each.azst_cart_dsc_amount)
                              ).toFixed(2)}
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className="d-flex flex-column justify-content-between align-items-end"
                    style={{ padding: "0.4rem 0", cursor: "pointer" }}
                  >
                    <MdOutlineCancel
                      size={20}
                      fill="rgb(180, 180, 180)"
                      onClick={() => handleRemoveItem(each.azst_cart_id)}
                    />
                    <QntyBtn
                      cartQuantity={each.azst_cart_quantity}
                      cartId={each.azst_cart_id}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {similarProducts.length > 0 && (
            <div className="otherVariantsSec">
              <SimilarProductsSlider
                similarProducts={similarProducts}
                closeCart={closeCart}
              />
            </div>
          )}
          <div
            className="freeShippingStrip"
            style={{ backgroundColor: "#F2FFFC", padding: "1rem" }}
          >
            <span
              style={{ color: "#000", fontWeight: "500", fontSize: "0.9rem" }}
            >
              {calculateTotal(cartList) > 150
                ? "Congratulations, You are eligible for free shipping."
                : "Free shipping for orders over Rs. 150.00!"}
            </span>
          </div>
          <div className="cartPgbotSec">
            <Link
              to={jwtToken ? "/checkout" : "/login"}
              className="commonBtn d-block cartPgBtn"
              style={{ textDecoration: "none" }}
              onClick={closeCart}
            >
              Check Out - Rs.
              {(parseFloat(cartTotal) - parseFloat(discountAmount)).toFixed(2)}
            </Link>
            <span style={{ color: "#000", marginTop: "0.5rem" }}>
              Discounts and shipping calculated at checkout
            </span>
          </div>
        </div>
      ) : (
        <div className="cartPageRightSec emptyCartPageSec">
          <img
            src={`${process.env.PUBLIC_URL}/images/emptyCart.gif`}
            alt="empty cart"
            className="emptyCartImg"
          />
          <span style={{ color: "grey", marginTop: "0.4rem" }}>
            Your Cart is Empty
          </span>
          <button
            onClick={closeCart}
            style={{ cursor: "pointer" }}
            className="d-md-none continueSpngBtn"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
