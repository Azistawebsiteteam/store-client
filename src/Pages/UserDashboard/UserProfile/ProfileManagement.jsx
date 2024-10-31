import React, { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { searchResultContext } from "../../../ReactContext/SearchResults";
import SideBar from "./SideBar";
import ScrollToTop from "../../../Utils/ScrollToTop";

const ProfileManagement = () => {
  const { userDetails } = useContext(searchResultContext);
  return (
    <>
      <ScrollToTop />
      <div className="userProfileSec">
        <div className="d-flex">
          <SideBar />
          <div className="myAccount_right_sec">
            <div className="myAccInnerSec">
              <div className="addressCont">
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-4">
                    <h5 style={{ fontFamily: "outFit" }}>Profile Details</h5>
                    <div>
                      <Link to="/edit-profile">
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          {<MdModeEditOutline style={{ fontSize: "22px" }} />}
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#878787",
                        fontWeight: "500",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Name :
                      <span className="details">
                        {userDetails.azst_customer_name}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#878787",
                        fontWeight: "500",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Email :
                      <span className="details">
                        {userDetails.azst_customer_email}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#878787",
                        fontWeight: "500",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Contact :
                      <span className="details">
                        {userDetails.azst_customer_mobile}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="billingAddressCont">
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-4">
                    <h5 style={{ fontFamily: "outFit" }}>Billing Address</h5>
                  </div>
                  <div className="billingAdd">
                    <div className="d-flex justify-content-between mb-4">
                      <span style={{ fontWeight: "500" }}>
                        {userDetails.azst_customer_name}
                      </span>
                      <div>
                        <Link to="/edit-profile">
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            {<MdModeEditOutline style={{ fontSize: "22px" }} />}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <address>
                      {userDetails.azst_customer_hno}{" "}
                      {userDetails.azst_customer_address1}
                      <br />
                      {userDetails.azst_customer_district}
                      {" - "}
                      {userDetails.azst_customer_zip}
                      <br />
                      {userDetails.azst_customer_state}
                      {", "}
                      {userDetails.azst_customer_country}
                      <br />
                      {`Phone number: ${userDetails.azst_customer_mobile}`}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileManagement;
