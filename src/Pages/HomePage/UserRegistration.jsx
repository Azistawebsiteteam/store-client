import React from "react";
import { useContext, useEffect, useState } from "react";
import swalHandle from "../Components/ErrorHandler";
import Cookies from "js-cookie";
import { getProfileDetails } from "../UserDashboard/UserProfile/GetUseDetails";
import { searchResultContext } from "../../ReactContext/SearchResults";
import "../Components/Components.css";
import axios from "axios";

const UserRegistrationPopup = () => {
  const [custDetails, setCustDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });
  const [showForm, setShowForm] = useState(false);

  const { userDetails, setUserDetails } = useContext(searchResultContext);

  //   const baseUrl = process.env.REACT_APP_API_URL;
  // const localUrl = process.env.REACT_APP_LOCAL_URL;
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setUserDetails]);

  useEffect(() => {
    const callbackFun = () => {
      if (jwtToken && userDetails.azst_customer_fname === null) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    };
    callbackFun();
  }, [userDetails.azst_customer_fname, jwtToken]);

  const handleCustDetails = (e) => {
    setCustDetails({ ...custDetails, [e.target.id]: e.target.value });
  };

  const submitUserForm = async () => {
    if (
      custDetails.firstName === "" &&
      custDetails.lastName === "" &&
      custDetails.gender === "" &&
      custDetails.password === ""
    ) {
      alert("Fill the form to proceed");
    }
    try {
      const url = `${baseUrl}/auth/details/otp-register`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(url, custDetails, { headers });
      swalHandle.onLoadingClose();
      swalHandle.onSuccess("Welcome");
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };
  return (
    <>
      {showForm && (
        <div className="UserRegistrationPopup">
          <div className="registrationFormPopup">
            <h6>Fill in your Details to proceed</h6>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  onChange={handleCustDetails}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={handleCustDetails}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  value={custDetails.gender}
                  id="gender"
                  onChange={handleCustDetails}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleCustDetails}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleCustDetails}
                />
              </div>
              <div className="form-group col-md-2">
                <button
                  onClick={submitUserForm}
                  className="productPgBtn mt-2"
                  style={{ width: "max-content", padding: "0.2rem 1rem" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRegistrationPopup;
