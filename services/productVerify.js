const { getById } = require('../models/products');

const verifyName = (name) => {
  if (!name) {
    return { code: 400, message: '"name" is required' };
  }
  if (name.length <= 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
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

const verifyExistence = async (id) => {
  if (!await getById(id)) {
    return { code: 404, message: 'Product not found' };
  }
};

module.exports = {
  verifyName,
  verifyQuantity,
  verifyExistence,
};