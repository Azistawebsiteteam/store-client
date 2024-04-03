import React from 'react'
import './Components.css'
import { Link } from 'react-router-dom'

const CollectionsTab = (props) => {

    const { collectionsItems } = props
    console.log(collectionsItems)

    return (
        collectionsItems.map((eachTab) => (<li id={eachTab.azst_collection_id}><Link to={`/collections/${eachTab.collection_url_title}`}>{eachTab.azst_collection_name}</Link></li>))
    )
}

export default CollectionsTab
