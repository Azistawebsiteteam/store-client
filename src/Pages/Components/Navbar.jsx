import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchResultContext } from "../../ReactContext/SearchResults";
import Cookies from "js-cookie";
import Announcement from "./Announcement";
import SocialIcons from "./SocialIcons";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { RxCross2 } from "react-icons/rx";
import "./Customer.css";
import Swal from "sweetalert2";
import ErrorHandler from "./ErrorHandler";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const { cartTotal, cartCount, setCartList } = useContext(searchResultContext);
  const [isSticky, setIsSticky] = useState(false);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const headerTop = document.querySelector(".stickyHeader").offsetTop;
      if (window.scrollY > headerTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchBar = (boolean) => {
    setShowSearchBar(boolean);
  };

  const handleCart = (boolean) => {
    setShowCart(boolean);
  };

  const handleSideNavbar = () => {
    setShowSideNavbar(!showSideNavbar);
  };

  const logoutUser = async () => {
    try {
      const url = `${baseUrl}/auth/logout`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      ErrorHandler.onLoading();
      const response = await axios.post(url, {}, { headers });

      if (response.status === 200) {
        ErrorHandler.onLoadingClose();
        Swal.fire({
          title: "Visit Again!",
          text: "Logout Successful",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/login");
          Cookies.remove(token);
        }, 2000);
      }
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const handleLogout = async () => {
    if (jwtToken) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          logoutUser();
          handleSideNavbar();
        }
      });
    } else {
      navigate("/login");
      setCartList([]);
      setShowSideNavbar(!showSideNavbar);
    }
  };

  return (
    <>
      <header className="headerSec">
        <SearchBar
          handleSearchBar={handleSearchBar}
          showSearchBar={showSearchBar}
        />
        <Cart handleCart={handleCart} showCart={showCart} />
        <div className="freeShippingBar">
          <div className="socialIconsCont d-none d-md-block">
            <SocialIcons width={1.3} />
          </div>
          <div className="content">
            {cartTotal > parseInt(150) ? (
              <span
                style={{ fontSize: "0.9rem", color: "#fff", fontWeight: "300" }}
              >
                You are eligible for free shipping
              </span>
            ) : (
              <span
                style={{ fontSize: "0.9rem", color: "#fff", fontWeight: "300" }}
              >
                Free shipping for orders over Rs. 150.00!
              </span>
            )}
          </div>
          <div
            className="chatbotCont d-none d-md-block"
            style={{ cursor: "pointer" }}
          >
            <small>
              Help or Support
              <img
                src={`${process.env.PUBLIC_URL}/images/customer-service.svg`}
                className="ms-1 social_icon"
                alt="email"
              />
            </small>
          </div>
        </div>
        <section className={`stickyHeader ${isSticky ? "fixed" : ""}`}>
          <Announcement />
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            id="navbar"
          >
            <div className="container">
              <div className="navbarInnerSection">
                <div className="navIcon d-none d-md-block">
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
                  onClick={handleSideNavbar}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className={` ${
                    showSideNavbar ? "show-navbar" : "hide-navbar"
                  }`}
                  id="navbarSupportedContent"
                >
                  <div className="navBarClose d-md-none">
                    <span style={{ fontWeight: "700" }}>Menu</span>
                    <RxCross2
                      onClick={() => {
                        setShowSideNavbar(!showSideNavbar);
                      }}
                    />
                  </div>
                  <ul className="navbar-nav m-auto mb-lg-0">
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                        onClick={handleSideNavbar}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/about-us"
                        onClick={handleSideNavbar}
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/#categories"
                        onClick={handleSideNavbar}
                      >
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
                        <MdOutlineKeyboardArrowDown size={20} />
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to="Action"
                            onClick={handleSideNavbar}
                          >
                            Action
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="Action"
                            onClick={handleSideNavbar}
                          >
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="Action"
                            onClick={handleSideNavbar}
                          >
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="combos"
                        onClick={handleSideNavbar}
                      >
                        Combos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/#shop99"
                        onClick={handleSideNavbar}
                      >
                        Shop @99
                      </Link>
                    </li>
                    {jwtToken && (
                      <li className="nav-item dropdown d-md-none">
                        <a
                          className="nav-link dropdown-toggle"
                          href="shobby"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          My Account{" "}
                          <MdOutlineKeyboardArrowDown
                            style={{ marginTop: "-3px" }}
                            size={20}
                          />
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu2"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/profile-management"
                              onClick={handleSideNavbar}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/manage-orders"
                              onClick={handleSideNavbar}
                            >
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/wishlist"
                              onClick={handleSideNavbar}
                            >
                              WishList
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/reviews-ratings"
                              onClick={handleSideNavbar}
                            >
                              Reviews & Ratings
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/manage-address"
                              onClick={handleSideNavbar}
                            >
                              Delivery Address Book
                            </Link>
                          </li>
                        </ul>
                      </li>
                    )}
                    <li className="nav-item d-md-none">
                      <button className="nav-link" onClick={handleLogout}>
                        {jwtToken ? "Logout" : "Login"}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="navIcon text-center d-md-none">
                  <Link className="navbar-brand m-auto mr-md-auto" to="/">
                    <img
                      className="navlogo"
                      src={`${process.env.PUBLIC_URL}/images/logo1.svg`}
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="rightSec">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSearchBar(true)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/search.svg`}
                      alt="searchIcon"
                      className="social_icon"
                    />
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      display: "inline-block",
                    }}
                    onClick={() => handleCart(true)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/shopping-cart.svg`}
                      alt="cartIcon"
                      className="cartIcon"
                    />
                    {cartCount > 0 && (
                      <span className="cartCountCont">{cartCount}</span>
                    )}
                  </span>
                  <span>
                    <Link
                      className="d-none d-md-block"
                      style={{ cursor: "pointer" }}
                      to={"/profile-management"}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/user.svg`}
                        alt="userIcon"
                        className="social_icon"
                      />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </section>
      </header>
    </>
  );
};

export default Navbar;
