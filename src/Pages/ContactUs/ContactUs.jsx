import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import swalHandler from "../Components/ErrorHandler";
import "./ContactUs.css";
import ScrollToTop from "../../Utils/ScrollToTop";

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const { userDetails } = useContext(searchResultContext);
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  const onSubmitQuery = async (e) => {
    e.preventDefault();
    try {
      if (
        contactDetails.name === "" ||
        contactDetails.email === "" ||
        contactDetails.mobileNumber === "" ||
        contactDetails.message === ""
      ) {
        return alert("Fill the required fields");
      }
      const url = `${baseUrl}/cb/query`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formdata = new FormData();
      formdata.append("name", contactDetails.name);
      formdata.append("email", contactDetails.email);
      formdata.append("mobileNumber", contactDetails.mobileNumber);
      formdata.append("message", contactDetails.message);
      formdata.append("customerId", userDetails.azst_customer_id ?? 0);
      swalHandler.onLoading();
      const response = await axios.post(url, formdata, { headers });
      swalHandler.onLoadingClose();
      swalHandler.onSuccess(response.data.message);
    } catch (error) {
      swalHandler.onLoadingClose();
      swalHandler.onError(error);
    }
  };

  const handleContactUsForm = (e) => {
    setContactDetails({ ...contactDetails, [e.target.id]: e.target.value });
  };
  return (
    <>
      <ScrollToTop />
      <div className="bottomSec">
        <div className="contactUsPage">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="contactusPgleftSec">
                  <h4>Marketed by</h4>
                  <div className="">
                    <p>Azista Industries Private Limited</p>
                    <small>
                      Sy No. 83/1, Plot No.16/A/1 & 16/A/2, 19th & 20th Floor
                      Hetero Tower, Commerzone, Silpa Gram Craft Village,
                      Madhapur, Hyderabad, Shaikpet, Telangana, India, 500 081.
                    </small>
                    <p>GSTIN</p>
                    <small>36AANCA0973A1ZW</small>
                    <p>Reach us</p>
                    <small>
                      <a href="tel:18001034696">1800 103 4696</a>
                    </small>
                    <p>Email us</p>
                    <small>
                      <a href="mailto:sales@heterohealthcare.com">
                        sales@heterohealthcare.com
                      </a>
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="contactusPgrightSec">
                  <h4>
                    Have any Questions?
                    <br /> Lets hear it.
                  </h4>
                  <form className="contactusForm" onSubmit={onSubmitQuery}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label label">
                        Full name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={handleContactUsForm}
                        value={contactDetails.name}
                        aria-describedby="emailHelp"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={handleContactUsForm}
                        value={contactDetails.email}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="mobileNumber"
                        className="form-label label"
                      >
                        Contact number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="mobileNumber"
                        onChange={handleContactUsForm}
                        value={contactDetails.mobileNumber}
                        placeholder="Enter your contsct number"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label label">
                        Message or Comment
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="message"
                        onChange={handleContactUsForm}
                        value={contactDetails.message}
                        placeholder="Enter your Message or Comment"
                      />
                    </div>
                    <button
                      type="submit"
                      className="customBtn"
                      style={{ padding: "0.8rem 2.8rem" }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
