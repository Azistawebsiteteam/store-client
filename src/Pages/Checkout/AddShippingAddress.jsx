import React, { useState } from "react";
import Cookies from "js-cookie";
import ErrorHandler from "../Components/ErrorHandler";
import axios from "axios";

const AddShippingAddress = ({
  setSelectedShippingAddress,
  setSelectedAccordian,
  setAddShippingAddress,
  setShippingAddress,
}) => {
  const [addressForm, setAddressForm] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerMobileNum: "",
    address1: "",
    country: "",
    zipCode: "",
    district: "",
    state: "",
    landmark: "",
    homeOrCompany: "Home",
    customerEmail: "",
  });
  const [errors, setErrors] = useState({});

  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const shippingAddressValidationForm = () => {
    const validationErrorMessage = {};
    if (!addressForm.customerFirstName) {
      validationErrorMessage.customerFirstName = "First name is required";
    }
    if (!addressForm.customerLastName) {
      validationErrorMessage.customerLastName = "Last name is required";
    }
    if (!addressForm.country) {
      validationErrorMessage.country = "Country is required";
    }
    if (!addressForm.customerEmail) {
      validationErrorMessage.customerEmail = "Email is required";
    } else if (addressForm.customerEmail) {
      const emailRegex = /(<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(>|$)/i;
      if (!emailRegex.test(addressForm.customerEmail)) {
        validationErrorMessage.customerEmail = "Invalid email address";
      }
    }
    if (!addressForm.customerMobileNum) {
      validationErrorMessage.customerMobileNum = "Mobile number is required";
    } else if (addressForm.customerMobileNum.length < 10) {
      validationErrorMessage.customerMobileNum = "Invalid mobile number";
    }
    if (!addressForm.address1) {
      validationErrorMessage.address1 = "Address is required";
    }
    if (!addressForm.zipCode) {
      validationErrorMessage.zipCode = "Zip code is required";
    } else if (addressForm.zipCode.length < 6) {
      validationErrorMessage.zipCode = "Invalid zipcode number";
    }
    if (!addressForm.district) {
      validationErrorMessage.district = "District is required";
    }
    if (!addressForm.state) {
      validationErrorMessage.state = "State is required";
    }
    return validationErrorMessage;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let validationErrors = shippingAddressValidationForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo(0, 200);
      return;
    }
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
        setShippingAddress((prev) => [...prev, address]);
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
    let { id, value } = e.target;
    if (id === "zipCode" || id === "customerMobileNum") {
      value = value.replace(/[^0-9]/g, ""); // Sanitize value to allow only numbers
    }
    setAddressForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));

    setErrors({ ...errors, [id]: "" });
  };

  return (
    <form onSubmit={onSubmitForm}>
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
              autoComplete="off"
              maxLength={50}
            />
            <label htmlFor="customerFirstName">First Name</label>
            {errors.customerFirstName && (
              <span className="error">{errors.customerFirstName}</span>
            )}
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
              autoComplete="off"
              maxLength={50}
            />
            <label htmlFor="customerLastName">Last Name</label>
            {errors.customerLastName && (
              <span className="error">{errors.customerLastName}</span>
            )}
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
              autoComplete="off"
              maxLength={140}
            ></textarea>
            <label htmlFor="address1">Address (Area & Street)</label>
            {errors.address1 && (
              <span className="error">{errors.address1}</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="zipCode"
              placeholder="Pincode"
              onChange={handleAddressForm}
              value={addressForm.zipCode}
              autoComplete="off"
              maxLength={6}
            />
            <label htmlFor="zipCode">Pincode</label>
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="customerMobileNum"
              placeholder="Contact Number"
              onChange={handleAddressForm}
              value={addressForm.customerMobileNum}
              autoComplete="off"
              maxLength={10}
            />
            <label htmlFor="customerMobileNum">Contact Number</label>
            {errors.customerMobileNum && (
              <span className="error">{errors.customerMobileNum}</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="district"
              placeholder="City/Town/District"
              onChange={handleAddressForm}
              value={addressForm.district}
              autoComplete="off"
              maxLength={35}
            />
            <label htmlFor="district">City/Town/District</label>
            {errors.district && (
              <span className="error">{errors.district}</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="state"
              aria-label="Floating label select example"
              onChange={handleAddressForm}
              autoComplete="off"
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
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-floating">
            <input
              autoComplete="off"
              maxLength={20}
              type="text"
              value={addressForm.country}
              className="form-control"
              id="country"
              onChange={handleAddressForm}
              placeholder="Country"
            />
            <label htmlFor="country" className="ms-1">
              Country
            </label>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="landmark"
              placeholder="Landmark (Optional)"
              onChange={handleAddressForm}
              value={addressForm.landmark}
              autoComplete="off"
              maxLength={50}
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
              autoComplete="off"
              value={addressForm.homeOrCompany}
            >
              <option value="Home">Home (All Day Delivery)</option>
              <option value="Company">Office (In Office Timings)</option>
            </select>
            <label htmlFor="homeOrCompany">Address Type</label>
          </div>
        </div>
        <div className="col-sm-6">
          <form className="form-floating">
            <input
              type="email"
              className="form-control"
              id="customerEmail"
              placeholder="Email Address (Optional)"
              onChange={handleAddressForm}
              autoComplete="off"
              value={addressForm.customerEmail}
              maxLength={62}
            />
            <label htmlFor="customerEmail">Email Address</label>
            {errors.customerEmail && (
              <span className="error">{errors.customerEmail}</span>
            )}
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
          <input
            type="submit"
            value="Delivery here"
            className="bg-success deliverHereBtn"
          />
        </div>
      </div>
    </form>
  );
};

export default AddShippingAddress;
