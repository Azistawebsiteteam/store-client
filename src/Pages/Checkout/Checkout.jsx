import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import swalErr from "../Components/ErrorHandler";
import Swal from "sweetalert2";
import swalHandle from "../Components/ErrorHandler";
import AddShippingAddress from "../Components/AddShippingAddress";
import { MdMyLocation } from "react-icons/md";
import { calculateTotal } from "../Cart/Functions";
import { SiRazorpay } from "react-icons/si";
import { PiHandCoinsDuotone } from "react-icons/pi";
import "./index.css";
import QntyBtn from "../Cart/QntyBtn";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState([]);
  const [selectedAccordian, setSelectedAccordian] = useState(null);
  const [addShippingAddress, setAddShippingAddress] = useState(false);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState();

  const { cartList } = useContext(searchResultContext);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  useEffect(() => {
    const getAddressBook = async () => {
      try {
        const URL = `${baseUrl}/address/myaddresses`;
        const headers = {
          Authorization: `Bearer ${jwtToken} `,
        };
        swalErr.onLoading();
        const response = await axios.post(URL, {}, { headers });

        if (response.status === 200) {
          setShippingAddress(response.data);
        }
        swalErr.onLoadingClose();
      } catch (error) {
        swalErr.onLoadingClose();
        swalErr.onError(error);
      }
    };
    getAddressBook();
  }, [baseUrl, jwtToken]);

  const { userDetails } = useContext(searchResultContext);

  const handleAccTab = (i) => {
    if (selectedAccordian === i) {
      return setSelectedAccordian(null);
    }
    setSelectedAccordian(i);
  };

  const logoutUser = async () => {
    try {
      const url = `${baseUrl}/auth/logout`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      const response = await axios.post(url, {}, { headers });

      if (response.status === 200) {
        swalHandle.onLoadingClose();
        Swal.fire({
          title: "Visit Again!",
          text: "Logout Successfull",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/login");
          Cookies.remove(token);
        }, 2000);
      }
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  const showAddShippingAddress = () => {
    setAddShippingAddress(!addShippingAddress);
  };

  const handleShippingAddress = (addressId) => {
    setSelectedShippingAddress(addressId);
  };

  const productTotalPrice = (price, offerPrice, quantity) => {
    if (price !== "") {
      return parseInt(price) * parseInt(quantity);
    } else {
      return parseInt(offerPrice) * parseInt(quantity);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  // Create Razorpay order
  const createRazorPayOrder = async () => {
    try {
      const data = {
        amount: calculateTotal(cartList) * 100, // Convert to paise
        currency: "INR",
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "http://192.168.214.253:5018/api/v1/orders/customer/payment";

      const response = await axios.post(url, data, { headers });
      handleRazorPayScreen(response.data.amount);
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order. Please try again later.");
    }
  };

  // Display Razorpay payment screen
  const handleRazorPayScreen = async (amount) => {
    console.log("loading screen");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection and try again."
      );
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Ensure this is set in your .env file
      amount: amount,
      currency: "INR",
      name: "Papaya Coders",
      description: "Payment to Papaya Coders",
      image: `${process.env.PUBLIC_URL}/images/logo1.svg`,
      prefill: {
        name: "Rajendra",
        email: "rajendraCheerneni@gmail.com",
      },
      theme: {
        color: "#FFE03F",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bottomSec">
      <div className="checkoutPage">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="accordian">
                <div className="accordion-item checkoutAcc">
                  <div className="accTitle" onClick={() => handleAccTab("1")}>
                    <h6>Account</h6>
                    <span className="accBtn">
                      {selectedAccordian === "1" ? (
                        <RiArrowDropUpLine className="accBtnArr" />
                      ) : (
                        <RiArrowDropDownLine className="accBtnArr" />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selectedAccordian === "1" ? "accCont show" : "accCont"
                    }
                  >
                    <small>
                      Name
                      <span
                        style={{ marginLeft: "4px", fontWeight: "600" }}
                      >{`  ${userDetails.azst_customer_fname} ${userDetails.azst_customer_lname}`}</span>
                    </small>
                    <small className="d-block">
                      Phone
                      <span
                        style={{ marginLeft: "4px", fontWeight: "600" }}
                      >{`  ${userDetails.azst_customer_mobile}`}</span>
                    </small>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#008060",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "0.2rem",
                      }}
                      onClick={handleLogout}
                    >
                      Log Out & Login In into Another Account
                    </button>
                    <small className="d-block" style={{ lineHeight: "18px" }}>
                      Please note that upon Clicking 'Log Out' you will loose
                      all the items in your cart and will be redirected Azista
                      Home Page
                    </small>
                    <button
                      className="buyNowBtn"
                      style={{ width: "max-content", padding: "0.6rem 1rem" }}
                      onClick={() => setSelectedAccordian("2")}
                    >
                      Continue Check Out
                    </button>
                  </div>
                </div>
                <div className="accordion-item checkoutAcc">
                  <div className="accTitle" onClick={() => handleAccTab("2")}>
                    <h6>Ship to</h6>
                    <span className="accBtn">
                      {selectedAccordian === "2" ? (
                        <RiArrowDropUpLine className="accBtnArr" />
                      ) : (
                        <RiArrowDropDownLine className="accBtnArr" />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selectedAccordian === "2" ? "accCont show" : "accCont"
                    }
                  >
                    {shippingAddress.map((each, i) => (
                      <div className="addressCard" key={each.address_id}>
                        <input
                          type="radio"
                          id={each.address_id}
                          name="addressCard"
                          onChange={() =>
                            handleShippingAddress(each.address_id)
                          }
                        />
                        <div className="ms-2">
                          <small
                            style={{ fontWeight: "600", paddingRight: "2px" }}
                          >{`${each.address_first_name} ${each.address_last_name} `}</small>
                          -
                          <small
                            style={{
                              color: "#848484",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          >
                            {each.address_home_company}
                          </small>
                          -
                          <small
                            style={{ color: "#848484", paddingLeft: "2px" }}
                          >
                            {each.address_mobile}
                          </small>
                          <div className="">
                            <small style={{ fontWeight: "500" }}>
                              {each.address_address1}
                              {` ${each.address_city} ${each.address_zipcode}`}
                            </small>
                          </div>
                          {selectedShippingAddress === each.address_id && (
                            <button
                              className="buyNowBtn"
                              style={{
                                width: "max-content",
                                padding: "0.6rem 1rem",
                              }}
                              onClick={() => setSelectedAccordian("3")}
                            >
                              Deliver here
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      style={{
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        color: "#008060",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "0.2rem",
                      }}
                      onClick={showAddShippingAddress}
                    >
                      <MdMyLocation
                        style={{ fontSize: "18px", marginRight: "4px" }}
                      />
                      {addShippingAddress
                        ? "Use current location"
                        : "Add New Address"}
                    </button>
                    {addShippingAddress && <AddShippingAddress />}
                  </div>
                </div>
                <div className="accordion-item checkoutAcc">
                  <div className="accTitle" onClick={() => handleAccTab("3")}>
                    <div>
                      <h6>Order Summary</h6>
                    </div>
                    <span className="accBtn">
                      {selectedAccordian === "3" ? (
                        <RiArrowDropUpLine className="accBtnArr" />
                      ) : (
                        <RiArrowDropDownLine className="accBtnArr" />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selectedAccordian === "3" ? "accCont show" : "accCont"
                    }
                  >
                    <div className="orderSummaryCont">
                      <div className="">
                        <small>
                          Order confirmation will be sent to your registered
                          email address.
                        </small>
                        {cartList.map((each, i) => (
                          <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                            <div className="d-flex align-items-start">
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
                              <div className="ms-2">
                                <small className="mb-1">
                                  <strong>{each.product_main_title}</strong>
                                </small>
                                <small className="d-block mb-1">
                                  {each.is_varaints_aval === 1 && (
                                    <small>Pack of 3</small>
                                  )}
                                </small>
                                <QntyBtn
                                  cartQuantity={each.azst_cart_quantity}
                                  cartId={each.azst_cart_id}
                                />
                                <small className="mt-1">
                                  Delivery between 09 February, 2024 and 20
                                  February, 2024
                                </small>
                              </div>
                            </div>
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
                        ))}
                        <button
                          className="buyNowBtn d-block"
                          style={{
                            width: "max-content",
                            padding: "0.6rem 1rem",
                          }}
                          onClick={() => setSelectedAccordian("4")}
                        >
                          Continue
                        </button>
                      </div>
                      <div className=""></div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item checkoutAcc">
                  <div className="accTitle" onClick={() => handleAccTab("4")}>
                    <h6>Payment</h6>
                    <span className="accBtn">
                      {selectedAccordian === "4" ? (
                        <RiArrowDropUpLine className="accBtnArr" />
                      ) : (
                        <RiArrowDropDownLine className="accBtnArr" />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selectedAccordian === "4" ? "accCont show" : "accCont"
                    }
                  >
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="cod"
                      />
                      <label class="form-check-label" htmlFor="cod">
                        Cash on Delivery <PiHandCoinsDuotone />
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment"
                        id="onlinePayment"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="onlinePayment"
                      >
                        Razor pay <SiRazorpay />
                      </label>
                    </div>
                    <button
                      className="buyNowBtn d-block"
                      style={{
                        width: "max-content",
                        padding: "0.6rem 1rem",
                      }}
                      onClick={() => setSelectedAccordian("")}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 bg-light">
              <div
                style={{
                  borderBottom: "1px solid rgba(176, 176, 176, 1)",
                  paddingBottom: "1rem",
                }}
              >
                <h5>Discounts and Coupon</h5>
                <div className="d-flex justify-content-between mt-1 mb-1">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Discount Code or Coupon Code"
                    style={{
                      border: "1px solid rgba(176, 176, 176, 1)",
                      width: "70%",
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#008060",
                      fontWeight: "600",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div
                style={{
                  borderBottom: "1px solid rgba(176, 176, 176, 1)",
                  padding: "1rem 0",
                }}
              >
                <h5>Price Details</h5>
                <small>Order confirmation will be sent via email</small>
                <div className="d-flex justify-content-between mt-1 mb-1">
                  <small style={{ fontWeight: "500" }}>
                    Item ({cartList.length}
                    {cartList.length > 1 ? " products" : " product"})
                  </small>
                  <div className="d-flex flex-column align-items-end">
                    <small style={{ fontWeight: "500" }}>
                      Rs.{calculateTotal(cartList)}.00
                    </small>
                    <small>Inclusive of all taxes</small>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-1 mb-1">
                  <small style={{ fontWeight: "500" }}>Shipping Charges</small>
                  <div className="d-flex flex-column align-items-end">
                    <small style={{ fontWeight: "500" }}>Rs.88.00 - Free</small>
                    <small>Free shipping for orders over Rs. 150.00!</small>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-1 mb-1">
                  <small style={{ fontWeight: "500" }}>Discounts</small>
                  <small style={{ fontWeight: "500" }}>Rs.0.00</small>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderBottom: "1px solid rgba(176, 176, 176, 1)",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <h6>Grand Total</h6>
                <h6>Rs.{calculateTotal(cartList)}.00</h6>
              </div>
              <div className="d-flex justify-content-md-end">
                <button
                  className="buyNowBtn"
                  style={{
                    width: "max-content",
                    padding: "0.6rem 1rem",
                  }}
                  onClick={createRazorPayOrder}
                >
                  Proceed to Pay - Rs.{calculateTotal(cartList)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
