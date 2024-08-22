import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import SideBar from "../UserProfile/SideBar";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(2);

  const totalSteps = 4;
  const percentage = (parseInt(steps - 1) / parseInt(totalSteps - 1)) * 100;

  console.log(percentage, setSteps, "progressStatus");
  return (
    <div className="userProfileSec">
      <div className="d-flex">
        <SideBar />
        <div className="ordersCont">
          <div className="d-flex justify-content-md-between align-items-center">
            <div className="ordersContLeftSec">
              <FaArrowLeft
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              />
              <h5>Orders Details</h5>
              <small>Orders {`>`} 040-12342424242</small>
            </div>
            <div className="ordersContRightSec">
              <Link className="linkBtn">
                <img
                  src={`${process.env.PUBLIC_URL}/images/helpdesk.svg`}
                  alt="helpdesk"
                />
                <span style={{ color: "#008060" }}>Need Help?</span>
              </Link>
            </div>
          </div>
          <div className="">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item addressTab" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Delivery Details
                </button>
              </li>
              <li class="nav-item addressTab" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Track Order
                </button>
              </li>
            </ul>
            <div class="tab-content customTabcontent" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="deliveryDetailsSec">
                  <div className="deliveryDetailsTopSec">
                    <div className="detailHeading me-5">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Order Placed on
                      </span>
                      <span>02 Feb, 2024</span>
                    </div>
                    <div className="detailHeading me-5">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Order ID
                      </span>
                      <span>040-12313424</span>
                    </div>
                    <div className="detailHeading">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Payment Method
                      </span>
                      <span>ICICI Bank Credit Cardending in 0008</span>
                    </div>
                  </div>
                  <div className="deliveryDetailsBotSec">
                    <div
                      class="card ordersSecCard"
                      style={{
                        width: "18rem",
                        border: "1px solid #E3E3E3",
                        backgroundColor: "transparent",
                      }}
                    >
                      <div class="card-body">
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
                              Bharath Maduguru
                            </small>
                            <small
                              className="d-block mb-2"
                              style={{ fontWeight: "400", lineHeight: "1rem" }}
                            >
                              PH-2, H.No 123 Thirumala Nilayam TNGOs Colony ,
                              Gachibowli, Hyderabad HYDERABAD, TELANGANA 500032
                              India
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
                              9951094032
                            </small>
                          </address>
                        </div>
                      </div>
                    </div>
                    <div
                      class="card ordersSecCard"
                      style={{
                        width: "18rem",
                        border: "1px solid #E3E3E3",
                        backgroundColor: "transparent",
                      }}
                    >
                      <div class="card-body">
                        <span
                          className="card-subtitle mb-2"
                          style={{ fontWeight: "600" }}
                        >
                          Delivered 11 Feb, 2024
                        </span>
                        <div className="paymentDetails">
                          <div className="d-flex align-items-md-start">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/sparkelImg.png`}
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
                                Sparkel Glow - Anti Oxidant Face Sheet Mask
                              </span>
                              <small style={{ color: "#858585" }}>
                                Pack of 3
                              </small>
                              <button
                                className="d-block orderedProductBtn"
                                style={{}}
                              >
                                Reorder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="card ordersSecCard"
                      style={{
                        width: "18rem",
                        border: "1px solid #E3E3E3",
                        backgroundColor: "transparent",
                      }}
                    >
                      <div class="card-body">
                        <span
                          className="card-subtitle mb-2"
                          style={{ fontWeight: "600" }}
                        >
                          Payment Summary
                        </span>
                        <div className="paymentDetails">
                          <div className="d-flex justify-content-between">
                            <small
                              className="card-subtitle d-block"
                              style={{
                                fontWeight: "400",
                                lineHeight: "1.2rem",
                              }}
                            >
                              Item (01 Products)
                            </small>
                            <small style={{ fontWeight: "400" }}>
                              Rs.382.00
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
                              Shipping Chareges
                            </small>
                            <small style={{ fontWeight: "400" }}>Rs.0.00</small>
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
                            <small style={{ fontWeight: "400" }}>Rs.0.00</small>
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
                              Rs.382.00
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
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
                      steps >= 1 ? "circle activeCircle" : "circle"
                    }`}
                    dataTitle1="Order Confirmed"
                    dataTitle2="8 Feb, 2024"
                  >
                    <TiTick
                      fill={`${steps >= 1 ? "#fff" : "#D5D5D5"}`}
                      style={{ fontSize: "26px" }}
                    />
                  </div>
                  <div
                    className={`${
                      steps >= 2 ? "circle activeCircle" : "circle"
                    }`}
                    dataTitle1="Shipped"
                    dataTitle2="9 Feb, 2024"
                  >
                    <TiTick
                      fill={`${steps >= 2 ? "#fff" : "#D5D5D5"}`}
                      style={{ fontSize: "26px" }}
                    />
                  </div>
                  <div
                    className={`${
                      steps >= 3 ? "circle activeCircle" : "circle"
                    }`}
                    dataTitle1="Out for Delivery"
                    dataTitle2="10 Feb, 2024"
                  >
                    <TiTick
                      fill={`${steps >= 3 ? "#fff" : "#D5D5D5"}`}
                      style={{ fontSize: "26px" }}
                    />
                  </div>
                  <div
                    className={`${
                      steps === 4 ? "circle activeCircle" : "circle"
                    }`}
                    dataTitle1="Delivered"
                    dataTitle2="Expected Delivery
                     by 11 Feb, 2024"
                  >
                    <TiTick
                      fill={`${steps === 4 ? "#fff" : "#D5D5D5"}`}
                      style={{ fontSize: "26px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
