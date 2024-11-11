import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Customer.css";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import ErrorHandler from "./ErrorHandler";

const footerContent = [
  {
    id: uuidv4,
    title: "Shop",
    text: [
      { link: "#categories", text: "Categories" },
      { link: "#brands", text: "Brands" },
      { link: "Combos", text: "Combos" },
      { link: "#shop99", text: "Shop@99" },
    ],
  },
  {
    id: uuidv4,
    title: "Company",
    text: [
      { link: "about-us", text: "About Us" },
      { link: "blogs", text: "Blog" },
      { link: "faqs", text: "FAQ's" },
      { link: "Careers", text: "Careers" },
      { link: "contact-us", text: "Contact Us" },
    ],
  },
];

const moreFromUs = [
  {
    id: 1,
    title: "More from Us",
    text: [
      { link: "#", text: "Become an Ambassador" },
      { link: "#", text: "Corporate Gifting" },
      { link: "#", text: "Loyalty Program" },
      { link: "#", text: "Influencer Program" },
    ],
  },
];

const Footer = () => {
  const [newsletterSubscription, setNewsletterSubscription] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterSubscription === "") {
      setError("Please enter your email to subscribe.");
      return;
    }
    try {
      const url = `${baseUrl}/auth/newsletter/subscribe`;
      const response = await axios.post(url, {
        email: newsletterSubscription,
        token,
      });
      ErrorHandler.onLoading();
      if (response.status === 200) {
        setNewsletterMsg("You're now subscribed to our newsletter!");
        setError("");
      }
      ErrorHandler.onLoadingClose();
    } catch (error) {
      setError("");
      ErrorHandler.onLoadingClose();
      const message = error.response
        ? error.response.data.message
        : error.message;
      setNewsletterMsg(message);
    }
  };
  const handleNewsletterEmail = (e) => {
    setNewsletterSubscription(e.target.value);
    if (e.target.value === "") {
      setNewsletterMsg("");
    }
  };

  const imageUrl = process.env.PUBLIC_URL;
  return (
    <div className="footerSec">
      <div className="bottomStrip"></div>
      <div className="container">
        <div className="row">
          {footerContent.map((eachObj, i) => (
            <div className="col-md-2 d-none d-md-block" key={i}>
              <h4 className="footerHeading">{eachObj.title}</h4>
              <div className="d-flex flex-column">
                {eachObj.text.map((eachTxt, i) => (
                  <Link
                    key={i}
                    to={`/${eachTxt.link}`}
                    className="footerAnchorEl"
                  >
                    {eachTxt.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {moreFromUs.map((eachObj, i) => (
            <div className="col-md-2 d-none d-md-block" key={i}>
              <h4 className="footerHeading">{eachObj.title}</h4>
              <div className="d-flex flex-column">
                {eachObj.text.map((eachTxt, i) => (
                  <span key={i} className="footerAnchorEl">
                    {eachTxt.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="col-md-1" style={{ width: "5%" }}>
            <div className="verticalLine"></div>
          </div>
          <div className="col-md-5">
            <h4 className="footerEmailText">
              Stay in the loop with our weekly newsletter
            </h4>
            <form className="subscribeBtnCont">
              <input
                value={newsletterSubscription}
                type="email"
                className="subscribeField"
                placeholder="Enter Your Email Address"
                onChange={handleNewsletterEmail}
                autoComplete="false"
              />
              <button
                type="submit"
                className="subscribeBtn"
                onClick={handleNewsletterSubmit}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/subscribeBtn.svg`}
                  alt="subscribeBtn"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    width: "54px",
                    padding: "4px",
                  }}
                />
                {/* <IoArrowForwardCircleSharp
                  style={{
                    fontSize: "3rem",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                /> */}
              </button>
            </form>
            <small className="text-light text-capitalize">
              {error ? error : newsletterMsg}
            </small>
          </div>
        </div>
        <div className="supportSec">
          <div className="row">
            <div className="col-md-7 supportSecInfo">
              <small
                style={{
                  color: "rgb(255, 255, 255)",
                  fontSize: "1rem",
                  fontWeight: "200",
                }}
              >
                Support or Help
              </small>
              <p
                style={{ color: "#fff", marginTop: "0.1rem" }}
                className="supportSecCont"
              >
                <img
                  src={`${imageUrl}/images/email.svg`}
                  className="supportSecIcon"
                  alt="email"
                />
                <a
                  className="supportDetails"
                  href="mailto:ecommerce@azistaindustries.com"
                >
                  ecommerce@azistaindustries.com
                </a>
              </p>
              <p style={{ color: "#fff" }} className="supportSecCont">
                <img
                  src={`${imageUrl}/images/phone.svg`}
                  className="supportSecIcon"
                  alt="phone"
                />
                <a className="supportDetails" href="tel:1800 102 0576">
                  1800 102 0576
                </a>
              </p>
            </div>
            <div className="col-md-5">
              <SocialIcons width={1.4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
