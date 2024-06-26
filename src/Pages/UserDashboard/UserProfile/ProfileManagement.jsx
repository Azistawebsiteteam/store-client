import React, { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import { searchResultContext } from "../../../ReactContext/SearchResults";
import SideBar from "./SideBar";

const ProfileManagement = () => {
  const { userDetails } = useContext(searchResultContext);

  return (
    <div className="userProfileSec">
      <div className="container">
        <div className="d-flex">
          <SideBar />
          <div className="d-flex justify-content-between">
            <div>
              <h5>FirstName : {userDetails.azst_customer_fname}</h5>
              <h5>LastName : {userDetails.azst_customer_lname}</h5>
              <h5>Email : {userDetails.azst_customer_email}</h5>
              <h5>
                Email Subscription :{" "}
                {userDetails.azst_customer_acceptemail_marketing}
              </h5>
            </div>
            <div>
              <Link to="/edit-profile" state={{ userDetails }}>
                <button>{<MdModeEditOutline />}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
