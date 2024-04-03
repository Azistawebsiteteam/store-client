import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SideBar from './SideBar'
import './UserProfile.css'

const EditProfile = () => {
    const location = useLocation()
    const { userDetails } = location.state || {}
    const Navigate = useNavigate()
    const [profileDetails, setProfileDetails] = useState({
        firstName: userDetails.azst_customer_fname,
        lastName: userDetails.azst_customer_lname,
        mobileNum: userDetails.azst_customer_mobile,
        email: userDetails.azst_customer_email,
        houseNumber: userDetails.azst_customer_hno || "",
        area: userDetails.azst_customer_area,
        city: userDetails.azst_customer_city,
        district: userDetails.azst_customer_district,
        state: userDetails.azst_customer_city,
        country: userDetails.azst_customer_country,
        zipCode: userDetails.azst_customer_zip,
        landmark: userDetails.azst_customer_landmark,
        acceeptEmailMarketing: userDetails.acceeptEmailMarketing,
        company: userDetails.azst_customer_company,
        address1: userDetails.azst_customer_address1,
        address2: userDetails.azst_customer_address2 || "",
        marketingSmsAccept: userDetails.azst_customer_acceptsms_marketing,
        customerNote: userDetails.azst_customer_note,
        taxExempts: userDetails.azst_customer_taxexempts,
        tags: userDetails.azst_customer_tags
    })

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseUrl}/profile/update`
            const headers = {
                Authorization: `Bearer ${jwtToken}`
            }
            const response = await axios.post(url, profileDetails, { headers })
            console.log(response)
            if (response.status === 200) {
                Navigate('/profile-management')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputValue = (e) => {
        setProfileDetails({ ...profileDetails, [e.target.id]: e.target.value })
    }

    return (
        <div className='userProfileSec'>
            <div className='container d-flex'>
                <SideBar />
                <form className="row g-3 w-60" onSubmit={handleProfileUpdate}>
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" value={profileDetails.firstName} className="form-control" id="firstName" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" value={profileDetails.lastName} className="form-control" id="lastName" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="mobileNum" className="form-label">Contact</label>
                        <input type="text" value={profileDetails.mobileNum} className="form-control" id="mobileNum" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={profileDetails.email} className="form-control" id="email" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="houseNumber" className="form-label">House Number</label>
                        <input type="text" value={profileDetails.houseNumber} className="form-control" id="houseNumber" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="area" className="form-label">Area</label>
                        <input type="text" value={profileDetails.area} className="form-control" id="area" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" value={profileDetails.city} className="form-control" id="city" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="district" className="form-label">District</label>
                        <input type="text" value={profileDetails.district} className="form-control" id="district" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" value={profileDetails.state} className="form-control" id="state" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" value={profileDetails.country} className="form-control" id="country" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="zipCode" className="form-label">Zipcode</label>
                        <input type="text" value={profileDetails.zipCode} className="form-control" id="zipCode" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="landmark" className="form-label">Landmark</label>
                        <input type="text" value={profileDetails.landmark} className="form-control" id="landmark" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="acceeptEmailMarketing" className="form-label">Email Marketing</label>
                        <select id="acceeptEmailMarketing" value={profileDetails.acceeptEmailMarketing} className="form-control" onChange={handleInputValue}>
                            <option selected value=''>---select---</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input type="text" value={profileDetails.company} className="form-control" id="company" onChange={handleInputValue} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="address1">Address</label>
                        <textarea value={profileDetails.address1} cols='60' rows='3' className="form-control" id="address1" onChange={handleInputValue}></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="customerNote">Customer Note</label>
                        <textarea value={profileDetails.customerNote} cols='60' rows='3' className="form-control" id="customerNote" onChange={handleInputValue}></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="marketingSmsAccept" className="form-label">Marketing Sms</label>
                        <select id="marketingSmsAccept" value={profileDetails.marketingSmsAccept} className="form-control" onChange={handleInputValue}>
                            <option selected value=''>---select---</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="taxExempts" className="form-label">Tax Exempts</label>
                        <select id="taxExempts" value={profileDetails.taxExempts} className="form-control" onChange={handleInputValue}>
                            <option selected value=''>---select---</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type='text' className="form-control" value={profileDetails.tags} id="tags" rows="3" onChange={handleInputValue} />
                    </div>
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile