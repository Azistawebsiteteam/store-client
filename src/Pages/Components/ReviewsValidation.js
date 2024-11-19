export const handleValidationErrors = (inputValues) => {
  const validationErrorMessage = {};
  if (!inputValues.reviewTitle) {
    validationErrorMessage["reviewTitle"] = "Please Enter the Review Title";
  } else if (inputValues.reviewTitle?.length < 10) {
    validationErrorMessage["reviewTitle"] =
      "Review Title should have at least 10 characters";
  }
  if (!inputValues.reviewContent) {
    validationErrorMessage.reviewContent = "Please Enter the Review Content";
  }
  return validationErrorMessage;
};
