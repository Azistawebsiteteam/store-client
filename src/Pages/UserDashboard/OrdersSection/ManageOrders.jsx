import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SideBar from "../UserProfile/SideBar";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DropdownComponent from "../../Components/DropdownComponent";
import "../index.css";

const ManageOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    const getOrderDetails = async () => {
      const url = `${baseUrl}/orders/customer/all`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      setOrderDetails(response.data);
    };
    getOrderDetails();
  }, [baseUrl, token]);

  console.log(orderDetails);
  return (
    <div className="userProfileSec">
      <div className="d-flex">
        <SideBar />
        <div className="ordersCont">
          <h5>Orders</h5>
          <div
            className="d-flex justify-content-md-between align-items-center"
            style={{ borderBottom: "1px solid #D6D6D6", paddingBottom: "1%" }}
          >
            <div className="">
              <small>View by</small>
              <DropdownComponent />
            </div>
            <div style={{ position: "relative", borderRadius: "4px" }}>
              <input
                type="search"
                placeholder="Search your orders here"
                className="orderPgSearchBox"
                style={{
                  width: "100%",
                  padding: "6px 40px 6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  outline: "transparent",
                }}
              />
              <div
                className="orderPgSearchIcon"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                }}
              >
                <IoSearchOutline size={20} />
              </div>
            </div>
          </div>
          <div className="orderDetails">
            <div className="orderDetailsTopSec d-flex justify-content-md-between">
              <div className="detailHeading">
                <span className="d-block" style={{ color: "#858585" }}>
                  Order Placed on
                </span>
                <span>02 Feb, 2024</span>
              </div>
              <div className="detailHeading">
                <span className="d-block" style={{ color: "#858585" }}>
                  Status
                </span>
                <span>Out for Delivery</span>
              </div>
              <div className="detailHeading">
                <span className="d-block" style={{ color: "#858585" }}>
                  Order ID
                </span>
                <span>040-12313424</span>
              </div>
              <div className="detailHeading">
                <span className="d-block" style={{ color: "#858585" }}>
                  Order Value
                </span>
                <span>Rs.282.00</span>
              </div>
            </div>
            <div className="orderDetailsBotSec d-flex justify-content-md-between align-items-md-center">
              <div className="d-flex align-items-md-center">
                <img
                  src={`${process.env.PUBLIC_URL}/images/sparkelImg.png`}
                  alt="orderImage"
                  className="orderedProductImg"
                />
                <div className="ms-2 orderedProductInfo">
                  <span className="d-block">
                    Sparkel Glow - Anti Oxidant Face Sheet Mask
                  </span>
                  <span style={{ color: "#858585" }}>Pack of 3</span>
                </div>
              </div>
              <div className="d-flex flex-column orderedProductBtns">
                <Link to="/order-details" className="orderedProductBtn">
                  Order Details
                </Link>
                <Link className="orderedProductBtn">Write a Review</Link>
                <button className="orderedProductBtn">Reorder</button>
                <button className="orderedProductBtn">Return or Replace</button>
              </div>
            </div>
          </div>
          {/* {orderDetails.map((order, i) => (
            <div className="mt-3 mb-3 order" key={i}>
              <div className="d-md-flex justify-content-md-between">
                <span>
                  <strong>Order#{order.azst_order_id.toUpperCase()}</strong>
                </span>
                <span>
                  {moment(order.azst_orders_created_on).format(
                    "D MMMM YYYY [at] h:mm a"
                  )}
                </span>
              </div>
              <div className="d-flex">
                {order.products_details.map((item, i) => (
                  <div key={i} className="d-flex flex-column m-2">
                    <img
                      src={item.product_image}
                      className="orderImg"
                      alt="orderImage"
                    />
                    <small>
                      {item.product_title}
                      {item.option1 ? item.option1 : ""}
                    </small>
                    <small>{item.azst_product_price}</small>
                  </div>
                ))}
              </div>
              <div className="">
                <h5>Addresses</h5>
                <hr />
                <div className="">
                  <h6>Shipping address</h6>
                  <span>
                    {order.shipping_address.address_lname}{" "}
                    {order.shipping_address.address_fname},
                  </span>
                  <span>{order.shipping_address.address_address1},</span>
                  <span>{order.shipping_address.address_mobile},</span>
                  <span>
                    {order.shipping_address.address_city}{" "}
                    {order.shipping_address.address_zip}
                  </span>
                  <span>{order.shipping_address.address_country}</span>
                </div>
                <hr />
                <div className="">
                  <h6>Billing address</h6>
                  <span>
                    {order.billing_address.address_lname}{" "}
                    {order.shipping_address.address_fname},
                  </span>
                  <span>{order.billing_address.azst_customer_address1},</span>
                  <span>{order.billing_address.address_mobile},</span>
                  <span>
                    {order.billing_address.azst_customer_city}{" "}
                    {order.billing_address.azst_customer_zip}
                  </span>
                  <span>{order.billing_address.azst_customer_country}</span>
                </div>
                <div className="">
                  <h6>Total summary</h6>
                  <div className="d-flex justify-content-between">
                    <span>Sub total</span>
                    <span>{order.azst_orders_subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total discount</span>
                    <span>0</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tax price</span>
                    <span>{order.azst_orders_taxes}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping price</span>
                    <span>0</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Grand Total</span>
                    <span>{order.azst_orders_total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
