import React, { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../UserProfile/SideBar";
import swalHandle from "../../Components/ErrorHandler";
import { FaArrowLeft } from "react-icons/fa6";
import "./UserAddress.css";
import BackBtn from "../../Components/BackBtn";

const UpdateAddress = () => {
  const [inputValues, setInputValue] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerMobileNum: "",
    customerEmail: "",
    housenumber: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    landmark: "",
    homeOrCompany: "",
    address1: "",
    address2: "",
    isDefault: false,
    availableFromTime: "",
    availableToTime: "",
  });
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const url = `${baseUrl}/address/getaddress`;
        const headers = {
          Authorization: `Bearer ${jwtToken} `,
        };
        swalHandle.onLoading();
        const response = await axios.post(url, { addressId: id }, { headers });

        if (response.status === 200) {
          const address = response.data.address;
          swalHandle.onLoadingClose();
          swalHandle.onSuccess(response.data.message);
          const [availableFromTime = "", availableToTime = ""] = (
            address.address_available_time || ""
          )
            .split("-")
            .map((time) => time.trim());

          setInputValue({
            customerFirstName: address.address_first_name,
            customerLastName: address.address_last_name,
            customerMobileNum: address.address_mobile,
            customerEmail: address.address_email,
            housenumber: address.address_house_no,
            area: address.address_area,
            city: address.address_city,
            district: address.address_district,
            state: address.address_state,
            country: address.address_country,
            zipCode: address.address_zipcode,
            landmark: address.address_landmark,
            homeOrCompany: address.address_home_company,
            address1: address.address_address1,
            address2: address.address_address2,
            isDefault: false,
            availableFromTime,
            availableToTime,
          });
        }
      } catch (error) {
        swalHandle.onLoadingClose();
        swalHandle.onError(error);
      }
    };
    getAddress();
  }, [jwtToken, baseUrl, id]);

  const handleUpdate = async () => {
    try {
      const url = `${baseUrl}/address/update/address`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };
      const avalableTime = `${inputValues.availableFromTime}-${inputValues.availableToTime} `;
      delete inputValues.availableFromTime;
      delete inputValues.availableToTime;

      const body = {
        addressId: id,
        ...inputValues,
        avalableTime,
      };
      const response = await axios.put(url, body, { headers });
      if (response.status === 200) {
        navigate(-1);
      }
      swalHandle.onLoadingClose();
      swalHandle.onSuccess();
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };
  return (
    <div className="UserAddressSec">
      <div className="container d-flex">
        <SideBar />
        <div className="w-75">
          <div style={{ margin: "0 0 2% 0" }}>
            <FaArrowLeft
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            />
            <BackBtn />
            <h5 style={{ marginBottom: "0" }}>Delivery Address</h5>
            <small>
              Delivery Address Book &gt;{" "}
              <strong style={{ fontWeight: "500" }}>Edit Address</strong>
            </small>
          </div>
          <AddressForm
            inputValues={inputValues}
            setInputValue={setInputValue}
          />
          <input
            type="button"
            className="mt-3"
            value="Edit"
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
