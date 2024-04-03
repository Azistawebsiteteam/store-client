import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { searchResultContext } from '../../ReactContext/SearchResults'


const AllProductsPage = () => {
    const { searchResults } = useContext(searchResultContext)

    return (
        <div className='collectionProducts'>

            {searchResults.map(item => (
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
    )
}

export default AllProductsPage