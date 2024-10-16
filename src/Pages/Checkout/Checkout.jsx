import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import swalErr from "../Components/ErrorHandler";
import Swal from "sweetalert2";
import swalHandle from "../Components/ErrorHandler";
import AddShippingAddress from "./AddShippingAddress";
import { MdMyLocation } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";
import { PiHandCoinsDuotone } from "react-icons/pi";
import "./index.css";
import QntyBtn from "../Cart/QntyBtn";
import ErrorHandler from "../Components/ErrorHandler";
import ScrollToTop from "../../Utils/ScrollToTop";

const Checkout = () => {
  const [isDiscountCodeAppliedMsg, setIsDiscountCodeAppliedMsg] =
    useState(false);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [selectedAccordian, setSelectedAccordian] = useState(null);
  const [addShippingAddress, setAddShippingAddress] = useState(false);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState("");
  const [isBillingAdressSame, setIsBillingAdressSame] = useState(true);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("RazorPay");
  const [discountCode, setDiscountCode] = useState("");
  const [discountCodeError, setDiscountCodeError] = useState("");

  const {
    cartList,
    userDetails,
    setCartList,
    setCartCount,
    discountAmount,
    discountCodes,
    cartTotal,
    setDiscountAmount,
    setDiscountCodes,
  } = useContext(searchResultContext);
  const calculateShippingCharges = (cartList) => {
    return 80.0;
  };
  useEffect(() => {
    const shippingCharges =
      cartTotal >= 150 ? 0.0 : calculateShippingCharges(cartTotal);
    setShippingCharges(shippingCharges);
  }, [cartTotal]);

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const isDiscountApplied = async () => {
    try {
      const url = `${baseUrl}/customer/discount/apply`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };
      ErrorHandler.onLoading();
      const response = await axios.post(url, { discountCode }, { headers });
      ErrorHandler.onLoadingClose();
      if (response.status === 200) {
        const { discountAmount, message } = response.data;

        message !== ""
          ? setIsDiscountCodeAppliedMsg(message)
          : setIsDiscountCodeAppliedMsg(`${discountCode} is applied`);

        setDiscountCodes((pre) => [...pre, discountCode]);
        setDiscountAmount(
          (prev) => parseFloat(prev) + parseFloat(discountAmount)
        );
        ErrorHandler.onSuccess("Discount applied");
        setDiscountCode("");
        setDiscountCodeError("");
      }
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
      const message = error.response
        ? error.response.data?.message
        : "Opps something went wrong";
      setDiscountCodeError(message);
      setDiscountCode("");
    }
  };

  const {
    azst_customer_id,
    azst_customer_fname,
    azst_customer_lname,
    azst_customer_mobile,
    // azst_customer_email,
  } = userDetails;

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
          const addressBook = response.data;
          if (addressBook.length > 0) {
            const address = addressBook.find(
              (a) => parseInt(a.address_defaultStatus) === 1
            );

            setSelectedShippingAddress(address.address_id);
            setIsBillingAdressSame(true);
          } else {
            setSelectedAccordian("2");
          }
        }
        swalErr.onLoadingClose();
      } catch (error) {
        swalErr.onLoadingClose();
        swalErr.onError(error);
      }
    };
    getAddressBook();
  }, [baseUrl, jwtToken]);

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

  const handleTypeOfPayment = () => {
    if (selectedShippingAddress === "" || paymentMethod === "") {
      return alert("Please select a shipping address");
    }
    if (cartTotal === 0) {
      alert("Your cart is empty");
      return;
    }

    if (paymentMethod === "RazorPay") {
      createRazorPayOrder();
    } else {
      const response = {
        amount: (cartTotal + shippingCharges - discountAmount).toFixed(2),
        currency: "INR",
        orderId: "",
        paymentId: "",
        notes: "",
        noteAttributes: "",
      };

      createPlaceOrder(response);
    }
  };

  // Create Razorpay order
  const createRazorPayOrder = async (e) => {
    try {
      const data = {
        amount: cartTotal, // Convert to paise
        currency: "INR",
        receiptId: azst_customer_id,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      };
      const url = `${baseUrl}/orders/customer/creat-payment`;
      ErrorHandler.onLoading();
      const response = await axios.post(url, data, { headers });
      ErrorHandler.onLoadingClose();
      handleRazorPayScreen(e, response.data);
    } catch (err) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(err);
    }
  };

  // Display Razorpay payment screen
  const handleRazorPayScreen = async (e, data) => {
    const { order_id, amount, currency } = data;
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
      amount,
      currency,
      name: "Azista Industries",
      description: "Azista E-commerce Services",
      image: `${process.env.PUBLIC_URL}/images/logo1.svg`,
      order_id,
      handler: async function (response) {
        validatePaymentRequest(response, amount, currency);
      },
      prefill: {
        name: "Azsta Industries",
        email: "azstaindustries@gmail.com",
        contact: "6089879778",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(`Payment failed! Error: ${response.error.description}`);
    });
    rzp1.open();
  };

  const validatePaymentRequest = async (paymentData, amount, currency) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentData;
    const data = {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    const url = `${baseUrl}/orders/customer/validate-payment`;
    const response = await axios.post(url, data, { headers });
    if (response.status === 200) {
      createPlaceOrder({ ...response.data, amount, currency });
      alert("Payment Successful!");
    } else {
      alert("Payment failed! Please try again.");
    }
  };

  const createPlaceOrder = async (response) => {
    try {
      const url = `${baseUrl}/orders/customer/place-order`;
      const { amount, currency, orderId, paymentId, notes, noteAttributes } =
        response;

      const requiredCartList = cartList.map((product) => ({
        azst_cart_product_id: product.azst_cart_product_id,
        azst_cart_variant_id: product.azst_cart_variant_id,
        azst_cart_quantity: product.azst_cart_quantity,
        price: product.price,
        azst_cart_id: product.azst_cart_id,
        product_compare_at_price: product.product_compare_at_price,
        compare_at_price: product.compare_at_price,
        offer_price: product.offer_price,
        is_varaints_aval: product.is_varaints_aval,
      }));

      const body = {
        paymentMethod,
        paymentData: {
          amount,
          currency,
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          notes,
          noteAttributes,
        },
        discountAmount: discountAmount,
        discountCode: discountCodes,
        orderSource: "website",
        addressId: selectedShippingAddress,
        isBillingAdsame: isBillingAdressSame,
        shippingCharge: shippingCharges,
        cartList: requiredCartList,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      };

      ErrorHandler.onLoading();
      const order = await axios.post(url, body, { headers });

      if (order.status === 200) {
        setCartList([]);
        setCartCount(0);
        const { orderId } = order.data;
        navigate("/order-summary", {
          state: { orderId: orderId },
        });
      }
      ErrorHandler.onLoadingClose();
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const handleCartStatus = (val) => {
    setSelectedAccordian(val);
  };

  return (
    <>
      <ScrollToTop />
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
                        >{`  ${azst_customer_fname} ${azst_customer_lname}`}</span>
                      </small>
                      <small className="d-block">
                        Phone
                        <span
                          style={{ marginLeft: "4px", fontWeight: "600" }}
                        >{`  ${azst_customer_mobile}`}</span>
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
                        onClick={() => handleCartStatus("2")}
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
                            checked={
                              parseInt(selectedShippingAddress) ===
                              each.address_id
                            }
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
                                onClick={() => handleCartStatus("3")}
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
                          margin: "0.2rem 0",
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
                      {addShippingAddress && (
                        <AddShippingAddress
                          setSelectedShippingAddress={
                            setSelectedShippingAddress
                          }
                          setShippingAddress={setShippingAddress}
                          setAddShippingAddress={setAddShippingAddress}
                          setSelectedAccordian={setSelectedAccordian}
                        />
                      )}
                      <h6>Billing Address</h6>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="isBillingAndShippingAddressSame"
                          checked={isBillingAdressSame}
                          onClick={() =>
                            setIsBillingAdressSame(!isBillingAdressSame)
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="isBillingAndShippingAddressSame"
                        >
                          Same as shipping address
                        </label>
                      </div>
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
                      <div className="orderSummaryInfoCont">
                        <div className="">
                          <small>
                            Order confirmation will be sent to your registered
                            email address.
                          </small>
                          {cartList.map((each, i) => (
                            <div
                              className="d-flex justify-content-between align-items-center mt-2 mb-2"
                              key={i}
                            >
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
                            onClick={() => handleCartStatus("4")}
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
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          value="COD"
                          onChange={handlePaymentMethod}
                          checked={paymentMethod === "COD"}
                          id="cod"
                        />
                        <label className="form-check-label" htmlFor="cod">
                          Cash on Delivery <PiHandCoinsDuotone />
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          onChange={handlePaymentMethod}
                          name="payment"
                          value="RazorPay"
                          checked={paymentMethod === "RazorPay"}
                          id="razorPayment"
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
                        onClick={() => handleCartStatus("")}
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
                    padding: "1rem",
                  }}
                >
                  <h5>Discounts and Coupon</h5>
                  <div className="d-flex justify-content-between mt-1 mb-1">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Discount Code or Coupon Code"
                      onChange={handleDiscountChange}
                      value={discountCode}
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
                      onClick={isDiscountApplied}
                      disabled={discountCode.length > 1 ? false : true}
                    >
                      Apply
                    </button>
                  </div>
                  <small style={{ color: "darkred" }}>
                    {discountCodeError}
                  </small>
                  <small>{isDiscountCodeAppliedMsg}</small>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid rgba(176, 176, 176, 1)",
                    padding: "1rem",
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
                        Rs.{cartTotal}
                      </small>
                      <small>Inclusive of all taxes</small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-1 mb-1">
                    <small style={{ fontWeight: "500" }}>
                      Shipping Charges
                    </small>
                    <div className="d-flex flex-column align-items-end">
                      <small style={{ fontWeight: "500" }}>
                        Rs.{shippingCharges}
                      </small>
                      <small>Free shipping for orders over Rs. 150.00!</small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-1 mb-1">
                    <small style={{ fontWeight: "500" }}>Discounts</small>
                    <small style={{ fontWeight: "500" }}>
                      Rs. {parseFloat(discountAmount).toFixed(2)}
                    </small>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{
                    borderBottom: "1px solid rgba(176, 176, 176, 1)",
                    padding: "1rem",
                  }}
                >
                  <h6>Grand Total</h6>
                  <h6>
                    Rs.
                    {(cartTotal + shippingCharges - discountAmount).toFixed(2)}
                  </h6>
                </div>
                <div
                  className="d-flex justify-content-md-end"
                  style={{ padding: "1rem 0 1rem 1rem" }}
                >
                  <button
                    className="buyNowBtn"
                    style={{
                      width: "max-content",
                      padding: "0.6rem 1rem",
                    }}
                    onClick={handleTypeOfPayment}
                  >
                    Proceed to Pay - Rs.
                    {(cartTotal + shippingCharges - discountAmount).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
