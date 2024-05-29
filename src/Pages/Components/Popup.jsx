import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import Cookies from "js-cookie";

const Popup = () => {
  const [popupData, setPopupData] = useState({});
  const [togglePopup, setTogglePopup] = useState(true);

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = process.env.REACT_APP_ADMIN_JWT_TOKEN;
  const token = Cookies.get(jwtToken);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const url = `${baseUrl}/popups/current/popup`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setPopupData(response.data);
        }
      } catch (error) {
        console.log(error);
        setPopupData("");
      }
    };
    getBanner();
  }, [baseUrl, token]);
  console.log(popupData);
  return (
    togglePopup && (
      <div className="popupCont">
        <div className="popupImgCont">
          <a className="popupLink" href={popupData.popup_url}>
            <img
              className="popupImg"
              src={popupData.popup_image}
              alt={popupData.popup_name}
            />
          </a>
          <div className="closeBtn">
            <IoCloseCircle
              className="closeBtn"
              onClick={() => setTogglePopup(!togglePopup)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
