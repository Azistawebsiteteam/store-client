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

const EditProfile = () => {
  const [errors, setErrors] = useState({});
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    mobileNum: "",
    email: "",
    houseNumber: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    landmark: "",
    acceeptEmailMarketing: true,
    company: "Home",
    address1: "",
    address2: "",
    marketingSmsAccept: true,
    dob: "",
    gender: "Male",
  });
  const [states, setStates] = useState([]);

  const Navigate = useNavigate();

  const { userDetails, setUserDetails } = useContext(searchResultContext);

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const changeDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setProfileDetails({
      firstName: userDetails.azst_customer_fname,
      lastName: userDetails.azst_customer_lname,
      mobileNum: userDetails.azst_customer_mobile,
      email: userDetails.azst_customer_email,
      houseNumber: userDetails.azst_customer_hno || "",
      district: userDetails.azst_customer_district,
      state: userDetails.azst_customer_state,
      country: userDetails.azst_customer_country,
      zipCode: userDetails.azst_customer_zip,
      landmark: userDetails.azst_customer_landmark,
      acceeptEmailMarketing:
        userDetails.azst_customer_acceptemail_marketing === "0" ? false : true,
      company: userDetails.azst_customer_company || "Home",
      address1: userDetails.azst_customer_address1,
      address2: userDetails.azst_customer_address2 || "",
      marketingSmsAccept:
        userDetails.azst_customer_acceptsms_marketing === "0" ? false : true,
      dob: userDetails.azst_customer_dob
        ? changeDateFormat(userDetails.azst_customer_dob)
        : "",
      gender: userDetails.azst_customer_gender || "Male",
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
    if (!profileDetails.firstName) {
      validationErrorMessage["firstName"] = "First name is required";
    }
    if (!profileDetails.lastName) {
      validationErrorMessage.lastName = "Last name is required";
    }
    if (!profileDetails.mobileNum) {
      validationErrorMessage.mobileNum = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(profileDetails.mobileNum)) {
      validationErrorMessage.mobileNum = "Invalid mobile number";
    }
    if (!profileDetails.email) {
      validationErrorMessage.email = "Email is required";
    }
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
    if (!profileDetails.dob) {
      validationErrorMessage.dob = "Date of birth is required";
    }
    if (!profileDetails.gender) {
      validationErrorMessage.gender = "Gender is required";
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
      const url = `${baseUrl}/profile/update`;
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
    if (id === "mobileNum" || id === "zipCode") {
      value = value.replace(/[^0-9]/g, "");
    }
    setProfileDetails({ ...profileDetails, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const onChangeDefault = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.id]: e.target.checked });
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
              <div className="form-floating mb-3 col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.firstName}
                  className="form-control"
                  id="firstName"
                  style={
                    errors.firstName ? { border: "1px solid #f14848" } : {}
                  }
                  onChange={handleInputValue}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
                <label htmlFor="firstName" className="ms-1">
                  First name
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.lastName}
                  className="form-control"
                  id="lastName"
                  style={errors.lastName ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
                <label htmlFor="lastName" className="ms-1">
                  Last name
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <input
                  autoComplete="off"
                  type="date"
                  value={profileDetails.dob}
                  className="form-control"
                  id="dob"
                  style={errors.dob ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  placeholder="DOB"
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
                <label htmlFor="dob" className="ms-1">
                  DOB
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.gender}
                  id="gender"
                  style={errors.gender ? { border: "1px solid #f14848" } : {}}
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                  placeholder="Gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {errors.gender && (
                  <span className="error">{errors.gender}</span>
                )}
                <label htmlFor="gender" className="ms-1">
                  Gender
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  autoComplete="off"
                  type="text"
                  value={profileDetails.mobileNum}
                  className="form-control"
                  id="mobileNum"
                  style={
                    errors.mobileNum ? { border: "1px solid #f14848" } : {}
                  }
                  maxLength={10}
                  onChange={handleInputValue}
                  placeholder="Contact Number"
                />
                {errors.mobileNum && (
                  <span className="error">{errors.mobileNum}</span>
                )}
                <label htmlFor="mobileNum" className="ms-1">
                  Contact number
                </label>
              </div>
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
                  type="email"
                  value={profileDetails.email}
                  className="form-control"
                  id="email"
                  style={errors.email ? { border: "1px solid #f14848" } : {}}
                  placeholder="Email"
                  onChange={handleInputValue}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor="email" className="ms-1">
                  Email address
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
                  <option value="home">Home (All Day Delivery)</option>
                  <option value="office">Office (9 AM - 5 PM)</option>
                </select>
                {errors.company && (
                  <span className="error">{errors.company}</span>
                )}
                <label htmlFor="addressType" className="ms-1">
                  Address Type
                </label>
              </div>
              <div className="row mt-3">
                <div className="form-check col-md-6">
                  <input
                    autoComplete="off"
                    className="form-check-input"
                    type="checkbox"
                    id="acceeptEmailMarketing"
                    checked={profileDetails.acceeptEmailMarketing}
                    onChange={onChangeDefault}
                  />
                  {errors.acceeptEmailMarketing && (
                    <span className="error">
                      {errors.acceeptEmailMarketing}
                    </span>
                  )}
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Email me with news and offers
                  </label>
                </div>
                <div className="form-check col-md-6">
                  <input
                    autoComplete="off"
                    className="form-check-input"
                    type="checkbox"
                    id="marketingSmsAccept"
                    checked={profileDetails.marketingSmsAccept}
                    onChange={onChangeDefault}
                  />
                  {errors.marketingSmsAccept && (
                    <span className="error">{errors.marketingSmsAccept}</span>
                  )}
                  <label
                    className="form-check-label"
                    htmlFor="marketingSmsAccept"
                  >
                    SMS me with news and offers
                  </label>
                </div>
              </div>
              <div>
                <input className="commonBtn" type="submit" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
