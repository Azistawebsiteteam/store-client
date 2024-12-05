import React from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "../Authentication/UserLoginPage/index.css";
import "../Components/Customer.css";
import ErrorHandler from "../Components/ErrorHandler";

const GoogleSignIn = (props) => {
  const { btnTxt, type } = props;
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwt_token = process.env.REACT_APP_JWT_TOKEN;
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const { name, email } = res.data;
        if (type === "Signup") {
          navigate("/create-password", {
            state: {
              userData: {
                customerFullName: name,
                customerMailOrMobileNum: email,
              },
            },
          });
        } else {
          const url = `${baseUrl}/auth/login/google`;

          const response = await axios.post(url, { mailOrMobile: email });
          let jwtToken = response.data.jwtToken;
          Cookies.set(jwt_token, jwtToken);
          navigate("/", { replace: true });
        }
      } catch (err) {
        ErrorHandler.onError(err);
      }
    },
    onError: (error) => {
      ErrorHandler.onError(error);
    },
  });

  return (
    <button
      className="authenticationBtn googleSigninBtn"
      onClick={() => login()}
    >
      <FcGoogle className="google_socialIcon" />
      {btnTxt}
    </button>
  );
};

export default GoogleSignIn;
