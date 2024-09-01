import React from "react";
import ScrollToTop from "../../Utils/ScrollToTop";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bottomSec">
        <div className="container">
          <div className="aboutUsPage d-flex flex-column align-items-center">
            <p className="text-center" style={{ color: "#717171" }}>
              About Us
            </p>
            <h3 className="text-center aboutUsText">
              Discover Our Story: <br />
              Who We Are What We Do
            </h3>
            <img
              src={`${process.env.PUBLIC_URL}/images/aboutUsImg.png`}
              alt="aboutUs"
              className="aboutUsImg"
            />
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </p>
            <div className="row">
              <div className="col-md-6">
                <h4>Lorem Ipsum available</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src={`${process.env.PUBLIC_URL}/images/aboutUsSubImg.png`}
                  alt="AboutUs"
                  className="aboutUsSubImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
