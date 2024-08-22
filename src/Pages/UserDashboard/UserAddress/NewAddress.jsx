import React, { useState } from "react";
import AddressForm from "./AddressForm";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "../UserProfile/SideBar";
import { useNavigate } from "react-router-dom";
import swalErr from "../../Components/ErrorHandler";
import { FaArrowLeft } from "react-icons/fa6";

const NewAddress = ({ updateFormFilledStatus }) => {
  const [inputValues, setInputValue] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerMobileNum: "",
    customerEmail: "",
    housenumber: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    landmark: "",
    homeOrCompany: "Home",
    address1: "",
    address2: "",
    isDefault: false,
    availableFromTime: "",
    availableToTime: "",
  });
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const url = `${baseUrl}/address/add/newaddress`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };
      const avalableTime = `${inputValues.availableFromTime}-${inputValues.availableToTime} `;
      delete inputValues.availableFromTime;
      delete inputValues.availableToTime;
      console.log(inputValues, "inputValues");

      swalErr.onLoading();
      const response = await axios.post(
        url,
        { ...inputValues, avalableTime },
        { headers }
      );
      if (response.status === 201) {
        navigate("/manage-address");
      }
      swalErr.onLoadingClose();
      swalErr.onSuccess();
    } catch (error) {
      console.log(error);
      swalErr.onLoadingClose();
      swalErr.onError(error);
    }
  };
  return (
    <div className="UserAddressSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccUserAdd">
          <div className="myAccUserInnerSec">
            <div style={{ margin: "0 0 2% 0" }}>
              <FaArrowLeft
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              />
              <h5 style={{ marginBottom: "0" }}>Delivery Address</h5>
              <small>
                Delivery Address Book &gt;{" "}
                <strong style={{ fontWeight: "500" }}>Create Address</strong>
              </small>
            </div>
            <AddressForm
              inputValues={inputValues}
              setInputValue={setInputValue}
            />
            <input
              type="button"
              value="Submit"
              className="commonBtn mt-3"
              onClick={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
