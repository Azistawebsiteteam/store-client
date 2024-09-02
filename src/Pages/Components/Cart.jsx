/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import Cookies from "js-cookie";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { RxCross2 } from "react-icons/rx";
import { calculateTotal } from "../Cart/Functions";
import QntyBtn from "../Cart/QntyBtn";

const Cart = ({ handleCart, showCart }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { updateCartData, cartList } = useContext(searchResultContext);

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

  return (
    <div className={`${showCart ? "showCart" : "hideCart"} cartPageSec`}>
      <div className="cartPageLeftSec">
        <Link
          to="/"
          className="linkBtn"
          onClick={closeCart}
          style={{ color: "#fff", cursor: "pointer", fontSize: "1.3rem" }}
        >
          Continue Shopping
        </Link>
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
          </div>
          <div
            className="savedAmtStrip"
            style={{ backgroundColor: "#F2FFFC", padding: "1rem" }}
          >
            <small style={{ color: "#000", fontWeight: "600" }}>
              You are Saving Rs.{savingCalculator()} from this order.
            </small>
          </div>
          <div className="cartProducts">
            {cartList.map((each, i) => (
              <div
                key={i}
                className="cartProduct d-flex justify-content-around"
              >
                <div className="imgCont">
                  <img
                    src={
                      each.variant_image.slice(
                        each.variant_image.lastIndexOf("/") + 1
                      ) !== ""
                        ? each.variant_image
                        : each.image_src
                    }
                    alt="productImg"
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
                    {each.is_varaints_aval === 1 && (
                      <small>
                        {each.option1 && each.option1}
                        {each.option1 && " - "}
                        {each.option2 && each.option2}
                        {each.option2 && " - "}
                        {each.option3 && each.option3}
                      </small>
                    )}
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
                  <QntyBtn
                    cartQuantity={each.azst_cart_quantity}
                    cartId={each.azst_cart_id}
                  />
                </div>
              </div>
            ))}
          </div>
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
            <Link
              to={jwtToken ? "/checkout" : "/login"}
              className="linkBtn productPgBtn checkoutPgBtn d-block"
              onClick={closeCart}
            >
              Check Out - Rs.{calculateTotal(cartList)}
            </Link>
            <small style={{ color: "#000", fontWeight: "600" }}>
              Discounts and shipping calculated at checkout
            </small>
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
          <Link
            to="/"
            onClick={closeCart}
            style={{ color: "grey", cursor: "pointer" }}
            className="d-md-none"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
