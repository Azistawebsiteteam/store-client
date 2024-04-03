import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';


const AddressCard = (props) => {
    const { addressList } = props

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)
    // const navigate = useNavigate

    const makeDefault = async (id) => {
        try {
            const url = `${baseUrl}/address/make/default-address`
            const headers = {
                Authorization: `Bearer ${jwtToken} `,
            }
            const response = await axios.post(url, { "addressId": id }, { headers })
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteAddress = async (id) => {
        const URL = `${baseUrl}/address/delete`

        const headers = { Authorization: `Bearer ${jwtToken}` }

        const body = { "addressId": id }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(URL, body, { headers })
                    if (response.status === 200) {

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: error.response.data.message,
                        icon: "error"
                    });
                }
            }
        });

    }
    return (
        <> {
            addressList.map(address => (
                <div key={address.address_id} className='addressCard'>
                    <h6 className='name'>{address.address_first_name}</h6>
                    <p>{address.address_mobile}</p>
                    <p>{address.address_house_no}, {address.address_area}</p>
                    <p>{address.address_city}, {address.address_zipcode}</p>
                    <p>{address.address_state}</p>
                    <p>{address.address_country}</p>
                    <div className='options'>
                        <Link to={`/update-address/${address.address_id}`}>{<MdModeEditOutline />}</Link>
                        <button onClick={e => deleteAddress(address.address_id)}>{<MdDelete />}</button>
                        {address.address_defaultStatus === 1 ? <p>Default</p> : <button onClick={event => makeDefault(address.address_id)}>Make As Default</button>}
                    </div>
                </div>
            ))
        }
        </>
    )
}

export default AddressCard