import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import swalErr from "./ErrorHandler";
import Swal from "sweetalert2";
import swalHandle from "./ErrorHandler";
import { Button } from "@mui/material";
import AddShippingAddress from "./AddShippingAddress";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState([]);
  const [selectedAccordian, setSelectedAccordian] = useState(null);
  const [addShippingAddress, setAddShippingAddress] = useState(false);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  useEffect(() => {
    const getAddressBook = async () => {
      try {
        const URL = `${baseUrl}/address/myaddresses`;
        const headers = {
          Authorization: `Bearer ${jwtToken} `,
        };
        swalErr.onLoading();
        const response = await axios.post(URL, {}, { headers });

        if (response.status === 200) {
          setShippingAddress(response.data);
        }
        swalErr.onLoadingClose();
      } catch (error) {
        console.log(error);
        swalErr.onLoadingClose();
        swalErr.onError(error);
      }
    };
    getAddressBook();
  }, [baseUrl, jwtToken]);

  const { userDetails } = useContext(searchResultContext);

  const handleAccTab = (i) => {
    if (selectedAccordian === i) {
      return setSelectedAccordian(null);
    }
    setSelectedAccordian(i);
  };

  const logoutUser = async () => {
    try {
      const url = `${baseUrl}/auth/logout`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      const response = await axios.post(url, {}, { headers });

      if (response.status === 200) {
        swalHandle.onLoadingClose();
        Swal.fire({
          title: "Visit Again!",
          text: "Logout Successfull",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/login");
          Cookies.remove(token);
        }, 2000);
      }
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  const showAddShippingAddress = () => {
    setAddShippingAddress(!addShippingAddress);
  };

  console.log(shippingAddress, "shipping");
  console.log(userDetails);

  return (
    <div className="checkoutPage">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="accordian">
              <div className="accordion-item">
                <div className="accTitle" onClick={() => handleAccTab("1")}>
                  <h5>Account</h5>
                  <span className="accBtn">
                    {selectedAccordian === "1" ? (
                      <RiArrowDropUpLine className="accBtnArr" />
                    ) : (
                      <RiArrowDropDownLine className="accBtnArr" />
                    )}
                  </span>
                </div>
                <div
                  className={
                    selectedAccordian === "1" ? "accCont show" : "accCont"
                  }
                >
                  <div>
                    Name
                    <span>{`  ${userDetails.azst_customer_fname} ${userDetails.azst_customer_lname}`}</span>
                  </div>
                  <div>
                    Phone<span>{`  ${userDetails.azst_customer_mobile}`}</span>
                  </div>
                  <button onClick={handleLogout}>
                    Log Out & Login In into Another Account
                  </button>
                  <p>
                    Please note that upon Clicking 'Log Out' you will loose all
                    the items in your cart and will be redirected Azista Home
                    Page
                  </p>
                  <button>Continue Check Out</button>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accTitle" onClick={() => handleAccTab("2")}>
                  <h5>Ship to</h5>
                  <span className="accBtn">
                    {selectedAccordian === "2" ? (
                      <RiArrowDropUpLine className="accBtnArr" />
                    ) : (
                      <RiArrowDropDownLine className="accBtnArr" />
                    )}
                  </span>
                </div>
                <div
                  className={
                    selectedAccordian === "2" ? "accCont show" : "accCont"
                  }
                >
                  {shippingAddress.map((each, i) => (
                    <div className="addressCard" key={each.address_id}>
                      <input type="radio" name="addressCard" />
                      <div className="">
                        <span>{`${each.address_first_name} ${each.address_last_name} `}</span>
                        <span>{each.address_home_company}</span>
                        <span>{each.address_mobile}</span>
                        <div className="">
                          <address>
                            {each.address_address1}
                            <br />
                            {`${each.address_city} ${each.address_zipcode}`}
                          </address>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={showAddShippingAddress}>
                    {addShippingAddress
                      ? "Use current location"
                      : "Add New Address"}
                  </button>
                  {addShippingAddress && <AddShippingAddress />}
                </div>
              </div>
              <div className="accordion-item">
                <div className="accTitle" onClick={() => handleAccTab("3")}>
                  <div>
                    <h5>Order Summary</h5>
                    <span>
                      Order confirmation will be sent to your registered email
                      address.
                    </span>
                  </div>
                  <span className="accBtn">
                    {selectedAccordian === "3" ? (
                      <RiArrowDropUpLine className="accBtnArr" />
                    ) : (
                      <RiArrowDropDownLine className="accBtnArr" />
                    )}
                  </span>
                </div>
                <div
                  className={
                    selectedAccordian === "3" ? "accCont show" : "accCont"
                  }
                ></div>
              </div>
              <div className="accordion-item">
                <div className="accTitle" onClick={() => handleAccTab("4")}>
                  <h5>Payment</h5>
                  <span className="accBtn">
                    {selectedAccordian === "4" ? (
                      <RiArrowDropUpLine className="accBtnArr" />
                    ) : (
                      <RiArrowDropDownLine className="accBtnArr" />
                    )}
                  </span>
                </div>
                <div
                  className={
                    selectedAccordian === "4" ? "accCont show" : "accCont"
                  }
                ></div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div></div>
            <div>
              <h4>Price Details</h4>
              <p>Order confirmation will be sent via email</p>
              <div>
                <span>Item</span>
              </div>
              <div>
                <span>Shipping Charges</span>
              </div>
              <div>
                <span>Discounts</span>
              </div>
            </div>
            <div>
              <h5>Grand Total</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
