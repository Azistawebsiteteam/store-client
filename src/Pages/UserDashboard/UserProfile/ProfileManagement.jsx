import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import swalHandle from '../../Components/ErrorHandler'
import './UserProfile.css'

const ProfileManagement = () => {
    const [userDetails, setUserDetails] = useState({})
    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)
    useEffect(() => {
        const getProfileDetails = async () => {
            try {
                const url = `${baseUrl}/profile/data`
                const headers = {
                    Authorization: `Bearer ${jwtToken}`
                }
                swalHandle.onLoading()
                const response = await axios.post(url, {}, { headers })

                if (response.status === 200) {
                    swalHandle.closeLoader()
                    setUserDetails(response.data.customerData)
                }
            } catch (error) {
                swalHandle.closeLoader()
                swalHandle.closeLoader(error)
            }
        };
        getProfileDetails()
    }, [jwtToken, baseUrl]
    )

    return (
        <div className='userProfileSec'>
            <div className='container'>
                <div className='d-flex'>
                    <SideBar />
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5>FirstName : {userDetails.azst_customer_fname}</h5>
                            <h5>LastName : {userDetails.azst_customer_lname}</h5>
                            <h5>Email : {userDetails.azst_customer_email}</h5>
                            <h5>Email Subscription : {userDetails.azst_customer_acceptemail_marketing}</h5>
                        </div>
                        <div>
                            <Link to='/edit-profile' state={{ userDetails }}><button >{<MdModeEditOutline />}</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileManagement