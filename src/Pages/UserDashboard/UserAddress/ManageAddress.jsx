import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import AddressCard from './AddressCard';
import Cookies from 'js-cookie';
import axios from 'axios';
import SideBar from '../UserProfile/SideBar';
import { Link } from 'react-router-dom';
import './UserAddress.css'

const ManageAddress = () => {
    const [addressList, setAddressList] = useState([])

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)

    useEffect(() => {
        const getAddressBook = async () => {
            try {
                const URL = `${baseUrl}/address/myaddresses`
                const headers = {
                    Authorization: `Bearer ${jwtToken} `,
                }
                const response = await axios.post(URL, {}, { headers })

                if (response.status === 200) {
                    setAddressList(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAddressBook()
    }, [baseUrl, jwtToken]);

    const addAddress = () => {
        return (
            <div className='addressCont'>
                <h3>Addresses</h3>
                <div className='d-flex'>
                    <div className='addAddress'>
                        <Link to="/new-address">
                            <div className='border'>
                                <CiLocationOn />
                                <p>Add New Address</p>
                                <FaPlus />
                            </div>
                        </Link>
                    </div>
                    <AddressCard addressList={addressList} />
                </div>
            </div>
        )
    }

    return (
        <div className='UserAddressSec'>
            <div className='container d-flex'>
                <SideBar />
                <div>
                    {addAddress()}
                </div>
            </div>
        </div>
    )
}

export default ManageAddress