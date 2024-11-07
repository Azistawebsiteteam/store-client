import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ScrollToTop from "../../../Utils/ScrollToTop";
import SideBar from "../UserProfile/SideBar";
import { FaUpload } from "react-icons/fa6";
import "./../index.css";
import "../UserProfile/UserProfile.css";

const ReturnsAndReplace = () => {
  const [sameBankAccount, setSameBankAccount] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    reason: "",
    bankAcNo: "",
    ifscCode: "",
    branch: "",
    bankName: "",
    acName: "",
  });
  const [bankFile, setBankFile] = useState();
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { orderId } = location.state || {};
  const baseUrl = `${process.env.REACT_APP_API_URL}`;
  const jwtToken = Cookies.get(`${process.env.REACT_APP_JWT_TOKEN}`);

  const reasons = [
    "Item Arrived Damaged or Defective",
    "Received Wrong Item",
    "Item Not as Described",
    "Found a Better Price",
    "Item Didn’t Fit",
    "Poor Quality",
    "Late Delivery",
    "No Longer Needed",
    "Other",
  ];

  const validations = (bankDetails) => {
    const validationErrorMessage = {};

    if (bankDetails.reason === "") {
      validationErrorMessage.reason = "Please select a reason";
    }
    if (bankDetails.bankAcNo === "") {
      validationErrorMessage.bankAcNo = "Please enter bank account number";
    }
    if (bankDetails.ifscCode === "") {
      validationErrorMessage.ifscCode = "Please enter IFSC code";
    }
    if (bankDetails.branch === "") {
      validationErrorMessage.branch = "Please enter branch name";
    }
    if (bankDetails.bankName === "") {
      validationErrorMessage.bankName = "Please enter bank name";
    }
    if (bankDetails.acName === "") {
      validationErrorMessage.acName = "Please enter account holder's name";
    }
    return validationErrorMessage;
  };

  const onSubmitReturn = async (e) => {
    try {
      e.preventDefault();
      const validationErrorMessage = validations(bankDetails);
      if (Object.keys(validationErrorMessage).length > 0) {
        return setErrors(validationErrorMessage);
      }
      const url = `${baseUrl}/orders/customer/return-order`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      let body;

      if (sameBankAccount) {
        body = {
          orderId,
          reason: bankDetails.reason,
          refundMethod: sameBankAccount
            ? "Same Payment Method"
            : "Bank Transfer",
        };
      } else {
        const formData = new FormData();

        formData.append("orderId", orderId);
        formData.append("reason", bankDetails.reason);
        formData.append(
          "refundMethod",
          sameBankAccount ? "Same Payment Method" : "Bank Transfer"
        );
        // formData.append('bankTransferDetails', JSON.stringify(bankDetails));
        formData.append("bankTransferDetails[bankAcNo]", bankDetails.bankAcNo);
        formData.append("bankTransferDetails[ifscCode]", bankDetails.ifscCode);
        formData.append("bankTransferDetails[branch]", bankDetails.branch);
        formData.append("bankTransferDetails[bankName]", bankDetails.bankName);
        formData.append("bankTransferDetails[acName]", bankDetails.acName);

        if (bankFile) {
          formData.append("bankFile", bankFile);
        }
        body = formData;
      }

      await axios.post(url, body, { headers });
    } catch (error) {}
  };

  const handleBankDetails = (e) => {
    let { value, id } = e.target;

    if (id === "bankAcNo" || id === "ifscCode") {
      value = value.replace(/[^0-9]/g, "");
    }

    setBankDetails({ ...bankDetails, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const isBankAccountSame = () => {
    setSameBankAccount(!sameBankAccount);
    setBankDetails({
      reason: "",
      bankAcNo: "",
      ifscCode: "",
      branch: "",
      bankName: "",
      acName: "",
    });
    setBankFile();
  };

  const onChangeBankFile = (e) => {
    const passbookFile = e.target.files[0];
    setBankFile(passbookFile);
  };

  return (
    <>
      <ScrollToTop />
      <div className="userProfileSec">
        <div className="d-flex">
          <SideBar />
          <div className="ordersCont">
            <form className="row g-3" onSubmit={onSubmitReturn}>
              <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">
                  Why are you returning this
                </label>
                <select
                  id="reason"
                  onChange={handleBankDetails}
                  value={bankDetails.reason}
                  className="form-select"
                >
                  {reasons.map((reason, i) => (
                    <option key={i} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              {bankDetails.reason === "Other" && (
                <div className="col-md-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      rows={4}
                      id="reason"
                      value={bankDetails.reason}
                      maxLength={1000}
                    ></textarea>
                    <label htmlFor="reason">Comments (required):</label>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sameBankAccount"
                    onChange={isBankAccountSame}
                    checked={sameBankAccount}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Same as my previous bank
                  </label>
                </div>
              </div>
              {!sameBankAccount && (
                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="bankAcNo"
                        value={bankDetails.bankAcNo}
                        onChange={handleBankDetails}
                        placeholder="Bank Account Number"
                      />
                      <label htmlFor="bankAcNo">Bank Account Number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="acName"
                        value={bankDetails.acName}
                        onChange={handleBankDetails}
                        placeholder="Bank Account Holder Name"
                      />
                      <label htmlFor="acName">Bank Account Holder Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="ifscCode"
                        value={bankDetails.ifscCode}
                        onChange={handleBankDetails}
                        placeholder="Bank IFSC Number"
                      />
                      <label htmlFor="ifscCode">Bank IFSC Number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        value={bankDetails.bankName}
                        onChange={handleBankDetails}
                        placeholder="Bank Name"
                      />
                      <label htmlFor="bankName">Bank Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="branch"
                        value={bankDetails.branch}
                        onChange={handleBankDetails}
                        placeholder="Branch Name"
                      />
                      <label htmlFor="branch">Branch Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="customBankFileInput">
                      <label htmlFor="bankFile" className="bankFileUpload">
                        Upload
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        className="d-none"
                        id="bankFile"
                        onChange={handleBankDetails}
                      />
                    </div> */}

                    <div className="customBankFileInput">
                      {bankFile ? (
                        typeof bankFile === "string" ? (
                          <img
                            className="bankFileThumbnail"
                            src={bankFile}
                            width={200}
                            height={180}
                            alt=""
                          />
                        ) : (
                          <img
                            className="bankFileThumbnail"
                            src={URL.createObjectURL(bankFile)}
                            width={200}
                            height={180}
                            alt=""
                          />
                        )
                      ) : (
                        <span className="bankFileUpload">
                          <FaUpload /> Drop file here or click to upload
                        </span>
                      )}
                      <input
                        type="file"
                        className="bankFileInput"
                        id="bankFile"
                        onChange={onChangeBankFile}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <input
                  type="subit"
                  value="Submit"
                  className="commonBtn text-center"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndReplace;
