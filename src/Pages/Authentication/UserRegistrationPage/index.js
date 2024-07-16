import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import GoogleSignIn from "../GoogleSignIn";

const UserRegistrationPage = () => {
  const [inputValues, setInputValues] = useState({
    customerFullName: "",
    customerMailOrMobileNum: "",
    requestOtp: false,
    otp: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleOnChangeInput = (e) => {
    setInputValues({ ...inputValues, [e.target.id]: e.target.value });
    setError("");
  };

  const handleRequestOtp = async (e) => {
    try {
      e.preventDefault();
      const url = `${baseUrl}/auth/register/otp`;
      const body = {
        customerName: inputValues.customerFullName,
        mailOrMobile: inputValues.customerMailOrMobileNum,
      };
      const response = await axios.post(url, body);
      setInputValues({ ...inputValues, requestOtp: true });
      console.log(response);
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  const verifyAndContinue = async () => {
    try {
      const url = `${baseUrl}/auth/register/verify-otp`;
      const response = await axios.post(url, {
        mailOrMobile: inputValues.customerMailOrMobileNum,
        otp: inputValues.otp,
      });
      if (response.status === 200) {
        navigate("/create-password", { state: { userData: inputValues } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(inputValues, "input");
  return (
    <div className="userLoginSection">
      <div className="userLoginPage">
        <h1 className="heading">Sign Up</h1>
        <div className="googleBtn">
          <GoogleSignIn
            className="social_icon"
            btnTxt={"Sign up with Google"}
            type={"Signup"}
          />
        </div>
        <div className="seperator">
          <hr />
          <span className="spanText">Or</span>
        </div>
        <form onSubmit={handleRequestOtp}>
          <div className="form-group">
            <div className="d-flex">
              <label className="labelText" htmlFor="customerFullName">
                Full Name
              </label>
            </div>
            <input
              className="form-control"
              type="text"
              autoComplete="off"
              id="customerFullName"
              value={inputValues.customerFullName}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="form-group">
            <label className="labelText" htmlFor="customerMailOrMobileNum">
              Email or Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="customerMailOrMobileNum"
              value={inputValues.customerMailOrMobileNum}
              onChange={handleOnChangeInput}
            />
          </div>
          {error && <span>{error}</span>}
          {!inputValues.requestOtp && (
            <input
              className="signinBtn submitBtn mt-3"
              type="submit"
              value="Request OTP"
            />
          )}
        </form>
        {inputValues.requestOtp && (
          <div>
            <div className="form-group">
              <label className="labelText" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={inputValues.otp}
                onChange={handleOnChangeInput}
              />
            </div>
            <input
              className="signinBtn submitBtn mt-2"
              type="button"
              onClick={verifyAndContinue}
              value="Verify and Continue"
            />
          </div>
        )}
        <hr />
        <p className="text-center" style={{ color: "#858585" }}>
          Already have an account?
        </p>
        <Link className="signinBtn secBtn linkBtn" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
