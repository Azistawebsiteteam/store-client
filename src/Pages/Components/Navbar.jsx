import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { searchResultContext } from "../../ReactContext/SearchResults";
import Announcement from "./Announcement";
import SocialIcons from "./SocialIcons";
import SearchBar from "./SearchBar";
import "./Customer.css";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { cartTotal } = useContext(searchResultContext);

  const handleSearchBar = (boolean) => {
    console.log(boolean, "boolean");
    setShowSearchBar(boolean);
  };
  console.log(showSearchBar);

  return (
    <>
      <header className="headerSec">
        {showSearchBar && <SearchBar handleSearchBar={handleSearchBar} />}
        <div className="freeShippingBar">
          <div className="socialIconsCont">
            <SocialIcons />
          </div>
          <div className="content">
            {cartTotal > parseInt(150) ? (
              <small>You are eligible for free shipping</small>
            ) : (
              <small>Free shipping for orders over Rs. 150.00!</small>
            )}
          </div>
          <div className="chatbotCont">
            <small>
              Help or Support
              <img
                src={`${process.env.PUBLIC_URL}/images/customer-service.svg`}
                className="social_icon"
                alt="email"
              />
            </small>
          </div>
        </div>
        <Announcement />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbarInnerSection">
              <div className="navIcon">
                <Link className="navbar-brand m-auto mr-md-auto" to="/">
                  <img
                    className="navlogo"
                    src={`${process.env.PUBLIC_URL}/images/logo1.svg`}
                    alt="img"
                  />
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav m-auto mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="shobby"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop by
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="Action">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Action">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Action">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="combos">
                      Combos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="shop99">
                      Shop @99
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="rightSec">
                <span onClick={() => handleSearchBar(true)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/search.svg`}
                    alt="searchIcon"
                    className="social_icon"
                  />
                </span>
                <Link to={"sfs"}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/shopping-cart.svg`}
                    alt="cartIcon"
                    className="cartIcon"
                  />
                </Link>
                <Link to={"/profile-management"}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/user.svg`}
                    alt="userIcon"
                    className="social_icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
