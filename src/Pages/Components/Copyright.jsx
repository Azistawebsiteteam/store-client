import React from "react";
import "./Customer.css";

const Copyright = () => {
  const imageUrl = process.env.PUBLIC_URL;
  return (
    <div className="copyright_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <small>Shipping</small>
            <span className="itemDivider"></span>
            <small>Terms & Conditions</small>
            <span className="itemDivider"></span>
            <small>Returns & Refunds</small>
            <span className="itemDivider"></span>
            <small>Safety & Security</small>
          </div>
          <div className="col-md-4">
            <div className="paymentOpt">
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/express1.png`}
                alt="express1"
              />
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/visa.png`}
                alt="visa"
              />
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/express2.png`}
                alt="express2"
              />
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/rupay.png`}
                alt="rupay"
              />
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/americanExpr.png`}
                alt="americanExpr"
              />
              <img
                className="paymenytIcon"
                src={`${imageUrl}/images/upi.png`}
                alt="upi"
              />
            </div>
          </div>
          <div className="col-md-3">
            <small>
              © 
              {new Date().getFullYear()}
              <a
                href="https://www.azistaindustries.com/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Azista Industries Private Limited.
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
