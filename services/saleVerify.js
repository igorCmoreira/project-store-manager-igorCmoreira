const verifyProduct = (productId) => {
  if (!productId) {
    return { code: 400, message: '"productId" is required' };
  }
};
const verifyQuantity = (quantity) => {
  if (!quantity) {
    return { code: 400, message: '"quantity" is required' };
  }
  if (quantity < 1) {
    return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  }
};
module.exports = { verifyProduct, verifyQuantity };