import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import axios from "axios";
import moment from "moment";
import ErrorHandler from "../Components/ErrorHandler";

const OrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState({});
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
  const location = useLocation();
  const { orderId } = location.state ?? {};

  useEffect(() => {
    const getOrderSummary = async () => {
      try {
        const url = `${baseUrl}/orders/customer/order-summary`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        ErrorHandler.onLoading();
        const response = await axios.post(url, { orderId }, { headers });
        ErrorHandler.onLoadingClose();
        setOrderSummary(response.data);
      } catch (error) {
        ErrorHandler.onLoadingClose();
        ErrorHandler.onError(error);
      }
    };
    getOrderSummary();
  }, [baseUrl, token, orderId]);

  return (
    <>
      {Object.keys(orderSummary).length > 0 ? (
        <div className="summaryCardSec d-flex justify-content-center align-items-center">
          <div className="summaryCard">
            <div className="holder">
              <span className="strip"></span>
            </div>
            <div className="orderSummaryCont">
              <div className="orderSummaryInfoCard">
                <img
                  src={`${process.env.PUBLIC_URL}/images/success.gif`}
                  alt="success"
                />
                <h5 className="text-center summarycardTxt">
                  Thank you,
                  <br /> Your Order has been placed
                </h5>
                <small className="orderSummaryTxt text-center">
                  Your order will be processed with in 24 hours during working
                  days. we will notify you by email once your order has been
                  shipped.
                </small>
                <hr className="dashedLine" />
                <h6 className="mb-0">Order Summary</h6>
                <hr className="contLine" />
                <div className="orderSummaryInfo">
                  <div className="">
                    <small className="orderSummaryTxt">Date</small>
                    <p className="orderSummaryTxtVal">
                      {moment(orderSummary.azst_orders_created_on).format(
                        "DD MMM,YYYY"
                      )}
                    </p>
                  </div>
                  <div className="">
                    <small className="orderSummaryTxt">Order Id</small>
                    <p className="orderSummaryTxtVal mb-0">
                      {orderSummary.azst_order_id}
                    </p>
                  </div>
                  <div className="">
                    <small className="orderSummaryTxt">Payment Method</small>
                    <p className="orderSummaryTxtVal mb-0">
                      {orderSummary.azst_orders_payment_method}
                    </p>
                  </div>
                </div>
                <hr className="contLine" />
                <div className="orderSummaryProductInfo">
                  {orderSummary.products_details.map((each, i) => (
                    <div
                      className="d-flex justify-content-between"
                      key={each.azst_order_product_id}
                    >
                      <p
                        className="orderSummaryTxtVal mb-0"
                        style={{ fontWeight: "400" }}
                      >
                        {each.product_title}{" "}
                        {`(${each.azst_order_qty}x ${each.azst_product_price})`}
                      </p>
                      <p className="orderSummaryTxtVal mb-0">
                        Rs.{each.azst_order_qty * each.azst_product_price}
                      </p>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between">
                    <p
                      className="orderSummaryTxtVal mb-0"
                      style={{ fontWeight: "400" }}
                    >
                      Shipping Charges
                    </p>
                    <p className="orderSummaryTxtVal mb-0">
                      Rs.{orderSummary.azst_orderinfo_shpping_amount}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p
                      className="orderSummaryTxtVal mb-0"
                      style={{ fontWeight: "400" }}
                    >
                      Taxes
                    </p>
                    <p className="orderSummaryTxtVal mb-0">
                      Rs.{orderSummary.azst_orders_taxes}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p
                      className="orderSummaryTxtVal mb-0"
                      style={{ fontWeight: "400" }}
                    >
                      Discounts
                    </p>
                    <p className="orderSummaryTxtVal mb-0">
                      Rs.{orderSummary.azst_orders_discount_amount}
                    </p>
                  </div>
                </div>
                <hr className="dashedLine" />
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  <p
                    className="mb-0"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Grand Total
                  </p>
                  <p
                    className="mb-0"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Rs.{orderSummary.azst_orders_total}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-center mt-1">
                  <Link
                    className="orderSummaryBtn linkBtn"
                    to={`/order-details/${orderSummary.azst_order_id}`}
                  >
                    Track Order
                  </Link>
                  <Link className="linkBtn" to="/">
                    <small
                      className="orderSummaryTxt"
                      style={{ color: "#008060" }}
                    >
                      Continue Shopping
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Not Found</div>
      )}
    </>
  );
};

export default OrderSummary;
