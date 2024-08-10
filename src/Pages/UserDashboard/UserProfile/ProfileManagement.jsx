import React, { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import { searchResultContext } from "../../../ReactContext/SearchResults";

import SideBar from "./SideBar";
// import ManageAddress from "../UserAddress/ManageAddress";
import ScrollToTop from "../../../Utils/ScrollToTop";

const ProfileManagement = () => {
  const { userDetails } = useContext(searchResultContext);
  console.log(userDetails, "user");

  return (
    <>
      <ScrollToTop />
      <div className="userProfileSec">
        <div className="d-flex">
          <SideBar />
          <div className="myAccount_right_sec">
            <div className="myAccInnerSec">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <h5>Profile Details</h5>
                  <div>
                    <Link to="/edit-profile" state={{ userDetails }}>
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
                  <div>
                    Name :
                    <small className="details">
                      {userDetails.azst_customer_fname +
                        " " +
                        userDetails.azst_customer_lname}
                    </small>
                  </div>
                  <div>
                    Email :
                    <small className="details">
                      {userDetails.azst_customer_email}
                    </small>
                  </div>
                  <div>
                    Contact :
                    <small className="details">
                      {userDetails.azst_customer_mobile}
                    </small>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column billingAdd">
                <h5>Billing Address</h5>
                <div>
                  Name :
                  <small className="details">
                    {userDetails.azst_customer_fname +
                      " " +
                      userDetails.azst_customer_lname}
                  </small>
                </div>
                <div>
                  Email :
                  <small className="details">
                    {userDetails.azst_customer_email}
                  </small>
                </div>
                <div>
                  Contact :
                  <small className="details">
                    {userDetails.azst_customer_mobile}
                  </small>
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
