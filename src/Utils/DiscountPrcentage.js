export const getProductDiscount = (price, disPrice) => {
  const priceInt = parseInt(price);
  const disPriceInt = parseInt(disPrice);

  if (isNaN(priceInt) || priceInt <= 0) {
    // Return 0 if price is null, 0, or invalid
    return 0;
  }

  const diff = priceInt - disPriceInt;
  const percentage = (diff / priceInt) * 100;
  return Math.ceil(percentage);
};
