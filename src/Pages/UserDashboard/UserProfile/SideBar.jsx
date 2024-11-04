import React, { useContext } from "react";
import { useNavigate, Link, useResolvedPath } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./UserProfile.css";
import swalHandle from "../../Components/ErrorHandler";
import { CiLogout } from "react-icons/ci";
import { cartItems } from "../../Cart/Functions";
import { searchResultContext } from "../../../ReactContext/SearchResults";

const SideBar = () => {
  const { pathname } = useResolvedPath();

  const {
    setCartCount,
    setCartList,
    setCartTotal,
    setDiscountAmount,
    setDiscountCodes,
    setSimilarProducts,
    setUserDetails,
  } = useContext(searchResultContext);

  const baseUrl = process.env.REACT_APP_API_URL;
  const tokenKey = process.env.REACT_APP_JWT_TOKEN;
  console.log(tokenKey);
  const jwtToken = Cookies.get(tokenKey);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const url = `${baseUrl}/auth/logout`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      const response = await axios.post(url, {}, { headers });

      if (response.status === 200) {
        swalHandle.onLoadingClose();
        Swal.fire({
          title: "Visit Again!",
          text: "Logout Successful",
          icon: "success",
          timer: 2000,
        });
        setUserDetails({});
        Cookies.remove(tokenKey);
        cartItems(0).then((data) => {
          if (data) {
            const {
              cart_products,
              cart_total,
              discountAmount,
              discountCodes,
              similarProducts,
            } = data;
            setCartList(cart_products);
            setCartCount(cart_products.length);
            setCartTotal(cart_total);
            setDiscountAmount(discountAmount);
            setDiscountCodes(discountCodes);
            setSimilarProducts(similarProducts);
          }
        });
        navigate("/login");
      }
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };

  const handleLogout = async () => {
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
      }
    });
  };

  const isActiveTab = (path) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="sideBar">
      <h4>My Account</h4>
      <ul className="custNav nav d-flex flex-column">
        <li className="nav-item sideNavItem">
          <img
            className="sidenav-img"
            src={`${process.env.PUBLIC_URL}/images/${
              isActiveTab("/profile-management")
                ? "profileActive.svg"
                : "profile.svg"
            }`}
            alt="profile"
          />
          <Link
            to="/profile-management"
            className={`nav-link sideNavlink ${
              isActiveTab("/profile-management") ? "activeBar" : ""
            }`}
            style={{ marginTop: "0" }}
          >
            Profile
          </Link>
        </li>
        {/* <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "wallet" ? "walletActive.svg" : "wallet.svg"
            }`}
            alt="wallet"
          />
          <Link
            to="/manage-orders"
            className={`nav-link ${activeTab === "wallet" ? "activeBar" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("wallet", "/manage-orders");
            }}
          >
            Wallet
          </Link>
        </li> */}
        <li className="nav-item sideNavItem">
          <img
            className="sidenav-img"
            src={`${process.env.PUBLIC_URL}/images/${
              isActiveTab("/manage-orders") ? "ordersActive.svg" : "orders.svg"
            }`}
            alt="orders"
            style={{ marginTop: "0" }}
          />
          <Link
            to="/manage-orders"
            className={`nav-link sideNavlink ${
              isActiveTab("/manage-orders") ? "activeBar" : ""
            }`}
            style={{ marginTop: "0" }}
          >
            Orders
          </Link>
        </li>
        <li className="nav-item sideNavItem">
          <img
            className="sidenav-img"
            src={`${process.env.PUBLIC_URL}/images/${
              isActiveTab("/wishlist") ? "wishlistActive.svg" : "wishlist.svg"
            }`}
            alt="wishlist"
            style={{ marginTop: "0" }}
          />
          <Link
            to="/wishlist"
            className={`nav-link sideNavlink ${
              isActiveTab("/wishlist") ? "activeBar" : ""
            }`}
            style={{ marginTop: "0" }}
          >
            Wishlist
          </Link>
        </li>
        <li className="nav-item sideNavItem">
          <img
            className="sidenav-img"
            src={`${process.env.PUBLIC_URL}/images/${
              isActiveTab("/reviews-ratings")
                ? "reviewsActive.svg"
                : "reviews.svg"
            }`}
            alt="reviews"
          />
          <Link
            to="/reviews-ratings"
            className={`nav-link sideNavlink ${
              isActiveTab("/reviews-ratings") ? "activeBar" : ""
            }`}
            style={{ marginTop: "0" }}
          >
            Reviews & Ratings
          </Link>
        </li>
        <li className="nav-item sideNavItem">
          <img
            className="sidenav-img"
            src={`${process.env.PUBLIC_URL}/images/${
              isActiveTab("/manage-address")
                ? "locationActive.svg"
                : "location.svg"
            }`}
            alt="addresses"
          />
          <Link
            to="/manage-address"
            className={`nav-link sideNavlink ${
              isActiveTab("/manage-address") ? "activeBar" : ""
            }`}
            style={{ marginTop: "0" }}
          >
            Delivery Address Book
          </Link>
        </li>
        <li className="nav-item sideNavItem d-flex align-items-center">
          <CiLogout style={{ fontSize: "17px" }} />
          <button
            className="nav-link sideNavlink"
            style={{ marginTop: "0" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
