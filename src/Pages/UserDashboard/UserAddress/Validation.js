export const handleValidationError = (inputValues) => {
  console.log(inputValues, "inputValues");
  const validationErrorMessage = {};
  if (!inputValues.customerFirstName) {
    validationErrorMessage["customerFirstName"] = "First name is required";
  }
  if (!inputValues.customerLastName) {
    validationErrorMessage.customerLastName = "Last name is required";
  }
  if (!inputValues.customerMobileNum) {
    validationErrorMessage.customerMobileNum = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(inputValues.customerMobileNum)) {
    validationErrorMessage.customerMobileNum = "Invalid mobile number";
  }
  if (!inputValues.customerEmail) {
    validationErrorMessage.customerEmail = "Email is required";
  }
  if (!inputValues.housenumber) {
    validationErrorMessage.housenumber = "House number is required";
  }
  if (!inputValues.district) {
    validationErrorMessage.district = "District is required";
  }
  if (!inputValues.state) {
    validationErrorMessage.state = "State is required";
  }
  if (!inputValues.country) {
    validationErrorMessage.country = "Country is required";
  }
  if (!inputValues.zipCode) {
    validationErrorMessage.zipCode = "Zip code is required";
  } else if (inputValues.zipCode.length < 6 && inputValues.zipCode) {
    validationErrorMessage.zipCode = "Invalid zip code";
  }
  if (!inputValues.availableFromTime) {
    validationErrorMessage.availableFromTime =
      "Available From Time is required";
  }
  if (!inputValues.availableToTime) {
    validationErrorMessage.availableToTime = "Available To Time is required";
  }
  if (!inputValues.address1) {
    validationErrorMessage.address1 = "Address is required";
  }

  return validationErrorMessage;
};
