import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorHandler from "../../Components/ErrorHandler";

const AddressForm = (props) => {
  const { setInputValue, inputValues, errors, setErrors } = props;
  const [states, setStates] = useState([]);

  useEffect(() => {
    const stateApi = async () => {
      try {
        const statesUrl =
          "https://countriesnow.space/api/v0.1/countries/states";

        const response = await axios.post(statesUrl, { country: "India" });
        setStates(response.data.data.states);
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    stateApi();
  }, []);

  const handleInputValue = (e) => {
    let { id, value } = e.target;
    if (id === "zipCode" || id === "customerMobileNum") {
      value = value.replace(/[^0-9]/g, ""); // Sanitize value to allow only numbers
    }
    setInputValue({ ...inputValues, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  // const onChangeDefault = (e) => {
  //   setInputValue({ ...inputValues, [e.target.id]: e.target.checked });
  // };

  return (
    <form autoComplete="off" className="row g-3">
      <div className="form-floating mb-3 col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.customerFirstName}
          style={
            errors.customerFirstName ? { border: "1px solid #f14848" } : {}
          }
          className="form-control"
          id="customerFirstName"
          onChange={handleInputValue}
          placeholder="First Name"
          maxLength={50}
        />
        {errors.customerFirstName && (
          <span className="error">{errors.customerFirstName}</span>
        )}
        <label htmlFor="customerFirstName" className="ms-1">
          First name
        </label>
      </div>
      <div className="form-floating mb-3 col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.customerLastName}
          className="form-control"
          style={errors.customerLastName ? { border: "1px solid #f14848" } : {}}
          id="customerLastName"
          onChange={handleInputValue}
          placeholder="Last Name"
          maxLength={50}
        />
        {errors.customerLastName && (
          <span className="error">{errors.customerLastName}</span>
        )}
        <label htmlFor="customerLastName" className="ms-1">
          Last name
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.customerMobileNum}
          style={
            errors.customerMobileNum ? { border: "1px solid #f14848" } : {}
          }
          className="form-control"
          id="customerMobileNum"
          onChange={handleInputValue}
          placeholder="Contact Number"
          maxLength={10}
        />
        {errors.customerMobileNum && (
          <span className="error">{errors.customerMobileNum}</span>
        )}
        <label htmlFor="customerMobileNum" className="ms-1">
          Contact number
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="email"
          value={inputValues.customerEmail}
          style={errors.customerEmail ? { border: "1px solid #f14848" } : {}}
          className="form-control"
          id="customerEmail"
          onChange={handleInputValue}
          placeholder="Email Id"
          maxLength={62}
        />
        {errors.customerEmail && (
          <span className="error">{errors.customerEmail}</span>
        )}
        <label htmlFor="customerEmail" className="ms-1">
          Email address
        </label>
      </div>

      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.zipCode}
          style={errors.zipCode ? { border: "1px solid #f14848" } : {}}
          className="form-control"
          id="zipCode"
          onChange={handleInputValue}
          placeholder="Pincode"
          maxLength={6}
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}
        <label htmlFor="zipCode" className="ms-1">
          Pincode
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.housenumber}
          style={errors.housenumber ? { border: "1px solid #f14848" } : {}}
          className="form-control"
          id="housenumber"
          onChange={handleInputValue}
          placeholder="House Number"
          maxLength={100}
        />
        {errors.housenumber && (
          <span className="error">{errors.housenumber}</span>
        )}
        <label htmlFor="housenumber" className="ms-1">
          House Number
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.district}
          style={errors.district ? { border: "1px solid #f14848" } : {}}
          className="form-control"
          id="district"
          onChange={handleInputValue}
          placeholder="District"
          maxLength={50}
        />
        {errors.district && <span className="error">{errors.district}</span>}
        <label htmlFor="district" className="ms-1">
          District
        </label>
      </div>
      <div className="form-floating col-md-6">
        <select
          className="form-select"
          value={inputValues.state}
          style={errors.state ? { border: "1px solid #f14848" } : {}}
          id="state"
          onChange={handleInputValue}
          aria-label="Floating label select example"
        >
          <option>Select the state</option>
          {states.map((each, i) => (
            <option key={i} value={each.name}>
              {each.name}
            </option>
          ))}
        </select>
        {errors.state && <span className="error">{errors.state}</span>}
        <label htmlFor="state" className="ms-1">
          State
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          value={inputValues.country}
          style={errors.country ? { border: "1px solid #f14848" } : {}}
          className="form-control"
          id="country"
          onChange={handleInputValue}
          placeholder="Country"
        />
        {errors.country && <span className="error">{errors.country}</span>}
        <label htmlFor="country" className="ms-1">
          Country
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          placeholder="Landmark"
          value={inputValues.landmark}
          style={errors.landmark ? { border: "1px solid #f14848" } : {}}
          id="landmark"
          onChange={handleInputValue}
          maxLength={50}
        />
        <label htmlFor="Landmark" className="ms-1">
          Landmark (Optional)
        </label>
      </div>
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Primary Address"
          id="address1"
          value={inputValues.address1}
          style={errors.address1 ? { border: "1px solid #f14848" } : {}}
          onChange={handleInputValue}
          rows="4"
          cols="50"
          maxLength={200}
        ></textarea>
        {errors.address1 && <span className="error">{errors.address1}</span>}
        <label htmlFor="address1">Primary Address</label>
      </div>
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Secondary Address"
          id="address2"
          rows="4"
          cols="50"
          value={inputValues.address2}
          onChange={handleInputValue}
          maxLength={200}
        ></textarea>
        <label htmlFor="address2">Secondary Address (Optional)</label>
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
          autoComplete="off"
          type="time"
          className="form-control"
          placeholder="Available To Time"
          value={inputValues.availableToTime}
          style={errors.availableToTime ? { border: "1px solid #f14848" } : {}}
          id="availableToTime"
          onChange={handleInputValue}
        />
        {errors.availableToTime && (
          <span className="error">{errors.availableToTime}</span>
        )}
        <label htmlFor="availableToTime" className="ms-1">
          Available To Time
        </label>
      </div>
      <div className="form-floating col-md-6">
        <input
          autoComplete="off"
          type="time"
          className="form-control"
          placeholder="Available From Time"
          value={inputValues.availableFromTime}
          style={
            errors.availableFromTime ? { border: "1px solid #f14848" } : {}
          }
          id="availableFromTime"
          onChange={handleInputValue}
        />
        {errors.availableFromTime && (
          <span className="error">{errors.availableFromTime}</span>
        )}
        <label htmlFor="availableFromTime" className="ms-1">
          Available From Time
        </label>
      </div>
      {/* <div className="row mt-3">
        <div className="form-check col-md-6">
          <input
            autoComplete="off"
            className="form-check-input"
            type="checkbox"
            id="isDefault"
            value={inputValues.isDefault}
            onChange={onChangeDefault}
          />
          <label className="form-check-label" htmlFor="isDefault">
            Default Address
          </label>
        </div>
      </div> */}
    </form>
  );
};

export default AddressForm;
