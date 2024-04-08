import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import Cookies from 'js-cookie';
import swalHandle from './ErrorHandler'
import Swal from 'sweetalert2';
import { searchResultContext } from '../../ReactContext/SearchResults';


const ProductItem = () => {
    const [productDetails, setProductDetails] = useState({})
    const [mainImg, setMainImg] = useState()
    const [variants, setVariants] = useState([])
    const [quantityCounter, setQuantityCounter] = useState(0)
    const [availableVarients, setAvailableVarients] = useState([])
    const [selectedVariant1, setSelectedVariant1] = useState('')
    const [selectedVariant2, setSelectedVariant2] = useState('')

    const baseUrl = process.env.REACT_APP_API_URL
    const token = process.env.REACT_APP_JWT_TOKEN
    const jwtToken = Cookies.get(token)
    let { id } = useParams();
    const navigate = useNavigate()

    const { setWishlistCount } = useContext(searchResultContext)

    useEffect(() => {
        const productDetails = async () => {
            try {
                const url = `${baseUrl}/product/details`
                const response = await axios.post(url, { "productId": id })
                setAvailableVarients(response.data.avalaibleVariants)
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

            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleWishlist = async () => {
        try {
            if (!jwtToken) return navigate('/login')
            const url = `${baseUrl}/whish-list/add`
            const headers = {
                Authorization: `Bearer ${jwtToken}`
            }
            swalHandle.onLoading()
            await axios.post(url, {
                "productId": productDetails.id,
                "variantId": availableVarients[0]?.id ?? 0
            }, { headers })
            setWishlistCount(prev => prev + 1)
            Swal.close()
        } catch (error) {
            Swal.close()
            swalHandle.onError(error)

        }
    }

    // const selectedOption = (i, mi, sv, v) => {
    //     console.log({ mi: mi + 1, sv, v }, sv === v)
    //     const variantIndex = variants.filter((each) => {
    //         return each.values.filter((value, index) => index === i);
    //     });
    //     console.log('ddd', variantIndex)
    //     if (variantIndex === i) { setSelectedVariant(true) } else { setSelectedVariant(false) }
    // }

    const handleVariantOpt1 = (v) => {
        if (!selectedVariant1.includes(v)) {
            setSelectedVariant1(v)
        }
    }


    const handleVariantOpt2 = (v) => {
        if (!selectedVariant2.includes(v)) {
            setSelectedVariant2(v)
        }
    }


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
                            <h3>{productDetails.product_title}{selectedVariant1 && `-${selectedVariant1}`}{selectedVariant2 && `-${selectedVariant2}`}</h3>
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
                                <button onClick={handleWishlist} className="btn wishListBtn" type="button"><IoMdHeart style={{ color: '#f7ebb2' }} /> Add to Wishlist</button>
                                <div className='variants'>
                                    {variants.length > 0 &&
                                        <div key={variants[0].UOM}>
                                            <h5>{variants[0].UOM}</h5>
                                            <div className='variantsValues'>
                                                {variants[0].values.map((eachValue, si) =>
                                                    (<button key={si} onClick={(e, i) => handleVariantOpt1(eachValue, i)} className={eachValue === selectedVariant1 ? 'selected' : `variantsValue`}>{eachValue}</button>))}
                                            </div>
                                        </div>
                                    }
                                    {variants.length > 1 &&
                                        <div key={variants[1].UOM}>
                                            <h5>{variants[1].UOM}</h5>
                                            <div className='variantsValues'>
                                                {variants[1].values.map((eachValue, si) =>
                                                    (<button key={si} onClick={(e, i) => handleVariantOpt2(eachValue, i)} className={eachValue === selectedVariant2 ? 'selected' : `variantsValue`}>{eachValue}</button>))}
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div dangerouslySetInnerHTML={{ __html: productDetails.product_info }} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductItem