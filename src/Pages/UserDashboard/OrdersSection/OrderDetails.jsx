import React, { useMemo, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import SideBar from "../UserProfile/SideBar";
import Cookies from "js-cookie";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../index.css";
import ScrollToTop from "../../../Utils/ScrollToTop";
import axios from "axios";
import ErrorHandler from "../../Components/ErrorHandler";
import moment from "moment";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    const statusCount = () => {
      if (orderDetails.azst_orders_status === 1) {
        setSteps(1);
      } else if (orderDetails.azst_orders_confirm_status === 1) {
        setSteps(2);
      } else if (
        orderDetails.azst_orders_delivery_status === 0 &&
        orderDetails.azst_orders_confirm_status === 1
      ) {
        setSteps(3);
      } else if (orderDetails.azst_orders_delivery_status === 1) {
        setSteps(4);
      } else if (orderDetails.azst_orders_delivery_status === 2) {
        setSteps(5);
      }
    };
    statusCount();
  }, [
    orderDetails.azst_orders_status,
    orderDetails.azst_orders_delivery_status,
    orderDetails.azst_orders_confirm_status,
  ]);

  useMemo(() => {
    const getOrderDetails = async () => {
      try {
        const url = `${baseUrl}/orders/customer/order/details`;
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        ErrorHandler.onLoading();
        const response = await axios.post(url, { orderId: id }, { headers });
        ErrorHandler.onLoadingClose();
        setOrderDetails(response.data);
      } catch (error) {
        ErrorHandler.onLoadingClose();
        ErrorHandler.onError(error);
      }
    };
    getOrderDetails();
  }, [baseUrl, jwtToken, id]);

  // eslint-disable-next-line no-unused-vars
  const [steps, setSteps] = useState(1);

  const totalSteps = 5;
  const percentage = (parseInt(steps - 1) / parseInt(totalSteps - 1)) * 100;

  return (
    <>
      <ScrollToTop />
      {Object.keys(orderDetails).length > 0 && (
        <div className="userProfileSec">
          <div className="d-flex">
            <SideBar />
            <div className="ordersCont">
              <div className="d-flex justify-content-between align-items-center">
                <div className="ordersContLeftSec">
                  <FaArrowLeft
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                  />
                  <h5>Orders Details</h5>
                  <small>
                    Orders {`>`} {orderDetails.azst_order_id}
                  </small>
                </div>
                <div className="ordersContRightSec">
                  <Link className="linkBtn">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/helpdesk.svg`}
                      alt="helpdesk"
                    />
                    <span
                      className="d-none d-md-inline"
                      style={{ color: "#008060" }}
                    >
                      Need Help?
                    </span>
                  </Link>
                </div>
              </div>
              <div className="">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item addressTab" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#delivery-details"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Delivery Details
                    </button>
                  </li>
                  {orderDetails.azst_orders_status === 1 && (
                    <li className="nav-item addressTab" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#track-order"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Track Order
                      </button>
                    </li>
                  )}
                </ul>
                <div className="tab-content customTabcontent" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="delivery-details"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="deliveryDetailsSec">
                      <div className="deliveryDetailsTopSec row">
                        <div className="detailHeading col-5 col-md-4">
                          <span
                            className="d-block"
                            style={{ color: "#858585" }}
                          >
                            Order Placed on
                          </span>
                          <span>
                            {moment(orderDetails.azst_orders_created_on).format(
                              "DD MMM, YYYY"
                            )}
                          </span>
                        </div>
                        <div className="detailHeading col-7 col-md-4">
                          <span
                            className="d-block"
                            style={{ color: "#858585" }}
                          >
                            Order ID
                          </span>
                          <span>{orderDetails.azst_order_id}</span>
                        </div>
                        <div className="detailHeading col-8 col-md-4">
                          <span
                            className="d-block"
                            style={{ color: "#858585" }}
                          >
                            Payment Method
                          </span>
                          <span>{orderDetails.azst_orders_payment_method}</span>
                        </div>
                      </div>
                      <div className="deliveryDetailsBotSec">
                        <div
                          className="card ordersSecCard"
                          style={{
                            width: "18rem",
                            border: "1px solid #E3E3E3",
                            backgroundColor: "transparent",
                          }}
                        >
                          <div className="card-body">
                            <span
                              className="card-subtitle"
                              style={{ fontWeight: "600" }}
                            >
                              Delivery Address
                            </span>
                            <div className="paymentDetails">
                              <address>
                                <small
                                  className="card-subtitle mb-2"
                                  style={{
                                    fontWeight: "600",
                                    lineHeight: "1.2rem",
                                  }}
                                >
                                  {orderDetails.shipping_address.address_fname}{" "}
                                  {orderDetails.shipping_address.address_lname}
                                </small>
                                <small
                                  className="d-block mb-2"
                                  style={{
                                    fontWeight: "400",
                                    lineHeight: "1rem",
                                  }}
                                >
                                  {
                                    orderDetails.shipping_address
                                      .address_address1
                                  }{" "}
                                  {
                                    orderDetails.shipping_address
                                      .address_address2
                                  }
                                  {
                                    orderDetails.shipping_address
                                      .address_district
                                  }
                                  {
                                    orderDetails.shipping_address
                                      .address_district
                                  }
                                  Gachibowli, Hyderabad HYDERABAD, TELANGANA
                                  500032 India
                                </small>
                                <small
                                  className="card-subtitle d-block"
                                  style={{
                                    fontWeight: "600",
                                    lineHeight: "1.2rem",
                                  }}
                                >
                                  Contact Number
                                </small>
                                <small style={{ fontWeight: "400" }}>
                                  {orderDetails.shipping_address.address_mobile}
                                </small>
                              </address>
                            </div>
                          </div>
                        </div>
                        <div
                          className="card ordersSecCard"
                          style={{
                            width: "18rem",
                            border: "1px solid #E3E3E3",
                            backgroundColor: "transparent",
                          }}
                        >
                          <div className="card-body">
                            <span
                              className="card-subtitle mb-2"
                              style={{ fontWeight: "600" }}
                            >
                              {orderDetails.azst_orders_status === 0
                                ? "Order Cancelled"
                                : orderDetails.azst_orders_delivery_status === 1
                                ? `Delivered ${moment(
                                    orderDetails.azst_orders_delivery_on
                                  ).format("DD MMM, YYYY")}`
                                : "Order in Transit"}
                            </span>
                            <div
                              className="paymentDetails"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "11rem",
                              }}
                            >
                              <div className="orderedProductsInfo">
                                {orderDetails.products_details.map(
                                  (each, i) => (
                                    <div
                                      className="d-flex align-items-md-start"
                                      key={i}
                                    >
                                      <img
                                        src={each.product_image}
                                        alt="orderImage"
                                        className="orderedProductImg"
                                      />
                                      <div className="ms-2 orderedProductInfo">
                                        <span
                                          className="d-block"
                                          style={{
                                            fontWeight: "500",
                                            lineHeight: "1.2rem",
                                          }}
                                        >
                                          {each.product_title}
                                        </span>
                                        <small style={{ color: "#858585" }}>
                                          {each.option1 && each.option1}
                                          {each.option2 && each.option2}
                                          {each.option3 && each.option3}
                                        </small>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="d-block orderedProductBtn"
                                  style={{ borderRadius: "8px" }}
                                >
                                  Reorder
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="card ordersSecCard"
                          style={{
                            width: "18rem",
                            border: "1px solid #E3E3E3",
                            backgroundColor: "transparent",
                          }}
                        >
                          <div className="card-body">
                            <span
                              className="card-subtitle mb-2"
                              style={{ fontWeight: "600" }}
                            >
                              Payment Summary
                            </span>
                            <div className="paymentDetails">
                              {orderDetails.products_details.map((each, i) => (
                                <div
                                  className="d-flex justify-content-between"
                                  key={i}
                                >
                                  <small
                                    className="card-subtitle d-block"
                                    style={{
                                      fontWeight: "400",
                                      lineHeight: "1.2rem",
                                    }}
                                  >
                                    Total Products {`(${each.azst_order_qty})`}
                                  </small>
                                  <small style={{ fontWeight: "400" }}>
                                    Rs.
                                    {`(${
                                      each.azst_order_qty *
                                      each.azst_product_price
                                    })`}
                                  </small>
                                </div>
                              ))}
                              <div className="d-flex justify-content-between">
                                <small
                                  className="card-subtitle d-block"
                                  style={{
                                    fontWeight: "400",
                                    lineHeight: "1.2rem",
                                  }}
                                >
                                  Shipping Chareges
                                </small>
                                <small style={{ fontWeight: "400" }}>
                                  {parseInt(
                                    orderDetails.azst_orderinfo_shpping_amount
                                  ) === 0
                                    ? "Free Shipping"
                                    : `Rs.${orderDetails.azst_orderinfo_shpping_amount}`}
                                </small>
                              </div>
                              <div className="d-flex justify-content-between">
                                <small
                                  className="card-subtitle d-block"
                                  style={{
                                    fontWeight: "400",
                                    lineHeight: "1.2rem",
                                  }}
                                >
                                  Discounts
                                </small>
                                <small style={{ fontWeight: "400" }}>
                                  Rs.{orderDetails.azst_orders_discount_amount}
                                </small>
                              </div>
                              <div className="d-flex justify-content-between">
                                <small
                                  className="card-subtitle d-block"
                                  style={{
                                    fontWeight: "600",
                                    lineHeight: "1.2rem",
                                  }}
                                >
                                  Grand Total
                                </small>
                                <small style={{ fontWeight: "400" }}>
                                  Rs.{orderDetails.azst_orders_total}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="track-order"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="progress_bar">
                      <div
                        className="progressBar"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: "#0066FF",
                        }}
                      ></div>
                      <div
                        className={`${
                          orderDetails.azst_orders_status === 1
                            ? "circle activeCircle"
                            : "circle"
                        }`}
                        datatitle1="Order placed"
                        datatitle2={moment(
                          orderDetails.azst_orders_created_on
                        ).format("DD MMM, YYYY")}
                      >
                        <TiTick
                          fill={`${
                            orderDetails.azst_orders_status === 1
                              ? "#fff"
                              : "#D5D5D5"
                          }`}
                          style={{ fontSize: "26px" }}
                          className="tickSvgIcon"
                        />
                      </div>
                      <div
                        className={`${
                          orderDetails.azst_orders_confirm_status === 1
                            ? "circle activeCircle"
                            : "circle"
                        }`}
                        datatitle1="Order Confirmed"
                        datatitle2={
                          orderDetails.azst_orders_confirm_on !== null
                            ? moment(
                                orderDetails.azst_orders_confirm_on
                              ).format("DD MMM, YYYY")
                            : ""
                        }
                      >
                        <TiTick
                          fill={`${
                            orderDetails.azst_orders_confirm_status === 1
                              ? "#fff"
                              : "#D5D5D5"
                          }`}
                          style={{ fontSize: "26px" }}
                          className="tickSvgIcon"
                        />
                      </div>
                      <div
                        className={`${
                          orderDetails.azst_orders_delivery_status === 0 &&
                          orderDetails.azst_orders_confirm_status === 1
                            ? "circle activeCircle"
                            : "circle"
                        }`}
                        datatitle1="Shipped"
                        datatitle2={
                          orderDetails.azst_orders_delivery_on !== null
                            ? moment(
                                orderDetails.azst_orders_delivery_on
                              ).format("DD MMM, YYYY")
                            : ""
                        }
                      >
                        <TiTick
                          fill={`${
                            orderDetails.azst_orders_delivery_status === 1
                              ? "#fff"
                              : "#D5D5D5"
                          }`}
                          style={{ fontSize: "26px" }}
                          className="tickSvgIcon"
                        />
                      </div>
                      <div
                        className={`${
                          orderDetails.azst_orders_delivery_status === 1
                            ? "circle activeCircle"
                            : "circle"
                        }`}
                        datatitle1="Out for Delivery"
                        datatitle2={
                          orderDetails.azst_orders_delivery_on !== null
                            ? moment(
                                orderDetails.azst_orders_delivery_on
                              ).format("DD MMM, YYYY")
                            : ""
                        }
                      >
                        <TiTick
                          fill={`${
                            orderDetails.azst_orders_delivery_status === 1
                              ? "#fff"
                              : "#D5D5D5"
                          }`}
                          style={{ fontSize: "26px" }}
                          className="tickSvgIcon"
                        />
                      </div>
                      <div
                        className={`${
                          orderDetails.azst_orders_delivery_status === 2
                            ? "circle activeCircle"
                            : "circle"
                        }`}
                        datatitle1="Delivered"
                        datatitle2={
                          orderDetails.azst_orders_delivery_status !== 2
                            ? `Expected delivery on ${moment(
                                orderDetails.azst_order_exptd_delivery_on
                              ).format("DD MMM, YYYY")}`
                            : moment(
                                orderDetails.azst_orders_delivery_on
                              ).format("DD MMM, YYYY")
                        }
                      >
                        <TiTick
                          fill={`${steps === 4 ? "#fff" : "#D5D5D5"}`}
                          style={{ fontSize: "26px" }}
                          className="tickSvgIcon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
