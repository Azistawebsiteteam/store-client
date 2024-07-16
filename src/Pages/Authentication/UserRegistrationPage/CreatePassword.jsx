import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const CreatePassword = () => {
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_URL;
  const tokenKey = process.env.REACT_APP_JWT_TOKEN;
  const { userData } = location.state || {};
  console.log(location.state, "location");

  const onSubmitSuccess = (token) => {
    console.log(token, "apiSuccess");
    Cookies.set(tokenKey, token);
    navigate("/");
  };

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      const url = `${baseUrl}/auth/register/details`;
      const body = {
        customerName: userData.customerFullName,
        mailOrMobile: userData.customerMailOrMobileNum,
        password: passwordInput.password,
      };
      console.log(body);
      const response = await axios.post(url, body);
      if (response.status === 201) {
        onSubmitSuccess(response.data.jwtToken);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handlePassword = (e) => {
    setPasswordInput({ ...passwordInput, [e.target.id]: e.target.value });
  };

  return (
    <div className="userLoginSection">
      <div className="userLoginPage">
        <form onSubmit={handleVerifyOtp}>
          <h1 className="heading">Create New Password</h1>
          <div className="form-group passwordField">
            <div className="form-group">
              <label className="labelText" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="text"
                autoComplete="off"
                id="password"
                value={passwordInput.newPassword}
                onChange={handlePassword}
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
                value={passwordInput.confirmPassword}
                onChange={handlePassword}
              />
            </div>
            <span className="text-danger d-block">{error}</span>
            {passwordInput.confirmPassword !== passwordInput.password && (
              <span className="text-danger d-block">Password Didn't Match</span>
            )}
          </div>
          <input className="signinBtn submitBtn mt-3" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
