import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import Cookies from 'js-cookie';

const ProductItem = () => {
    const [productDetails, setProductDetails] = useState({})
    const [mainImg, setMainImg] = useState()
    const [variants, setVariants] = useState([])
    const [quantityCounter, setQuantityCounter] = useState(0)
    const [cartCount, setCartCount] = useState(0)

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)
    let { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const productDetails = async () => {
            try {
                const url = `${baseUrl}/product/details`
                const response = await axios.post(url, { "productId": id })
                console.log(response.data)
                setProductDetails(response.data.productDetails)
                setVariants(response.data.variants)
            } catch (error) {
                console.log(error)
            };
        }; productDetails();
    }, [id, baseUrl])

    useEffect(() => {
        if (Object.keys(productDetails).length > 0) {
            setMainImg(productDetails.product_images[0])
        }
    }, [productDetails, setMainImg])

    if (Object.keys(productDetails).length === 0) {
        return null
    }

    const decreaseQuantity = () => {
        if (quantityCounter > 1) {
            setQuantityCounter(prevVal => prevVal - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantityCounter(prevVal => prevVal + 1)
    }

    const addToCart = async () => {
        try {
            const url = `${baseUrl}/cart`
            const headers = {
                Authorization: `Bearer ${jwtToken}`
            }
            const cartProducts = [{
                "productId": productDetails.id,
                "variantId": productDetails.vendor_id,
                "quantity": quantityCounter
            }]
            const response = await axios.post(url, { cartProducts }, { headers })
            if (response.status === 200) {
                navigate('/cart')
                setCartCount(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }

    }


    console.log(productDetails)
    return (
        <div className='userPage'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='productContImgSec'>
                            <div className='subImagesCont'>
                                {productDetails.product_images.map((imgUrl, i) => (
                                    <img src={imgUrl} key={i} className="subImages" alt='yyu' onMouseOver={() => setMainImg(imgUrl)} />
                                ))
                                }
                            </div>
                            <div className='mainImage'>
                                <img src={mainImg} className="mainImage" alt='yyu' />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='rightSec'>
                            <h3>{productDetails.product_title}</h3>
                            <div className='d-flex'>
                                <p className='comparedPrice'>Rs {productDetails.compare_at_price}</p>
                                <p className='price'>Rs {productDetails.price}</p>
                            </div>
                            <div className=''>
                                <div className="d-flex">
                                    <div className='quantityCont'>
                                        <span onClick={decreaseQuantity}><FaMinus /></span>
                                        <span className='quantityVal'>{quantityCounter}</span>
                                        <span onClick={increaseQuantity}><FaPlus /></span>
                                    </div>
                                    <button onClick={addToCart} className="btn addToCartBtn" type="button">Add to cart</button>
                                </div>
                                <button className="btn" type="button"><IoMdHeart /> Add to Wishlist</button>
                                <div className='variants'>
                                    {variants.map(variant => (
                                        <div key={variant.UOM}>
                                            <h5>{variant.UOM}</h5>
                                            <div className='variantsValues'>
                                                {variant.values.map((value, i) => (
                                                    <button className='variantsValue' key={i}>{value}</button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div dangerouslySetInnerHTML={{ __html: productDetails.product_info }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem