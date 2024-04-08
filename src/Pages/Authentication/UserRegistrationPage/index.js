import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import './index.css'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';

const UserRegistrationPage = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [inputValues, setInputValues] = useState({
        "customerFirstName": "",
        "customerLastName": "",
        "customerMobileNum": "",
        "customerEmail": "",
        "customerPassword": ""
    })
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_API_URL
    const jwt_token = process.env.REACT_APP_JWT_TOKEN

    const handleOnChangeInput = (e) => {
        setInputValues(
            { ...inputValues, [e.target.id]: e.target.value })
        setError('')
    }

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set(jwt_token, jwtToken)
        navigate('/', { replace: true })
    }

    const handleRegistration = async (e) => {
        try {
            e.preventDefault()
            const url = `${baseUrl}/auth/register`;
            const response = await axios.post(url, inputValues)
            if (response.status === 201) {
                onSubmitSuccess(response.data.jwtToken)
            }
            console.log(response)
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message)
            }

        }
    }

    return (
        <div className='userLoginPage'>
            <h1>SignUp</h1>
            <form onSubmit={handleRegistration}>
                <div className="form-group">
                    <label htmlFor="customerFirstName">First Name</label>
                    <input type="text" className="form-control" id="customerFirstName" value={inputValues.customerFirstName} onChange={handleOnChangeInput} placeholder='First Name' />
                </div>
                <div className="form-group">
                    <label htmlFor="customerLastName">Last Name</label>
                    <input type="text" className="form-control" id="customerLastName" value={inputValues.customerLastName} onChange={handleOnChangeInput} placeholder='Last Name' />
                </div>
                <div className="form-group">
                    <label htmlFor="customerMobileNum">Mobile Number</label>
                    <input type="text" className="form-control" id="customerMobileNum" value={inputValues.customerMobileNum} onChange={handleOnChangeInput} placeholder='Mobile Number' />
                </div>
                <div className="form-group">
                    <label htmlFor="customerEmail">Email</label>
                    <input type="email" className="form-control" id="customerEmail" value={inputValues.customerEmail} onChange={handleOnChangeInput} placeholder='Email' />
                </div>
                <div className="form-group">
                    <label htmlFor="customerPassword">Password</label>
                    <input type={hidePassword ? "password" : "text"} className="form-control" id="customerPassword" value={inputValues.customerPassword} onChange={handleOnChangeInput} placeholder='Password' />
                    <div className='hideIcon' onClick={e => setHidePassword(!hidePassword)}>{hidePassword ? <IoMdEye /> : <IoIosEyeOff />}</div>
                </div>
                <span className='d-block text-danger'>{error}</span>
                <input className="mt-3" type="submit" />
            </form>
            <div style={{ display: 'flex' }}>
                <p>register with otp </p><Link to='/otp-registration'><p>Click to proceed</p></Link>
            </div>
            <div style={{ display: 'flex' }}>
                <p>Already Registered? </p><Link to='/login'><p>Login</p></Link>
            </div>
        </div>
    )
}

export default UserRegistrationPage
