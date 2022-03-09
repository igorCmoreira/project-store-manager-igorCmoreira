const { verifyName, verifyQuantity, verifyExistence } = require('../services/productVerify');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!verifyName(name)) {
    next();
  }
  const { code, message } = verifyName(name);
  return res.status(code).send({ message });
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (!verifyQuantity(quantity)) {
    next();
  }
  const { code, message } = verifyQuantity(quantity);
  return res.status(code).send({ message });
};
const deleteValidation = async (req, res, next) => {
  const { id } = req.params;
  if (await verifyExistence(id)) {
    const { code, message } = await verifyExistence(id);
    return res.status(code).send({ message });
  }
  next();
};
module.exports = {
  nameValidation,
  quantityValidation,
  deleteValidation,
};