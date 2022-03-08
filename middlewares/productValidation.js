const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: '"name" is required' });
  }
  if (name.length <= 5) {
    return res.status(422).send({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).send({ message: '"quantity" is required' });
  }
  if (quantity < 1) {
    return res.status(422).send({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};
module.exports = {
  nameValidation,
  quantityValidation,
};