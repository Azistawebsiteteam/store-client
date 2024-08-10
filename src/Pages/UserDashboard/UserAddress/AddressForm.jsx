import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = (props) => {
  const { setInputValue, inputValues } = props;
  const [states, setStates] = useState([]);

  useEffect(() => {
    const stateApi = async () => {
      try {
        const statesUrl =
          "https://countriesnow.space/api/v0.1/countries/states";

        const response = await axios.post(statesUrl, { country: "India" });
        setStates(response.data.data.states);
      } catch (error) {
        console.log(error);
      }
    };
    stateApi();
  }, []);

  const handleInputValue = (e) => {
    setInputValue({ ...inputValues, [e.target.id]: e.target.value });
  };

  const onChangeDefault = (e) => {
    setInputValue({ ...inputValues, [e.target.id]: e.target.checked });
  };
  console.log(inputValues.marketingSmsAccept, "inputValues.homeOrCompany");
  console.log(inputValues.isDefault, "inputValues.isDefault");

  return (
    <form className="row g-3">
      <div className="form-floating mb-3 col-md-6">
        <input
          type="text"
          value={inputValues.customerFirstName}
          className="form-control"
          id="customerFirstName"
          onChange={handleInputValue}
          placeholder="First Name"
        />
        <label htmlFor="customerFirstName" className="ms-1">
          First name
        </label>
      </div>
      <div className="form-floating mb-3 col-md-6">
        <input
          type="text"
          value={inputValues.customerLastName}
          className="form-control"
          id="customerLastName"
          onChange={handleInputValue}
          placeholder="Last Name"
        />
        <label htmlFor="customerLastName" className="ms-1">
          Last name
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          value={inputValues.customerMobileNum}
          className="form-control"
          id="customerMobileNum"
          onChange={handleInputValue}
          placeholder="Contact Number"
        />
        <label htmlFor="customerMobileNum" className="ms-1">
          Contact number
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          value={inputValues.housenumber}
          className="form-control"
          id="housenumber"
          onChange={handleInputValue}
          placeholder="House Number"
        />
        <label htmlFor="housenumber" className="ms-1">
          House Number
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          value={inputValues.zipCode}
          className="form-control"
          id="zipCode"
          onChange={handleInputValue}
          placeholder="Pincode"
        />
        <label htmlFor="zipCode" className="ms-1">
          Pincode
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="email"
          value={inputValues.customerEmail}
          className="form-control"
          id="customerEmail"
          onChange={handleInputValue}
          placeholder="Email Id"
        />
        <label htmlFor="customerEmail" className="ms-1">
          Email address (optional)
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          value={inputValues.district}
          className="form-control"
          id="district"
          onChange={handleInputValue}
          placeholder="District"
        />
        <label htmlFor="district" className="ms-1">
          District
        </label>
      </div>
      <div className="form-floating col-md-6">
        <select
          className="form-select"
          value={inputValues.state}
          id="state"
          onChange={handleInputValue}
          aria-label="Floating label select example"
        >
          <option selected>Select the state</option>
          {states.map((each, i) => (
            <option key={i} value={each.state_code}>
              {each.name}
            </option>
          ))}
        </select>
        <label htmlFor="state" className="ms-1">
          State
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          value={inputValues.country}
          className="form-control"
          id="country"
          onChange={handleInputValue}
          placeholder="Country"
        />
        <label htmlFor="country" className="ms-1">
          Country
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Landmark"
          value={inputValues.landmark}
          id="landmark"
          onChange={handleInputValue}
        />
        <label htmlFor="Landmark" className="ms-1">
          Landmark
        </label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Primary Address"
          id="address1"
          value={inputValues.address1}
          onChange={handleInputValue}
          rows="4"
          cols="50"
        ></textarea>
        <label htmlFor="address1">Primary Address</label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Secondary Address"
          id="address2"
          rows="4"
          cols="50"
          value={inputValues.address2}
          onChange={handleInputValue}
        ></textarea>
        <label htmlFor="address2">Secondary Address</label>
      </div>
      <div className="form-floating col-md-6">
        <select
          className="form-select"
          value={inputValues.homeOrCompany}
          id="homeOrCompany"
          onChange={handleInputValue}
          aria-label="Floating label select example"
        >
          <option value="Home">Home (All Day Delivery)</option>
          <option value="Company">Office (9 AM - 5 PM)</option>
        </select>
        <label htmlFor="addressType" className="ms-1">
          Address Type
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="time"
          className="form-control"
          placeholder="Available To Time"
          value={inputValues.availableToTime}
          id="availableToTime"
          onChange={handleInputValue}
        />
        <label htmlFor="availableToTime" className="ms-1">
          Available To Time
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          type="time"
          className="form-control"
          placeholder="Available From Time"
          value={inputValues.availableFromTime}
          id="availableFromTime"
          onChange={handleInputValue}
        />
        <label htmlFor="availableFromTime" className="ms-1">
          Available From Time
        </label>
      </div>
      <div className="row mt-3">
        <div class="form-check col-md-6">
          <input
            className="form-check-input"
            type="checkbox"
            id="isDefault"
            value={inputValues.isDefault}
            onChange={onChangeDefault}
          />
          <label class="form-check-label" htmlFor="isDefault">
            Default Address
          </label>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
