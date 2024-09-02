import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import "../Authentication.css";
import GoogleSignIn from "../GoogleSignIn";

const OtpLogin = () => {
  const [userInput, setUserInput] = useState({
    enterNumber: "",
    enterOtp: "",
    userEntered: false,
  });
  const [timer, setTimer] = useState();
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwt_token = process.env.REACT_APP_JWT_TOKEN;
  const navigate = useNavigate();

  const onSubmitOtpSuccess = (jwtToken) => {
    Cookies.set(jwt_token, jwtToken);
    navigate("/", { replace: true });
  };

  const timeFormat = () => {
    let divisor_for_minutes = timer % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  let counter = 120;
  let intervalID;

  const countdown = () => {
    counter -= 1;
    setTimer(counter);

    if (counter === 0) {
      clearInterval(intervalID);
    }
  };

  const onSubmitSuccess = () => {
    intervalID = setInterval(countdown, 1000);
  };

  const submitNumber = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/login/otp`;
      const response = await axios.post(url, {
        mailOrMobile: userInput.enterNumber,
      });
      setUserInput({ ...userInput, userEntered: true });
      if (response.status === 200) {
        onSubmitSuccess();
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/login/verify-otp`;
      const body = {
        mailOrMobile: userInput.enterNumber,
        otp: userInput.enterOtp,
      };
      const response = await axios.post(url, body);
      onSubmitOtpSuccess(response.data.jwtToken);
    } catch (error) {
      setError2(error.response.data.message);
    }
  };

  const handleInputValue = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
    setError("");
  };

  return (
    <div className="userLoginSection">
      <div className="userLoginPage">
        <h1 className="heading">Sign In</h1>
        <div className="googleBtn">
          <GoogleSignIn className="social_icon" />
        </div>
        <div className="seperator">
          <hr />
          <span className="spanText">Or</span>
        </div>
        <form onSubmit={submitNumber}>
          <div className="form-group">
            <label className="labelText" htmlFor="enterNumber">
              Email or Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="enterNumber"
              value={userInput.enterNumber}
              onChange={handleInputValue}
            />
            {error ? <span className="error">{error}</span> : ""}
            {!userInput.userEntered && (
              <input
                type="submit"
                value="Sign In"
                className="signinBtn submitBtn mt-3"
              />
            )}
          </div>
        </form>
        {userInput.userEntered && (
          <form onSubmit={onSubmitOtp}>
            <div className="form-group passwordField">
              <div className="d-flex justify-content-between align-items-center">
                <label className="labelText" htmlFor="enterOtp">
                  OTP
                </label>
                <small>
                  <Link
                    to="/login"
                    className="linkBtn"
                    style={{ color: "#008060" }}
                  >
                    Sign in with Password
                  </Link>
                </small>
              </div>
              <input
                className="form-control"
                type="text"
                autoComplete="off"
                id="enterOtp"
                value={userInput.enterOtp}
                onChange={handleInputValue}
              />
              <div className="d-flex justify-content-between">
                <button
                  disabled={timer !== 0}
                  className={timer !== 0 ? "disabled" : "resendOtp"}
                  onClick={submitNumber}
                >
                  Request Otp?
                </button>

                {timer !== 0 && <small>{timeFormat()}</small>}
              </div>
              {error2 ? <span className="error">{error2}</span> : ""}
            </div>
            <span className="text-danger d-block">{error}</span>
            <input
              className="signinBtn submitBtn mt-3"
              type="submit"
              value="Sign In"
            />
          </form>
        )}
        <hr />
        <p className="text-center" style={{ color: "#858585" }}>
          New to Azista Store
        </p>
        <Link className="signinBtn secBtn linkBtn" to="/registration">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default OtpLogin;
