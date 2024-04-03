import React from 'react'

const BrandsTab = (props) => {
    const { key, name, brandLogo } = props
    return (
        <li id={key}><img src={brandLogo} alt={name} />
            <p>{name}</p></li>
    )
}

export default BrandsTab