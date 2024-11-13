import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "./UserProfile.css";
import SwalHandle from "../../Components/ErrorHandler";
import BackBtn from "../../Components/BackBtn";
import { getProfileDetails } from "./GetUseDetails";
import { searchResultContext } from "../../../ReactContext/SearchResults";

const UpdateBillingAddress = () => {
  const [errors, setErrors] = useState({});
  const [profileDetails, setProfileDetails] = useState({
    houseNumber: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    landmark: "",
    company: "",
    address1: "",
    address2: "",
  });
  const [states, setStates] = useState([]);

  const Navigate = useNavigate();

  const { userDetails, setUserDetails } = useContext(searchResultContext);
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    setProfileDetails({
      houseNumber: userDetails.azst_customer_hno || "",
      district: userDetails.azst_customer_district,
      state: userDetails.azst_customer_state,
      country: userDetails.azst_customer_country,
      zipCode: userDetails.azst_customer_zip,
      landmark: userDetails.azst_customer_landmark,
      company: userDetails.azst_customer_company || "Home",
      address1: userDetails.azst_customer_address1,
      address2: userDetails.azst_customer_address2 || "",
    });
  }, [userDetails]);

  useEffect(() => {
    const stateApi = async () => {
      try {
        const statesUrl =
          "https://countriesnow.space/api/v0.1/countries/states";
        const response = await axios.post(statesUrl, { country: "India" });
        setStates(response.data.data.states);
      } catch (error) {}
    };
    stateApi();
  }, []);

  const handleValidationError = (profileDetails) => {
    const validationErrorMessage = {};
    if (!profileDetails.houseNumber) {
      validationErrorMessage.houseNumber = "House number is required";
    }
    if (!profileDetails.district) {
      validationErrorMessage.district = "District is required";
    }
    if (!profileDetails.state) {
      validationErrorMessage.state = "State is required";
    }
    if (!profileDetails.country) {
      validationErrorMessage.country = "Country is required";
    }
    if (!profileDetails.zipCode) {
      validationErrorMessage.zipCode = "Zip code is required";
    } else if (profileDetails.zipCode && profileDetails.zipCode.length < 6) {
      validationErrorMessage.zipCode = "Invalid zip code";
    }
    if (!profileDetails.address1) {
      validationErrorMessage.address1 = "Address is required";
    }
    return validationErrorMessage;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const validationErrorMessage = handleValidationError(profileDetails);
    if (Object.keys(validationErrorMessage).length > 0) {
      window.scrollTo(0, 0);
      setErrors(validationErrorMessage);
      return;
    }
    try {
      const url = `${baseUrl}/profile/update/billing-address`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      SwalHandle.onLoading();
      const response = await axios.post(url, profileDetails, { headers });
      if (response.status === 200) {
        SwalHandle.onLoadingClose();
        SwalHandle.onSuccess(response.data.message);
        getProfileDetails(jwtToken, setUserDetails);
        Navigate("/profile-management");
      }
    } catch (error) {
      SwalHandle.onLoadingClose();
      SwalHandle.onError(error);
    }
  };

  const handleInputValue = (e) => {
    let { id, value } = e.target;
    if (id === "zipCode") {
      value = value.replace(/[^0-9]/g, "");
    }
    setProfileDetails({ ...profileDetails, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  return (
    <div className="userProfileSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec">
          <div className="mb-4">
            <BackBtn className="me-3" />
            <h5 className="mb-0">Billing Address</h5>
            <small style={{ color: "#747474", fontWeight: "600" }}>
              Profile &lt; Billing Address
            </small>
          </div>
          <div className="myAccInnerSec">
            <form
              autoComplete="off"
              className="row g-3"
              onSubmit={handleProfileUpdate}
            >
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.houseNumber}
                  className="form-control"
                  id="houseNumber"
                  style={
                    errors.houseNumber ? { border: "1px solid #f14848" } : {}
                  }
                  onChange={handleInputValue}
                  placeholder="House Number"
                />
                {errors.houseNumber && (
                  <span className="error">{errors.houseNumber}</span>
                )}
                <label htmlFor="houseNumber" className="ms-1">
                  House Number
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.zipCode}
                  className="form-control"
                  id="zipCode"
                  style={errors.zipCode ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  placeholder="Pincode"
                  maxLength={6}
                />
                {errors.zipCode && (
                  <span className="error">{errors.zipCode}</span>
                )}
                <label htmlFor="zipCode" className="ms-1">
                  Pincode
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.district}
                  className="form-control"
                  id="district"
                  style={errors.district ? { border: "1px solid #f14848" } : {}}
                  placeholder="District"
                  onChange={handleInputValue}
                />
                {errors.district && (
                  <span className="error">{errors.district}</span>
                )}
                <label htmlFor="district" className="ms-1">
                  District
                </label>
              </div>
              <div className="form-floating col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.state}
                  id="state"
                  style={errors.state ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                >
                  <option>Select the state</option>
                  {states.map((each, i) => (
                    <option key={i} value={each.name}>
                      {each.name}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="error">{errors.state}</span>}
                <label htmlFor="state" className="ms-1">
                  State
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.country}
                  className="form-control"
                  id="country"
                  style={errors.country ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  placeholder="Country"
                />
                {errors.country && (
                  <span className="error">{errors.country}</span>
                )}
                <label htmlFor="country" className="ms-1">
                  Country
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Landmark"
                  value={profileDetails.landmark}
                  id="landmark"
                  style={errors.landmark ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                />
                <label htmlFor="Landmark" className="ms-1">
                  Landmark (optional)
                </label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Primary Address"
                  id="address1"
                  style={errors.address1 ? { border: "1px solid #f14848" } : {}}
                  value={profileDetails.address1}
                  onChange={handleInputValue}
                ></textarea>
                {errors.address1 && (
                  <span className="error">{errors.address1}</span>
                )}
                <label htmlFor="address1">Primary Address</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Secondary Address"
                  id="address2"
                  style={errors.address2 ? { border: "1px solid #f14848" } : {}}
                  value={profileDetails.address2}
                  onChange={handleInputValue}
                ></textarea>
                {errors.address2 && (
                  <span className="error">{errors.address2}</span>
                )}
                <label htmlFor="address2">Secondary Address</label>
              </div>
              <div className="form-floating col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.company}
                  id="company"
                  style={errors.company ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                </select>
                {errors.company && (
                  <span className="error">{errors.company}</span>
                )}
                <label htmlFor="addressType" className="ms-1">
                  Address Type
                </label>
              </div>
              <div>
                <input className="myAccSecBtn" type="submit" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBillingAddress;
