const { verifyProduct, verifyQuantity } = require('../services/saleVerify');

const idValidation = (req, res, next) => {
 const { productId } = req.body[0];
 if (!verifyProduct(productId)) {
  next();
 }  
 const { code, message } = verifyProduct(productId);
 return res.status(code).send({ message });
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body[0];
  if (!verifyQuantity(quantity)) {
    next();
  }
  const { code, message } = verifyQuantity(quantity);
  return res.status(code).send({ message });
};
module.exports = {
  idValidation,
  quantityValidation,
};