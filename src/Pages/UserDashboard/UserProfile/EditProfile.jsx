import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import "./UserProfile.css";
import SwalHandle from "../../Components/ErrorHandler";
import BackBtn from "../../Components/BackBtn";

const EditProfile = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const Navigate = useNavigate();
  const changeDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };
  const [profileDetails, setProfileDetails] = useState({
    firstName: userDetails.azst_customer_fname,
    lastName: userDetails.azst_customer_lname,
    mobileNum: userDetails.azst_customer_mobile,
    email: userDetails.azst_customer_email,
    houseNumber: userDetails.azst_customer_hno || "",
    district: userDetails.azst_customer_district,
    state: userDetails.azst_customer_city,
    country: userDetails.azst_customer_country,
    zipCode: userDetails.azst_customer_zip,
    landmark: userDetails.azst_customer_landmark,
    acceeptEmailMarketing:
      userDetails.azst_customer_acceptemail_marketing === "0" ? false : true,
    company: userDetails.azst_customer_company,
    address1: userDetails.azst_customer_address1,
    address2: userDetails.azst_customer_address2 || "",
    marketingSmsAccept:
      userDetails.azst_customer_acceptsms_marketing === "0" ? false : true,
    dob: changeDateFormat(userDetails.azst_customer_dob),
    gender: userDetails.azst_customer_gender,
  });
  const [states, setStates] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
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
        // setUserDetails(response.data);
        Navigate("/profile-management");
      }
    } catch (error) {
      SwalHandle.onLoadingClose();
      SwalHandle.onError(error);
    }
  };

  const handleInputValue = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.id]: e.target.value });
  };
  const onChangeDefault = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.id]: e.target.checked });
  };

  return (
    <div className="userProfileSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec">
          <div className="d-flex align-items-center">
            <BackBtn className="me-3" />
            <h4>Profile Details</h4>
          </div>
          <div className="myAccInnerSec">
            <form className="row g-3" onSubmit={handleProfileUpdate}>
              <div className="form-floating mb-3 col-md-6">
                <input
                  type="text"
                  value={profileDetails.firstName}
                  className="form-control"
                  id="firstName"
                  onChange={handleInputValue}
                  placeholder="First Name"
                />
                <label htmlFor="firstName" className="ms-1">
                  First name
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <input
                  type="text"
                  value={profileDetails.lastName}
                  className="form-control"
                  id="lastName"
                  onChange={handleInputValue}
                  placeholder="Last Name"
                />
                <label htmlFor="lastName" className="ms-1">
                  Last name
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <input
                  type="date"
                  value={profileDetails.dob}
                  className="form-control"
                  id="dob"
                  onChange={handleInputValue}
                  placeholder="DOB"
                />
                <label htmlFor="dob" className="ms-1">
                  DOB
                </label>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.gender}
                  id="gender"
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                  placeholder="Gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <label htmlFor="gender" className="ms-1">
                  Gender
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  value={profileDetails.mobileNum}
                  className="form-control"
                  id="mobileNum"
                  onChange={handleInputValue}
                  placeholder="Contact Number"
                />
                <label htmlFor="mobileNum" className="ms-1">
                  Contact number
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  value={profileDetails.houseNumber}
                  className="form-control"
                  id="houseNumber"
                  onChange={handleInputValue}
                  placeholder="House Number"
                />
                <label htmlFor="houseNumber" className="ms-1">
                  House Number
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  value={profileDetails.zipCode}
                  className="form-control"
                  id="zipCode"
                  onChange={handleInputValue}
                  placeholder="Pincode"
                />
                <label htmlFor="zipCode" className="ms-1">
                  Pincode
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="email"
                  value={profileDetails.email}
                  className="form-control"
                  id="email"
                  onChange={handleInputValue}
                />
                <label htmlFor="email" className="ms-1">
                  Email address (optional)
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  value={profileDetails.district}
                  className="form-control"
                  id="district"
                  onChange={handleInputValue}
                />
                <label htmlFor="district" className="ms-1">
                  District
                </label>
              </div>
              <div className="form-floating col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.state}
                  id="state"
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                >
                  <option selected>Select the state</option>
                  {states.map((each, i) => (
                    <option key={i} value={each.state_code}>
                      {each.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="state" className="ms-1">
                  State
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  value={profileDetails.country}
                  className="form-control"
                  id="country"
                  onChange={handleInputValue}
                />
                <label htmlFor="country" className="ms-1">
                  Country
                </label>
              </div>
              <div className="form-floating col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Landmark"
                  value={profileDetails.landmark}
                  id="landmark"
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
                  value={profileDetails.address1}
                  onChange={handleInputValue}
                ></textarea>
                <label htmlFor="address1">Primary Address</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Secondary Address"
                  id="address2"
                  value={profileDetails.address2}
                  onChange={handleInputValue}
                ></textarea>
                <label htmlFor="address2">Secondary Address</label>
              </div>
              <div className="form-floating col-md-6">
                <select
                  className="form-select"
                  value={profileDetails.company}
                  id="company"
                  onChange={handleInputValue}
                  aria-label="Floating label select example"
                >
                  <option value="home" selected>
                    Home (All Day Delivery)
                  </option>
                  <option value="office">Office (9 AM - 5 PM)</option>
                </select>
                <label htmlFor="addressType" className="ms-1">
                  Address Type
                </label>
              </div>
              <div className="row mt-3">
                <div className="form-check col-md-6">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceeptEmailMarketing"
                    checked={profileDetails.acceeptEmailMarketing}
                    onChange={onChangeDefault}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Email me with news and offers
                  </label>
                </div>
                <div className="form-check col-md-6">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="marketingSmsAccept"
                    checked={profileDetails.marketingSmsAccept}
                    onChange={onChangeDefault}
                  />
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
