export const handleValidationError = (inputValues) => {
  const validationErrorMessage = {};
  if (!inputValues.customerFirstName.trim()) {
    validationErrorMessage["customerFirstName"] = "First name is required";
  }
  if (!inputValues.customerLastName.trim()) {
    validationErrorMessage.customerLastName = "Last name is required";
  }
  if (!inputValues.customerMobileNum.trim()) {
    validationErrorMessage.customerMobileNum = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(inputValues.customerMobileNum)) {
    validationErrorMessage.customerMobileNum = "Invalid mobile number";
  }
  if (!inputValues.customerEmail.trim()) {
    validationErrorMessage.customerEmail = "Email is required";
  }
  if (!inputValues.housenumber.trim()) {
    validationErrorMessage.housenumber = "House number is required";
  }
  if (!inputValues.district.trim()) {
    validationErrorMessage.district = "District is required";
  }
  if (!inputValues.state.trim()) {
    validationErrorMessage.state = "State is required";
  }
  if (!inputValues.country.trim()) {
    validationErrorMessage.country = "Country is required";
  }
  if (!inputValues.zipCode.trim()) {
    validationErrorMessage.zipCode = "Zip code is required";
  }
  if (!inputValues.landmark.trim()) {
    validationErrorMessage.landmark = "Landmark is required";
  }
  if (!inputValues.availableFromTime) {
    validationErrorMessage.availableFromTime =
      "Available From Time is required";
  }
  if (!inputValues.availableToTime) {
    validationErrorMessage.availableToTime = "Available To Time is required";
  }
  if (!inputValues.address1.trim()) {
    validationErrorMessage.address1 = "Address is required";
  }

  return validationErrorMessage;
};
