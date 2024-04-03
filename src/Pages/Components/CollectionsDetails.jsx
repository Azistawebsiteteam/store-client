import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Components.css'

const CollectionsDetails = () => {
    const [productsList, setProductsList] = useState([])
    const [collectionData, setCollectionData] = useState({})
    const baseUrl = process.env.REACT_APP_API_URL
    let { id } = useParams();

    useEffect(() => {
        const collections = async () => {
            try {
                const url = `${baseUrl}/product/collection-products`
                const response = await axios.post(url, { "collectionId": id })
                setCollectionData(response.data.collection_data)
                setProductsList(response.data.products)
            } catch (error) {
                console.log(error)
            }
        };
        collections();
    }, [baseUrl, id])
    console.log(productsList)

    return (
        <div className='userPage'>
            <div className='container'>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                </nav>
                <div className='CollectionDetails'>
                    <h1>{collectionData.azst_collection_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: collectionData.azst_collection_content }} />
                    <img className="collectionMainImg" src={collectionData.azst_collection_img} alt={collectionData.azst_collection_name} />
                </div>
                <div className='collectionProducts'>
                    {productsList.map(item => (
                        <Link className="linkstyles" to={`/productitem/${item.product_url_title}`} >
                            <div className='product_cont'>
                                <img src={item.image_src} alt={item.product_name} />
                                <p className='productTitle'>{item.product_title}</p>
                                <div className='priceCont'>
                                    <span className='comparedPrice'>Rs {item.compare_at_price}</span>
                                    <span className='price'>Rs {item.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CollectionsDetails