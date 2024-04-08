import React, { useState } from 'react'
import AddressForm from './AddressForm'
import Cookies from 'js-cookie'
import axios from 'axios'
import SideBar from '../UserProfile/SideBar'
import { useNavigate } from 'react-router-dom'

const NewAddress = ({ updateFormFilledStatus }) => {
    const [inputValues, setInputValue] = useState({
        customerFirstName: "",
        customerLastName: "",
        customerMobileNum: "",
        customerEmail: "",
        housenumber: "",
        area: "",
        city: "",
        district: "",
        state: "",
        country: "",
        zipCode: "",
        landmark: "",
        homeOrCompany: "",
        address1: "",
        address2: "",
        isDefault: false,
        availableFromTime: "",
        availableToTime: '',
    })
    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)
    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const url = `${baseUrl}/address/add/newaddress`
            const headers = {
                Authorization: `Bearer ${jwtToken} `,
            }
            const avalableTime = `${inputValues.availableFromTime}-${inputValues.availableToTime} `
            delete inputValues.availableFromTime
            delete inputValues.availableToTime
            const response = await axios.post(url, { ...inputValues, avalableTime }, { headers })
            console.log(response)
            if (response.status === 201) {
                navigate('/manage-address')
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    return (
        <div className='d-flex'>
            <SideBar />
            <div className='w-75'>
                <AddressForm inputValues={inputValues} setInputValue={setInputValue} />
                <input type='button' value="submit" onClick={handleFormSubmit} />
            </div>
        </div>
    )
}

export default NewAddress