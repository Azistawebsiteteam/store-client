import React from "react";
import "./index.css";

const OrderSummary = () => {
  return (
    <div className="bottomSec d-flex justify-content-center align-items-center">
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
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
