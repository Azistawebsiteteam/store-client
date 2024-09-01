import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import AddressCard from "./AddressCard";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "../UserProfile/SideBar";
import { Link } from "react-router-dom";
import swalErr from "../../Components/ErrorHandler";
import "./UserAddress.css";

const ManageAddress = () => {
  const [addressList, setAddressList] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);

  useEffect(() => {
    const getAddressBook = async () => {
      try {
        const URL = `${baseUrl}/address/myaddresses`;
        const headers = {
          Authorization: `Bearer ${jwtToken} `,
        };
        swalErr.onLoading();
        const response = await axios.post(URL, {}, { headers });

        if (response.status === 200) {
          setAddressList(response.data);
        }
        swalErr.onLoadingClose();
      } catch (error) {
        console.log(error);
        swalErr.onLoadingClose();
        swalErr.onError(error);
      }
    };
    getAddressBook();
  }, [baseUrl, jwtToken]);

  const addAddress = () => {
    return (
      <>
        <AddressCard addressList={addressList} />
      </>
    );
  };

  return (
    <div className="userProfileSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec">
          <div className="d-flex flex-column flex-md-row justify-content-md-between">
            <h5>Delivery Address Book</h5>
            <Link
              to="/new-address"
              className="linkBtn"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#008060",
              }}
            >
              <FaPlus fill="green" />
              Add New Address
            </Link>
          </div>
          <div className="addressCont">{addAddress()}</div>
        </div>
      </div>
    </div>
  );
};

export default ManageAddress;
