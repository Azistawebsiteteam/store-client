import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import './index.css'

const UserLoginPage = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [inputValues, setInputValues] = useState({
        "mailOrMobile": '',
        "password": ''
    })
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_API_URL
    const jwt_token = process.env.REACT_APP_JWT_TOKEN

    useEffect(() => {
        const jwt = Cookies.get(jwt_token)
        if (jwt) {
            navigate('/home')
        }
    })



    const handleOnChangeInput = (e) => {
        setInputValues({
            ...inputValues, [e.target.id]: e.target.value
        })
        setError('')
    }

    const onSubmitSuccess = (jwtToken) => {
        console.log(jwtToken)
        Cookies.set(jwt_token, jwtToken)
        navigate('/', { replace: true })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = `${baseUrl}/auth/login`

            const response = await axios.post(url, inputValues)
            if (response.status === 200) {
                onSubmitSuccess(response.data.jwtToken)
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className='userLoginPage'>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="mailOrMobile">Mail/ Mobile</label>
                    <input type="text" className="form-control" id="mailOrMobile" value={inputValues.mailOrMobile} onChange={handleOnChangeInput} placeholder='Mail/ Mobile' />
                </div>
                <div className="form-group passwordField">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type={hidePassword ? 'Password' : 'text'} autoComplete="off" id="password" placeholder="Password" value={inputValues.password} onChange={handleOnChangeInput} />
                    <div className='hideIcon' onClick={e => setHidePassword(!hidePassword)}>{hidePassword ? <IoMdEye /> : <IoIosEyeOff />}</div>
                </div>
                <span className='text-danger d-block'>{error}</span>
                <input className="mt-3" type="submit" value='Submit' />
            </form>
            <div className='mr-auto'>
                <Link to="/otp-login">Login With OTP</Link><br />
                <Link to="/forgot-password">Forgot Password</Link>
                <p>You dont have an account...? <Link to="/registration">Register</Link></p>
            </div>
        </div>
    )
}

export default UserLoginPage