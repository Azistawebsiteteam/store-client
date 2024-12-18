import React, { useState } from 'react';
import AddressForm from './AddressForm';
import Cookies from 'js-cookie';
import axios from 'axios';
import SideBar from '../UserProfile/SideBar';
import { useNavigate } from 'react-router-dom';
import swalErr from '../../Components/ErrorHandler';
import { FaArrowLeft } from 'react-icons/fa6';
import { handleValidationError } from './Validation';

const NewAddress = ({ updateFormFilledStatus }) => {
  const [inputValues, setInputValue] = useState({
    customerFirstName: '',
    customerLastName: '',
    customerMobileNum: '',
    customerEmail: '',
    housenumber: '',
    district: '',
    state: '',
    country: '',
    zipCode: '',
    landmark: '',
    homeOrCompany: 'Home',
    address1: '',
    address2: '',
    isDefault: false,
    availableFromTime: '',
    availableToTime: '',
  });
  const [errors, setErrors] = useState({});
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    const validationErrorMessage = handleValidationError(inputValues);
    if (Object.keys(validationErrorMessage).length > 0) {
      window.scrollTo(0, 0);
      setErrors(validationErrorMessage);
      return;
    }
    try {
      e.preventDefault();
      const url = `${baseUrl}/address/add/newaddress`;
      const headers = {
        Authorization: `Bearer ${jwtToken} `,
      };
      swalErr.onLoading();
      const response = await axios.post(url, inputValues, { headers });
      if (response.status === 201) {
        navigate('/manage-address');
      }
      swalErr.onLoadingClose();
      swalErr.onSuccess();
    } catch (error) {
      swalErr.onLoadingClose();
      swalErr.onError(error);
    }
  };

  return (
    <div className='UserAddressSec'>
      <div className='d-flex'>
        <SideBar />
        <div className='myAccUserAdd'>
          <div className='myAccUserInnerSec'>
            <div style={{ margin: '0 0 2% 0' }}>
              <FaArrowLeft
                onClick={() => navigate(-1)}
                style={{ cursor: 'pointer' }}
              />
              <h5 style={{ marginBottom: '0' }}>Delivery Address</h5>
              <small>
                Delivery Address Book &gt;{' '}
                <strong style={{ fontWeight: '500' }}>Create Address</strong>
              </small>
            </div>
            <AddressForm
              inputValues={inputValues}
              setInputValue={setInputValue}
              errors={errors}
              setErrors={setErrors}
            />
            <input
              type='button'
              value='Submit'
              className='commonBtn mt-3'
              onClick={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
