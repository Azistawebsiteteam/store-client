import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="card not-found-card">
        <div className="card-body not-found-body">
          <h1 className="heading-main">404</h1>
          <h3 className="heading_sub">OOPS ! PAGE NOT FOUND</h3>
          <p className="text-center">
            Sorry, The Page You're Looking For Doesn't Exisist
          </p>
          <p>We are Working On that </p>
          <Link to="/">
            <button className="btn btn-secondary">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
