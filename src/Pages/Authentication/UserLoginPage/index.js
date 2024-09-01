import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import GoogleSignIn from "../GoogleSignIn";
import "./index.css";
import "../Authentication.css";

const UserLoginPage = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [inputValues, setInputValues] = useState({
    mailOrMobile: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwt_token = process.env.REACT_APP_JWT_TOKEN;

  useEffect(() => {
    const jwt = Cookies.get(jwt_token);
    if (jwt) {
      navigate("/");
    }
  });

  const handleOnChangeInput = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.id]: e.target.value,
    });
    setError("");
  };

  const addLocalCartToUser = async (token) => {
    try {
      const url = `${baseUrl}/cart/add/user`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        sessionId: localStorage.getItem(process.env.REACT_APP_CART_KEY),
      };
      await axios.post(url, body, { headers });
    } catch (error) {}
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set(jwt_token, jwtToken);
    addLocalCartToUser(jwtToken);
    navigate("/", { replace: true });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${baseUrl}/auth/login`;

      const response = await axios.post(url, inputValues);
      if (response.status === 200) {
        onSubmitSuccess(response.data.jwtToken);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="userLoginSection">
      <div className="userLoginPage">
        <h1 className="heading">Sign In</h1>
        <div className="googleBtn">
          <GoogleSignIn
            className="social_icon"
            btnTxt={"Sign In with Google"}
            type={"Sign"}
          />
        </div>
        <div className="seperator">
          <hr />
          <span className="spanText">Or</span>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="labelText" htmlFor="mailOrMobile">
              Email or Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="mailOrMobile"
              value={inputValues.mailOrMobile}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="form-group passwordField">
            <div className="d-flex justify-content-between align-items-center">
              <label className="labelText" htmlFor="password">
                Password
              </label>
              <small>
                <Link
                  to="/otp-login"
                  className="linkBtn"
                  style={{ color: "#008060" }}
                >
                  Sign in with OTP
                </Link>
              </small>
            </div>
            <input
              className="form-control"
              type={hidePassword ? "Password" : "text"}
              autoComplete="off"
              id="password"
              value={inputValues.password}
              onChange={handleOnChangeInput}
            />
            <small>
              <Link to="/forgot-password" className="linkBtn">
                Reset Password?
              </Link>
            </small>

            <div
              className="hideIcon"
              onClick={(e) => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <IoMdEye /> : <IoIosEyeOff />}
            </div>
          </div>
          <span className="text-danger d-block">{error}</span>
          <input
            className="signinBtn submitBtn mt-3"
            type="submit"
            value="Sign In"
          />
        </form>
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

export default UserLoginPage;
