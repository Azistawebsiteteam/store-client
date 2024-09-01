import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const OrderSummary = () => {
  return (
    <div className="summaryCardSec d-flex justify-content-center align-items-center">
      <div className="summaryCard">
        <div className="holder">
          <span className="strip"></span>
        </div>
        <div className="orderSummaryCont">
          <img
            src={`${process.env.PUBLIC_URL}/images/orderSummaryCard.png`}
            className="orderSummaryCard"
            alt="orderSummaryCard"
          />
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
              Your order will be processed with in 24 hours during working days.
              we will notify you by email once your order has been shipped.
            </small>
            <hr className="dashedLine" />
            <h6 className="mb-0">Order Summary</h6>
            <hr className="contLine" />
            <div className="orderSummaryInfo">
              <div className="">
                <small className="orderSummaryTxt">Date</small>
                <p className="orderSummaryTxtVal">02 Feb, 2024</p>
              </div>
              <div className="">
                <small className="orderSummaryTxt">Order Id</small>
                <p className="orderSummaryTxtVal mb-0">040-12313424</p>
              </div>
              <div className="">
                <small className="orderSummaryTxt">Payment Method</small>
                <p className="orderSummaryTxtVal mb-0">Credit Card</p>
              </div>
            </div>
            <hr className="contLine" />
            <div className="orderSummaryInfo">
              <div className="">
                <p
                  className="orderSummaryTxtVal mb-0"
                  style={{ fontWeight: "400" }}
                >
                  Item (01 Products)
                </p>
                <p
                  className="orderSummaryTxtVal mb-0"
                  style={{ fontWeight: "400" }}
                >
                  Shipping Charges
                </p>
              </div>
              <div className="">
                <p className="orderSummaryTxtVal mb-0">Rs.382.00</p>
                <p className="orderSummaryTxtVal mb-0">Free</p>
              </div>
            </div>
            <hr className="dashedLine" />
            <div className="orderSummaryInfo">
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
                Rs.382.00
              </p>
            </div>
            <div className="d-flex flex-column align-items-center mt-1">
              <Link
                className="orderSummaryBtn linkBtn"
                to="/order-details#track-order"
              >
                Track Order
              </Link>
              <Link className="linkBtn" to="/">
                <small className="orderSummaryTxt" style={{ color: "#008060" }}>
                  Continue Shopping
                </small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
