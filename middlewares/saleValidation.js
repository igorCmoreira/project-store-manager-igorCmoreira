const { verifyProduct, verifyQuantity } = require('../services/saleVerify');

const idValidation = (req, res, next) => {
const sales = req.body;
for (let i = 0; i < sales.length; i += 1) {
    const { productId } = sales[i];
    if (verifyProduct(productId)) {
      const { code, message } = verifyProduct(productId);
      return res.status(code).send({ message });
    }  
  }

next();
};

const quantityValidation = (req, res, next) => {
  const sales = req.body;

  for (let i = 0; i < sales.length; i += 1) {
    const { quantity } = sales[i];

    if (verifyQuantity(quantity)) {
      const { code, message } = verifyQuantity(quantity);
      return res.status(code).send({ message });
    } 
    }  

  next();
};
module.exports = {
  idValidation,
  quantityValidation,
};