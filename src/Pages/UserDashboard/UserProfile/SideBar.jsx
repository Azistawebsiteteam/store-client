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
  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          text: "Logout Successfull",
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
    <ul className="nav nav-tabs d-flex flex-column">
      <li className="nav-item">
        <Link
          to="/profile-management"
          className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/manage-orders"
          className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => handleTabClick("orders")}
        >
          Orders
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/manage-address"
          className={`nav-link ${activeTab === "addresses" ? "active" : ""}`}
          onClick={() => handleTabClick("addresses")}
        >
          Addresses
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/password-manager"
          className={`nav-link ${
            activeTab === "updatePassword" ? "active" : ""
          }`}
          onClick={() => handleTabClick("updatePassword")}
        >
          Password Manager
        </Link>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "logout" ? "active" : ""}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default SideBar;
