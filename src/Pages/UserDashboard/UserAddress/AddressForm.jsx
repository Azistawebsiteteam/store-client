import React from 'react'


const AddressForm = (props) => {
    const { setInputValue, inputValues } = props

    const handleInputValue = (e) => {
        setInputValue({ ...inputValues, [e.target.id]: e.target.value })
    }

    const onChangeDefault = (e) => {
        setInputValue({ ...inputValues, [e.target.id]: e.target.checked })
    }

    return (
        <form className="row g-3" >
            <div className="col-md-6">
                <label htmlFor="customerFirstName" className="form-label">First Name</label>
                <input type="text" value={inputValues.customerFirstName} className="form-control" id="customerFirstName" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="customerLastName" className="form-label">Last Name</label>
                <input type="text" value={inputValues.customerLastName} className="form-control" id="customerLastName" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="customerMobileNum" className="form-label">Contact</label>
                <input type="text" value={inputValues.customerMobileNum} className="form-control" id="customerMobileNum" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="customerEmail" className="form-label">Email</label>
                <input type="email" value={inputValues.customerEmail} className="form-control" id="customerEmail" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="area" className="form-label">Area</label>
                <input type="email" value={inputValues.area} className="form-control" id="area" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" value={inputValues.city} className="form-control" id="city" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="district" className="form-label">District</label>
                <input type="text" value={inputValues.district} className="form-control" id="district" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="state" className="form-label">State</label>
                <input type="email" value={inputValues.state} className="form-control" id="state" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" value={inputValues.country} className="form-control" id="country" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="zipCode" className="form-label">Zipcode</label>
                <input type="text" value={inputValues.zipCode} className="form-control" id="zipCode" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="landmark" className="form-label">Landmark</label>
                <input type="text" value={inputValues.landmark} className="form-control" id="landmark" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="homeOrCompany" className="form-label">Home/Company</label>
                <input type="text" value={inputValues.homeOrCompany} className="form-control" id="homeOrCompany" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="availableFromTime">Available From Time</label>
                <input type="time" value={inputValues.availableFromTime} className="form-control" id="availableFromTime" onChange={handleInputValue} />
            </div>
            <div className="col-md-6">
                <label htmlFor="availableToTime">Available To Time</label>
                <input type="time" value={inputValues.availableToTime} className="form-control" id="availableToTime" onChange={handleInputValue} />
            </div>
            <div className="form-group">
                <label htmlFor="address1">Address</label>
                <textarea className="form-control" value={inputValues.address1} id="address1" rows="3" onChange={handleInputValue} ></textarea>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" value={inputValues.isDefault} type="checkbox" id="isDefault" onChange={onChangeDefault} />
                <label className="form-check-label" htmlFor="isDefault">Default Address</label>
            </div>
        </form>
    )
}

export default AddressForm