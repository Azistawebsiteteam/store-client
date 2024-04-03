import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const ForgotPassword = () => {
    const [error, setError] = useState('')
    const [inputValues, setInputValues] = useState({
        "mailOrMobile": "",
        "onSubmit": false,
        "otp": '',
        "newPassword": ''
    })

    const baseUrl = process.env.REACT_APP_API_URL;
    const token_key = process.env.REACT_APP_JWT_TOKEN
    const navigate = useNavigate()

    const onSubmitOtpSuccess = (jwtToken) => {
        Cookies.set(token_key, jwtToken)
        navigate('/', { replace: true })
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl}/auth/forgot-password`
            const response = await axios.post(url, { mailOrMobile: inputValues.mailOrMobile })
            console.log(response)
            setInputValues({ ...inputValues, onSubmit: true })

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl}/auth/forgot-password/verifyotp`
            const body = {
                "mailOrMobile": inputValues.mailOrMobile,
                "otp": inputValues.otp,
                "newPassword": inputValues.newPassword
            }
            const response = await axios.post(url, body)
            onSubmitOtpSuccess(response.data.jwtToken)
            console.log(response)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleUserInput = (e) => {
        setInputValues({ ...inputValues, [e.target.id]: e.target.value })
        setError('')
    }

    const renderOtpSection = () => {
        return (
            <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                    <label htmlFor="otp">Enter otp</label>
                    <input type="text" className="form-control" id="otp" value={inputValues.otp} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="text" className="form-control" id="newPassword" value={inputValues.newPassword} onChange={handleUserInput} />
                </div>
                <span className='text-danger d-block'>{error}</span>
                <input type="submit" />
            </form>
        )
    }
    return (
        <div className='forgotPasswordSec'>
            <h1>Forgot password</h1>
            <form className="form-group" onSubmit={handleForgotPassword}>
                <label htmlFor='mailOrMobile'>Mail Or Mobile</label>
                <input type='text' id='mailOrMobile' className="form-control" value={inputValues.mailOrMobile} onChange={handleUserInput} />
                {!inputValues.onSubmit && <span className='text-danger d-block'>{error}</span>}
                {!inputValues.onSubmit && <input type='submit' className='mt-3' />}
            </form>
            {inputValues.onSubmit && renderOtpSection()}
        </div>
    )
}

export default ForgotPassword