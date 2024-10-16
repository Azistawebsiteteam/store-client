import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import swalErr from "../../Components/ErrorHandler";
import "./UserAddress.css";

const AddressCard = (props) => {
  const { addressList, setAddressList } = props;

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  // const navigate = useNavigate

  const makeDefault = async (id) => {
    try {
      const url = `${baseUrl}/address/make/default-address`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };
      swalErr.onLoading();
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(url, { addressId: id }, { headers });
      swalErr.onLoadingClose();
      swalErr.onSuccess();
    } catch (error) {
      swalErr.onLoadingClose();
      swalErr.onError(error);
    }
  };

  const deleteAddress = async (id) => {
    const URL = `${baseUrl}/address/delete`;

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const body = { addressId: id };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(URL, body, { headers });
          if (response.status === 200) {
            const updatedAddress = addressList.filter(
              (item) => item.address_id !== id
            );

            setAddressList(updatedAddress);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          swalErr.onError(error);
        }
      }
    });
  };
  return (
    <>
      {addressList.map((address) => (
        <div key={address.address_id} className="identityDetails billingAdd">
          <div className="topAddressSec d-flex justify-content-between align-items-center">
            <p className="addHeadingTxt">{address.address_first_name}</p>
            <div className="options">
              <Link to={`/update-address/${address.address_id}`}>
                {<MdModeEditOutline />}
              </Link>
              <button
                className="addressDltBtn"
                onClick={(e) => deleteAddress(address.address_id)}
              >
                {<MdDelete />}
              </button>
            </div>
          </div>
          <small>
            {address.address_house_no}
            {} {address.address_area}
          </small>
          <small className="d-block">
            {address.address_city}, {address.address_zipcode}
          </small>
          <small>{address.address_state}</small>
          <small>{address.address_country}</small>
          <p className="addHeadingTxt">Contact Number</p>
          <small>{address.address_mobile}</small>
          {address.address_defaultStatus === 1 ? (
            <button
              className="addressStatusBtn"
              onClick={(event) => makeDefault(address.address_id)}
            >
              Default
            </button>
          ) : (
            <button
              className="addressStatusBtn"
              onClick={(event) => makeDefault(address.address_id)}
            >
              Make As Default
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default AddressCard;
