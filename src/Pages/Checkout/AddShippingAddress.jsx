import React, { useState } from "react";
import Cookies from "js-cookie";
import ErrorHandler from "../Components/ErrorHandler";
import axios from "axios";

const AddShippingAddress = ({
  setSelectedShippingAddress,
  setSelectedAccordian,
  setAddShippingAddress,
}) => {
  const [addressForm, setAddressForm] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerMobileNum: "",
    address1: "",
    zipCode: "",
    district: "",
    state: "",
    landmark: "",
    homeOrCompany: "Home",
    customerEmail: "",
  });

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const onSubmitForm = async () => {
    try {
      const url = `${baseUrl}/address/add/newaddress`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };

      ErrorHandler.onLoading();
      const response = await axios.post(url, addressForm, { headers });
      if (response.status === 201) {
        const { address } = response.data;
        setSelectedShippingAddress(address.address_id);
        setSelectedAccordian("3");
        setAddShippingAddress(false);
        ErrorHandler.onSuccess();
        ErrorHandler.onLoadingClose();
      }
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleAddressForm = (e) => {
    setAddressForm({ ...addressForm, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="customerFirstName"
                placeholder="First Name"
                onChange={handleAddressForm}
                value={addressForm.customerFirstName}
              />
              <label htmlFor="customerFirstName">First Name</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="customerLastName"
                placeholder="Last Name"
                onChange={handleAddressForm}
                value={addressForm.customerLastName}
              />
              <label htmlFor="customerLastName">Last Name</label>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Address (Area & Street)"
                id="address1"
                onChange={handleAddressForm}
                value={addressForm.address1}
              ></textarea>
              <label htmlFor="address1">Address (Area & Street)</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="zipCode"
                placeholder="Pincode"
                onChange={handleAddressForm}
                value={addressForm.zipCode}
              />
              <label htmlFor="zipCode">Pincode</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="customerMobileNum"
                placeholder="Contact Number"
                onChange={handleAddressForm}
                value={addressForm.customerMobileNum}
              />
              <label htmlFor="customerMobileNum">Contact Number</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="district"
                placeholder="City/Town/District"
                onChange={handleAddressForm}
                value={addressForm.district}
              />
              <label htmlFor="district">City/Town/District</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                id="state"
                aria-label="Floating label select example"
                onChange={handleAddressForm}
                value={addressForm.state}
              >
                <option>Select State</option>
                {states.map((each, i) => (
                  <option key={i} value={each}>
                    {each}
                  </option>
                ))}
              </select>
              <label htmlFor="state">State</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="landmark"
                placeholder="Landmark (Optional)"
                onChange={handleAddressForm}
                value={addressForm.landmark}
              />
              <label htmlFor="landmark">Landmark (Optional)</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                id="homeOrCompany"
                aria-label="Floating label select example"
                onChange={handleAddressForm}
                value={addressForm.homeOrCompany}
              >
                <option value="Home">Home (All Day Delivery)</option>
                <option value="Company">Office (In Office Timings)</option>
              </select>
              <label htmlFor="homeOrCompany">Address Type</label>
            </div>
          </div>
          <div className="col-sm-12">
            <form className="form-floating">
              <input
                type="email"
                className="form-control"
                id="customerEmail"
                placeholder="Email Address (Optional)"
                onChange={handleAddressForm}
                value={addressForm.customerEmail}
              />
              <label htmlFor="customerEmail">Email Address (Optional)</label>
            </form>
          </div>
          <div className="col-sm-12 mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Enroll me with news and offers
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <button
              onClick={onSubmitForm}
              className="bg-success deliverHereBtn"
            >
              Delivery here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddShippingAddress;
