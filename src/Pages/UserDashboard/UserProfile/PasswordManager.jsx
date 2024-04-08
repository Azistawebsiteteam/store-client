import axios from "axios"
import Cookies from "js-cookie";
import React, { useState } from 'react';
import SideBar from "./SideBar";
import './UserProfile.css'
import swalHandle from "../../Components/ErrorHandler"

const PasswordManager = () => {
    const [inputValues, setInputValues] = useState({
        'currentPassword': '',
        'newPassword': ''
    })
    const baseUrl = process.env.REACT_APP_API_URL
    const onChangeInputValues = (e) => {
        setInputValues({ ...inputValues, [e.target.id]: e.target.value })
    }
    const onSubmitData = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl}/auth/reset-password`
            const jwtToken = Cookies.get('jwtToken')
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            }
            swalHandle.onLoading()
            const response = await axios.post(url, inputValues, { headers })
            swalHandle.closeLoader()
            swalHandle.onSuccess(response.data.message)
        } catch (error) {
            swalHandle.closeLoader()
            swalHandle.onError(error)
        }
    }

    return (
        <div className="userProfileSec">
            <div className='d-flex'>
                <SideBar />
                <h1>ResetPassword</h1>
                <form onSubmit={onSubmitData}>
                    <div>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input id="currentPassword" value={inputValues.currentPassword} onChange={onChangeInputValues} />
                    </div>
                    <div>
                        <label htmlFor="newPassword">newPassword</label>
                        <input id="newPassword" value={inputValues.newPassword} onChange={onChangeInputValues} />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default PasswordManager