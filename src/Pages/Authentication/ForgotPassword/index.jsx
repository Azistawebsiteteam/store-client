import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Authentication.css";
import "./index.css";

const ForgotPassword = () => {
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState({
    mailOrMobile: "",
    onSubmit: false,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [timer, setTimer] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;
  const token_key = process.env.REACT_APP_JWT_TOKEN;
  const navigate = useNavigate();

  const onSubmitOtpSuccess = (jwtToken) => {
    Cookies.set(token_key, jwtToken);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/forgot-password`;
      const response = await axios.post(url, {
        mailOrMobile: inputValues.mailOrMobile,
      });
      setInputValues({ ...inputValues, onSubmit: true });
      if (response.status === 200) {
        onSubmitSuccess();
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/forgot-password/verifyotp`;
      const body = {
        mailOrMobile: inputValues.mailOrMobile,
        otp: inputValues.otp,
        newPassword: inputValues.newPassword,
      };
      const response = await axios.post(url, body);
      onSubmitOtpSuccess(response.data.jwtToken);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleUserInput = (e) => {
    setInputValues({ ...inputValues, [e.target.id]: e.target.value });
    setError("");
  };

  return (
    <div className="userLoginSection">
      {!display && (
        <div className="userLoginPage resetPasswordSec">
          <h1 className="heading">Reset Password</h1>
          <div className="loginnote">
            Enter the email address or mobile phone number associated with your
            Azista Store account.
          </div>

          <form onSubmit={handleForgotPassword}>
            <div className="form-group mt-3">
              <label className="labelText mb-1" htmlFor="mailOrMobile">
                Email or Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mailOrMobile"
                value={inputValues.mailOrMobile}
                onChange={handleUserInput}
              />
              {!inputValues.onSubmit && <span className="error">{error}</span>}
              {!inputValues.onSubmit && (
                <input
                  type="submit"
                  value="Sign In"
                  className="authenticationBtn primaryAuthenticationBtn"
                />
              )}
              {inputValues.onSubmit && (
                <>
                  <div className="form-group">
                    <label htmlFor="otp">Enter otp</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={inputValues.otp}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      disabled={timer !== 0}
                      className={timer !== 0 ? "disabled" : "resendOtp"}
                      onClick={handleForgotPassword}
                    >
                      Request Otp?
                    </button>

                    {timer !== 0 && <small>{timeFormat()}</small>}
                  </div>
                </>
              )}
              {inputValues.onSubmit && (
                <button
                  value="Proceed"
                  onClick={() => setDisplay(!display)}
                  className="authenticationBtn primaryAuthenticationBtn"
                  disabled={inputValues.otp.length < 6}
                >
                  Proceed
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      {display && (
        <div className="userLoginPage resetPasswordSec">
          <form onSubmit={handleVerifyOtp}>
            <h1 className="heading">Create New Password</h1>
            <div className="form-group passwordField">
              <div className="form-group">
                <label className="labelText" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  className="form-control"
                  type="text"
                  autoComplete="off"
                  id="newPassword"
                  value={inputValues.newPassword}
                  onChange={handleUserInput}
                />
              </div>
              <div className="form-group mt-2">
                <label className="labelText" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="confirmPassword"
                  value={inputValues.confirmPassword}
                  onChange={handleUserInput}
                />
              </div>
              <span className="text-danger d-block">{error}</span>
              {inputValues.confirmPassword !== inputValues.newPassword && (
                <span className="text-danger d-block">
                  Password Didn't Match
                </span>
              )}
            </div>
            <input
              className="authenticationBtn primaryAuthenticationBtn"
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
