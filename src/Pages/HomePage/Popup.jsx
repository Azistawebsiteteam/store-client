import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import "../Components/Customer.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ErrorHandler from "../Components/ErrorHandler";

const Popup = () => {
  const [popupData, setPopupData] = useState({});
  // const [togglePopup, setTogglePopup] = useState(true);

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = process.env.REACT_APP_ADMIN_JWT_TOKEN;
  const token = Cookies.get(jwtToken);

  useEffect(() => {
    const bootstrap = require("bootstrap");
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }, []);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const url = `${baseUrl}/popups/current/popup`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setPopupData(response.data);
        }
      } catch (error) {
        ErrorHandler.onError(error);
        setPopupData("");
      }
    };
    getBanner();
  }, [baseUrl, token]);

  return (
    <div
      className="modal fade onLoadModal"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-body">
          {/* <button type="button"  aria-label="Close"></button> */}
          <IoMdCloseCircleOutline
            className="popupbtnclose"
            data-bs-dismiss="modal"
          />
          <img
            className="popupImg"
            src={popupData.popup_image}
            alt={popupData.popup_name}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
