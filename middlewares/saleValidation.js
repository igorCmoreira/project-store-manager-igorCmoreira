const idValidation = (req, res, next) => {
 const { productId } = req.body[0];
 if (!productId) {
  return res.status(400).send({ message: '"productId" is required' });
 }  
 next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body[0];
  if (!quantity) {
    return res.status(400).send({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(422).send({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};
module.exports = {
  idValidation,
  quantityValidation,
};