import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Customer.css";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const footerContent = [
  {
    id: uuidv4,
    title: "Shop",
    text: [
      { link: "Categories", text: "Categories" },
      { link: "Brands", text: "Brands" },
      { link: "Combos", text: "Combos" },
      { link: "Shop99", text: "Shop@99" },
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
      { link: "Contact", text: "Contact Us" },
    ],
  },
];

const moreFromUs = [
  {
    id: 1,
    title: "More from Us",
    text: [
      { link: "Ambassador", text: "Become an Ambassador" },
      { link: "Corporate", text: "Corporate Gifting" },
      { link: "Loyalty", text: "Loyalty Program" },
      { link: "Influencer", text: "Influencer Program" },
    ],
  },
];

const Footer = () => {
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
            <div className="col-md-3 d-none d-md-block" key={i}>
              <h4 className="footerHeading">{eachObj.title}</h4>
              <div className="d-flex flex-column">
                {eachObj.text.map((eachTxt, i) => (
                  <a key={i} href={eachTxt.link} className="footerAnchorEl">
                    {eachTxt.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="col-md-1 verticalLine"></div>
          <div className="col-md-4">
            <h4 className="footerEmailText">
              Stay in the loop with our weekly newsletter
            </h4>
            <form className="subscribeBtnCont">
              <input
                type="email"
                className="subscribeField"
                placeholder="Enter Your Email Address"
              />
              <button type="submit" className="subscribeBtn">
                <IoArrowForwardCircleSharp
                  style={{
                    fontSize: "3rem",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="supportSec">
          <div className="row">
            <div className="col-md-8 supportSecInfo">
              <small style={{ color: "rgb(255, 255, 255)" }}>
                Support or Help
              </small>
              <p style={{ color: "#fff", marginTop: "0.2rem" }}>
                <img
                  src={`${imageUrl}/images/email.svg`}
                  className="social_icon"
                  alt="email"
                />
                <a
                  style={{ color: "#fff", textDecoration: "none" }}
                  href="mailto:ecommerce@azistaindustries.com"
                >
                  ecommerce@azistaindustries.com
                </a>
              </p>
              <p style={{ color: "#fff" }}>
                <img
                  src={`${imageUrl}/images/phone.svg`}
                  className="social_icon"
                  alt="phone"
                />
                <a
                  style={{ color: "#fff", textDecoration: "none" }}
                  href="tel:1800 102 0576"
                >
                  1800 102 0576
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
