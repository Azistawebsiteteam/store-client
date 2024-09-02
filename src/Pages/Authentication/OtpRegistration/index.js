import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "../Authentication.css";

const OtpRegistration = () => {
  const [inputValue, setInputValue] = useState({
    enterNumber: "",
    enterOtp: "",
    numberEntered: true,
  });

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const navigate = useNavigate();

  const onSubmitOtpSuccess = (jwtToken) => {
    const token = process.env.REACT_APP_JWT_TOKEN;
    Cookies.set(token, jwtToken);

    navigate("/", { replace: true });
  };

  const baseUrl = process.env.REACT_APP_API_URL;
  const onSubmitNumber = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/register/otp`;
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(url, {
        mailOrMobile: inputValue.enterNumber,
      });
      setInputValue({ ...inputValue, numberEntered: false });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/register/verify-otp`;
      const response = await axios.post(url, {
        mailOrMobile: inputValue.enterNumber,
        otp: inputValue.enterOtp,
      });
      onSubmitOtpSuccess(response.data.jwtToken);
    } catch (error) {
      setError2(error.response.data.message);
    }
  };

  const handleInputEvent = (e) => {
    setInputValue({ ...inputValue, [e.target.id]: e.target.value });
    setError("");
  };

  const enterMobileNumber = () => {
    return (
      <>
        <form className="form-group" onSubmit={onSubmitNumber}>
          <label htmlFor="enterNumber">Enter mobile number</label>
          <input
            className="form-control"
            placeholder="Mail/Phone"
            type="text"
            value={inputValue.enterNumber}
            onChange={handleInputEvent}
            id="enterNumber"
          />
          {error ? <span className="error">{error}</span> : ""}
          {inputValue.numberEntered && <input type="submit" />}
        </form>
      </>
    );
  };

  const enterOtp = () => {
    return (
      <form onSubmit={onSubmitOtp}>
        <div>
          <label htmlFor="enterOtp">Enter Your OTP</label>
          <input
            className="form-control"
            type="text"
            value={inputValue.enterOtp}
            onChange={handleInputEvent}
            id="enterOtp"
          />
          <span className="error">{error2}</span>
        </div>
        <input type="submit" />
      </form>
    );
  };

  return (
    <div className="adminLoginPage">
      <h3 className="mb-1">SignUp</h3>
      <div>{enterMobileNumber()}</div>
      {!inputValue.numberEntered && <div>{enterOtp()}</div>}
    </div>
  );
};

export default OtpRegistration;
