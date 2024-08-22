export const getProductDiscount = (price, disPrice) => {
  const diff = parseInt(price) - parseInt(disPrice);
  const percentage = (diff / parseInt(price)) * 100;
  return Math.ceil(percentage);
};
