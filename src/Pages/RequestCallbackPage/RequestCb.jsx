import axios from "axios";
import React, { useContext, useState } from "react";
import { searchResultContext } from "../../ReactContext/SearchResults";
import ErrorHandler from "../Components/ErrorHandler";

const RequestCb = () => {
  const [rcbForm, setRcbForm] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    orgName: "",
    budget: "",
    requestQty: "",
    purposeOfPurchase: "",
    otherReason: "",
    estimatedDeliveryDate: "",
  });
  const { userDetails } = useContext(searchResultContext);

  const baseUrl = process.env.REACT_APP_API_URL;

  const onRequestCallback = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/cb/`;

      const formdata = new FormData();

      const purpose =
        rcbForm.purposeOfPurchase === "other"
          ? rcbForm.otherReason
          : rcbForm.purposeOfPurchase;

      formdata.append("name", rcbForm.name);
      formdata.append("mobileNumber", rcbForm.mobileNumber);
      formdata.append("email", rcbForm.email);
      formdata.append("orgName", rcbForm.orgName);
      formdata.append("budget", rcbForm.budget);
      formdata.append("requestQty", rcbForm.requestQty);
      formdata.append("purposeOfPurchase", purpose);
      formdata.append("estimatedDeliveryDate", rcbForm.estimatedDeliveryDate);
      formdata.append("customerId", userDetails.azst_customer_id ?? 0);
      ErrorHandler.onLoading();
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(url, formdata);
      ErrorHandler.onLoadingClose();
      ErrorHandler.onSuccess("Callback requested.");
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const handleRcbForm = (e) => {
    setRcbForm({ ...rcbForm, [e.target.id]: e.target.value });
  };

  return (
    <div className="bottomSec">
      <div className="container">
        <div className="requestCallbackPage">
          <h4 className="text-center">Request call back</h4>
          <p className="text-center">Complete the form to call back</p>
          <div className="rcbForm">
            <form className="row g-3" onSubmit={onRequestCallback}>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name"
                    onChange={handleRcbForm}
                    value={rcbForm.name}
                  />
                  <label htmlFor="name">Name</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    onChange={handleRcbForm}
                    value={rcbForm.mobileNumber}
                  />
                  <label htmlFor="mobileNumber">Mobile number</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={handleRcbForm}
                    value={rcbForm.email}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="orgName"
                    placeholder="Organization Name"
                    onChange={handleRcbForm}
                    value={rcbForm.orgName}
                  />
                  <label htmlFor="orgName">Organization name</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="budget"
                    placeholder="Budget"
                    onChange={handleRcbForm}
                    value={rcbForm.budget}
                  />
                  <label htmlFor="budget">Budget</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="requestQty"
                    placeholder="Units"
                    onChange={handleRcbForm}
                    value={rcbForm.requestQty}
                  />
                  <label htmlFor="requestQty">
                    How many units are you looking to purchase?
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="purposeOfPurchase"
                    aria-label="Floating label select example"
                    onChange={handleRcbForm}
                    value={rcbForm.purposeOfPurchase}
                  >
                    <option selected>Select</option>
                    <option value="personalUse">Personal Use</option>
                    <option value="gift">Gift</option>
                    <option value="Business">
                      Business/Corporate Purchase
                    </option>
                    <option value="event">Event/Occasion</option>
                    <option value="eesale">Resale</option>
                    <option value="bulkPurchase">Bulk Purchase</option>
                    <option value="educational">Educational/Research</option>
                    <option value="charity">Non-Profit/Charity</option>
                    <option value="trial">Trial/Evaluation</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                  <label for="purposeOfPurchase">Purpose of purchase</label>
                </div>
              </div>
              {rcbForm.purposeOfPurchase === "other" && (
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="otherReason"
                      placeholder="Other requirements"
                      onChange={handleRcbForm}
                      value={rcbForm.otherReason}
                    />
                    <label htmlFor="otherReason">Any other requirements?</label>
                  </div>
                </div>
              )}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="estimatedDeliveryDate"
                    placeholder="Estimated delivery date"
                    onChange={handleRcbForm}
                    value={rcbForm.estimatedDeliveryDate}
                  />
                  <label htmlFor="estimatedDeliveryDate">
                    Estimated delivery date
                  </label>
                </div>
              </div>
              <div className="col-md-12 text-center">
                <input type="submit" className="customBtn" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCb;
