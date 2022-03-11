const { verifyName, verifyQuantity, verifyExistence } = require('../services/productVerify');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const valid = verifyName(name);
  if (valid) {
    const { code, message } = valid;
    return res.status(code).send({ message });
  }
  next();
};

const quantityValidationP = (req, res, next) => {
  const { quantity } = req.body;
  const valid = verifyQuantity(quantity);
  if (valid) {
    const { code, message } = verifyQuantity(quantity);
    return res.status(code).send({ message });
  }
  next();
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
  quantityValidationP,
  deleteValidation,
};