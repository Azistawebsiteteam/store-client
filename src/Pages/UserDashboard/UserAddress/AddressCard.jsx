import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import swalErr from "../../Components/ErrorHandler";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import "./UserAddress.css";
import "../../Components/Customer.css";

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
      if (response.status === 200) {
        const updatedAddressList = addressList.map((item) =>
          item.address_id === id
            ? { ...item, address_defaultStatus: 1 }
            : { ...item, address_defaultStatus: 0 }
        );
        setAddressList(updatedAddressList);
        swalErr.onLoadingClose();
        swalErr.onSuccess("Address has been set as default.");
      }
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
        <div className="col-10 m-auto m-md-0 col-md-4" key={address.address_id}>
          <div className="addressBook">
            <div className="topAddressSec d-flex justify-content-between align-items-center">
              <small className="addHeadingTxt">
                {address.address_first_name}
              </small>
              {/* <div className="dropdown">
                <button
                  className="dropdown-toggle adressCardButton"
                  type="button"
                  id="manageAddressDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  <MoreVertIcon />
                </button>
                <ul
                  className="dropdown-menu addressDropdownMenu"
                  aria-labelledby="manageAddressDropdown"
                >
                  <li>
                    <Link
                      className="AddDropdownBtn"
                      to={`/update-address/${address.address_id}`}
                    >
                      Edit
                    </Link>
                  </li>
                  <li onClick={(e) => deleteAddress(address.address_id)}>
                    <span className="AddDropdownBtn">Delete</span>
                  </li>
                  {address.address_defaultStatus !== 1 && (
                    <li onClick={(event) => makeDefault(address.address_id)}>
                      <span className="AddDropdownBtn">Make as default</span>
                    </li>
                  )}
                </ul>
              </div> */}
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="dropdownStyling"
                >
                  <MoreVertIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className="dropdownItem"
                    as={Link}
                    to={`/update-address/${address.address_id}`}
                  >
                    Edit Address
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdownItem"
                    onClick={(e) => deleteAddress(address.address_id)}
                  >
                    Delete Address
                  </Dropdown.Item>
                  {address.address_defaultStatus !== 1 && (
                    <Dropdown.Item
                      className="dropdownItem"
                      onClick={(event) => makeDefault(address.address_id)}
                    >
                      Make as Default
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div style={{ lineHeight: "16px" }}>
              <small>
                {address.address_house_no}
                {} {address.address_area}
              </small>
              <small className="d-block">
                {address.address_address1}, {address.address_zipcode}
              </small>
              <small>{address.address_state + " "}</small>
              <small>{address.address_country}</small>
            </div>
            <div>
              <small className="addHeadingTxt d-block mb-0">
                Contact Number
              </small>
              <small>{address.address_mobile}</small>
            </div>
            {address.address_defaultStatus === 1 && (
              <span className="addressStatusBtn">Default</span>
            )}

            {/* {address.is_default ? (
            <button className="addressStatusBtn" disabled>
              Default
            </button>
          ) : (
            <button
              className="addressStatusBtn"
              onClick={() => makeDefault(address.address_id)}
            >
              Make As Default
            </button>
          )} */}
          </div>
        </div>
      ))}
    </>
  );
};

export default AddressCard;
