import React, { useState } from "react";
import AddressForm from "./AddressForm";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "../UserProfile/SideBar";
import { useNavigate } from "react-router-dom";
import swalErr from "../../Components/ErrorHandler";

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
            <AddressForm
              inputValues={inputValues}
              setInputValue={setInputValue}
            />
            <input
              type="button"
              value="Submit"
              className="commonBtn"
              onClick={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
