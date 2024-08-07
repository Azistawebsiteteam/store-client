import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./UserProfile.css";
import swalHandle from "../../Components/ErrorHandler";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

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
        setTimeout(() => {
          navigate("/login");
          Cookies.remove(token);
        }, 2000);
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

  return (
    <div className="sideBar">
      <h4>My Account</h4>
      <ul className="custNav nav d-flex flex-column">
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "profile" ? "profileActive.svg" : "profile.svg"
            }`}
            alt="profile"
          />
          <Link
            to="/profile-management"
            className={`nav-link ${activeTab === "profile" ? "activeBar" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("profile", "/profile-management");
            }}
          >
            Profile
          </Link>
        </li>
        <li className="nav-item">
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
        </li>
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "orders" ? "orders.svg" : "orders.svg"
            }`}
            alt="orders"
          />
          <Link
            to="/manage-orders"
            className={`nav-link ${activeTab === "orders" ? "activeBar" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("orders", "/manage-orders");
            }}
          >
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "wishlist" ? "wishlistActive.svg" : "wishlist.svg"
            }`}
            alt="wishlist"
          />
          <Link
            to="/wishlist"
            className={`nav-link ${
              activeTab === "wishlist" ? "activeBar" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("wishlist", "/wishlist");
            }}
          >
            Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "reviewsAndRatings"
                ? "reviewsActive.svg"
                : "reviews.svg"
            }`}
            alt="reviews"
          />
          <Link
            to="/reviews-ratings"
            className={`nav-link ${
              activeTab === "reviewsAndRatings" ? "activeBar" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("reviewsAndRatings", "/reviews-ratings");
            }}
          >
            Reviews & Ratings
          </Link>
        </li>
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "addresses" ? "locationActive.svg" : "location.svg"
            }`}
            alt="addresses"
          />
          <Link
            to="/manage-address"
            className={`nav-link ${
              activeTab === "addresses" ? "activeBar" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("addresses", "/manage-address");
            }}
          >
            Delivery Address Book
          </Link>
        </li>
        <li className="nav-item">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              activeTab === "logout" ? "rewardsActive.svg" : "rewards.svg"
            }`}
            alt="logout"
          />
          <button
            className={`nav-link ${activeTab === "logout" ? "activeBar" : ""}`}
            onClick={handleLogout}
          >
            Loyalty Rewards
          </button>
        </li>
        <li className="nav-item">
          <Link
            to="/password-manager"
            className={`nav-link ${
              activeTab === "updatePassword" ? "activeBar" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("updatePassword", "/password-manager");
            }}
          >
            Password Manager
          </Link>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "logout" ? "activeBar" : ""}`}
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
