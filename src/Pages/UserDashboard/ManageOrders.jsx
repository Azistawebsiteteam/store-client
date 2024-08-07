import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SideBar from "./UserProfile/SideBar";
import axios from "axios";
import moment from "moment";
import "./index.css";

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
          {orderDetails.map((order, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
