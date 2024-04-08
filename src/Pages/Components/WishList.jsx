
// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import swalErr from './ErrorHandler'
import Swal from 'sweetalert2';
import { MdOutlineCancel } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoIosPricetag } from "react-icons/io";
import { searchResultContext } from "../../ReactContext/SearchResults"
import { useContext } from 'react';


const WishList = () => {
    //const [wishList, setWishlist] = useState([])

    const { wishList, setWishlistCount } = useContext(searchResultContext)

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)

    // useEffect(() => {
    //     const getWishlist = async () => {
    //         try {
    //             const url = `${baseUrl}/whish-list`
    //             const headers = {
    //                 Authorization: `Bearer ${jwtToken}`
    //             }
    //             swalErr.onLoading()
    //             const response = await axios.post(url, {}, { headers })
    //             console.log(response)
    //             setWishlist(response.data.whish_list)
    //             setWishlistCount(response.data.whish_list.length)
    //             Swal.close()
    //         } catch (error) {
    //             Swal.close()
    //             console.log(error)
    //         }
    //     }; getWishlist();
    // }, [baseUrl, jwtToken])

    const handleDelete = async (id) => {
        try {
            const url = `${baseUrl}/whish-list/remove`
            const headers = {
                Authorization: `Bearer ${jwtToken}`
            }
            swalErr.onLoading()
            await axios.post(url, {
                "whishlistId": id
            }, { headers })
            Swal.close()
            setWishlistCount(prev => prev - 1)
        } catch (error) {
            Swal.close()
            swalErr.onError(error)
            console.log(error)
        }
    }

    console.log(wishList)

    return (
        <div className='mt-4 ms-4 d-flex flex-wrap'>
            {wishList.map((each, i) => (
                <div className='wishlistItem' key={i}>
                    <Link className="linkStyle" to={`/productitem/${each.product_url_title}`}>
                        <div className='iconCont'>
                            {each.offer_percentage &&
                                <div className='discountTagCont'>
                                    <IoIosPricetag className='discountTag' />
                                    <span className='discount'>{each.offer_percentage} %</span>
                                </div>}
                            <MdOutlineCancel className='cancelBtn' onClick={() => handleDelete(each.azst_wishlist_id)} />
                        </div>
                        <div className='itemImg'>
                            <img src={each.variant_image} alt='productImage' className='wishlistImg' />
                        </div>
                        <div className='itemDetails'>
                            <p className='pTitle'>{each.product_title}</p>
                            <div className=''>
                                <span>&#x20B9; {each.price}</span>
                                <span className='comparedPrice'>&#x20B9; {each.compare_at_price}</span>
                            </div>
                        </div>
                        <button className='addToCartHandle'>Add to cart</button>
                    </Link>
                </div>))
            }
        </div>
    )
}

export default WishList