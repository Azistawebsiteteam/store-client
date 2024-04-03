import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import axios from 'axios';
import Cookies from 'js-cookie';

const Cart = () => {
    const [cartList, setCartList] = useState([])

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)

    useEffect(() => {
        const cartItems = async () => {
            const url = `${baseUrl}/cart/data`
            const headers = {
                Authorization: `Bearer ${jwtToken}`
            }
            const response = await axios.get(url, { headers })
            setCartList(response)
        }; cartItems();
    }, [baseUrl, jwtToken])
    console.log(cartList)

    return (
        <div className='container mt-5'>
            <div className='cartPageTopSec'>
                <h3>Your Cart</h3>
                <div className='checkOutBtnCont'>
                    <span>Sub Total<br />Rs. 1000.00</span>
                    <Link className="checkOutBtn" to=''><FaCartShopping /> Check out</Link>
                </div>
            </div>
            <div className='cartPageBotSec'>

                {/* {cartList.map(eachItem => { */}

                <div className='row'>
                    <div className='itemCont'>
                        <div className='col-sm-1'>
                            <img src="/azista.png" alt='' />
                        </div><div className='col-sm-6'>
                            <div className='d-flex flex-column'>
                                <span className='title'>DaSutra Max Pleasure Condoms - With 396 dots | 5in1 multi-textured condoms | Flavour</span>
                                <span className='price'>1000/-</span>
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <select className="QuantityDropdown" aria-label=".form-select-sm example">
                                <option selected>Quantity</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='col-sm-1'>
                            <span>2000/-</span>
                        </div>
                        <div className='col-sm-1'>
                            <GiCancel />
                        </div>
                    </div>
                </div>
            </div>
            {/* })} */}
        </div>
    )
}

export default Cart