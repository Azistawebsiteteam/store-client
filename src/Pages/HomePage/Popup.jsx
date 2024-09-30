import React from "react";
import { useEffect } from "react";
import "../Components/Customer.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Popup = ({ popupData }) => {
  useEffect(() => {
    const bootstrap = require("bootstrap");
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }, []);

  const handleLinkClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent modal closing
  };
  return (
    <div
      className="modal fade onLoadModal"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content custom-model-content">
          <div className="modal-header custom-modal-header">
            <IoMdCloseCircleOutline
              className="popupbtnclose"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{
                cursor: "pointer",
                color: `${popupData.popup_btn_color}`,
              }}
            />
          </div>
          <div className="modal-body">
            {/* Anchor tag for clickable image, with event handling */}
            <a
              href={popupData.popup_url}
              target="_blank"
              rel="noopener noreferrer"
              className="popup-link"
              onClick={handleLinkClick} // Prevents modal close on click
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="popupImg"
                src={popupData.popup_image}
                alt={popupData.popup_name}
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
