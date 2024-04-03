import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const OtpLogin = () => {
    const [userInput, setUserInput] = useState({
        enterNumber: "",
        enterOtp: "",
        userEntered: false
    })
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')


    const baseUrl = process.env.REACT_APP_API_URL
    const jwt_token = process.env.REACT_APP_JWT_TOKEN
    const navigate = useNavigate()

    const onSubmitOtpSuccess = (jwtToken) => {
        Cookies.set(jwt_token, jwtToken)
        navigate('/', { replace: true })
    }

    const submitNumber = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl}/auth/login/otp`
            await axios.post(url, { mailOrMobile: userInput.enterNumber })
            setUserInput({ ...userInput, userEntered: true })
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault()
        try {
            const url = `${baseUrl}/auth/login/verify-otp`
            const body = { mailOrMobile: userInput.enterNumber, otp: userInput.enterOtp }
            const response = await axios.post(url, body)
            onSubmitOtpSuccess(response.data.jwtToken)
        } catch (error) {
            setError2(error.response.data.message)
        }

    }

    const handleInputValue = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value })
        setError('')
    }

    const enterNumberInput = () => {
        return (
            <>
                <form className="form-group" onSubmit={submitNumber}>
                    <label htmlFor="enterNumber">Login</label>
                    <input type="text" className="form-control" id="enterNumber" onChange={handleInputValue} value={userInput.enterNumber} />
                    {error ? <span className='error'>{error}</span> : ''}
                    {!userInput.userEntered && <input type='submit' className='mt-3' />}
                </form>
            </>
        )
    }

    const enterOtp = () => {
        return (
            <>
                <form className="form-group" onSubmit={onSubmitOtp}>
                    <label htmlFor='enterOtp'>Enter OTP</label>
                    <input id='enterOtp' className="form-control" value={userInput.enterOtp} onChange={handleInputValue} />
                    {error2 ? <span className='error'>{error2}</span> : ''}
                    <input type='submit' className='mt-3' />
                </form>
            </>
        )
    }

    return (
        <div className='userOtpLogin'>
            <h1>OTP Login</h1>
            <div>{enterNumberInput()}</div>
            {userInput.userEntered && <div>{enterOtp()}</div>}
        </div>
    )
}

export default OtpLogin