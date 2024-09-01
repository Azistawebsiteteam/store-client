import React from "react";
import { Link } from "react-router-dom";
import "./Customer.css";

const Copyright = () => {
  const imageUrl = process.env.PUBLIC_URL;
  return (
    <div className="copyright_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-5 copyright_sec_info">
            <Link className="linkBtn" to="/shipping-policy">
              <small>Shipping</small>
            </Link>
            <span className="itemDivider"></span>
            <Link className="linkBtn" to="/terms-and-conditions">
              <small>Terms & Conditions</small>
            </Link>
            <span className="itemDivider"></span>
            <Link className="linkBtn" to="/returns-and-refunds">
              <small>Returns & Refunds</small>
            </Link>
            <span className="itemDivider"></span>
            <Link className="linkBtn" to="/safety-and-security">
              <small>Safety & Security</small>
            </Link>
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
            <small className="copyrightTxt">
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
