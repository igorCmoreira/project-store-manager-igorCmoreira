const express = require('express');

const { getAll, getById } = require('../models/products');
const { nameValidation, quantityValidation } = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await getAll();
    
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundProduct = await getById(id);
    if (!foundProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    return res.status(200).json(foundProduct);
  } catch (err) {
    next(err);
  }
});

router.post('/', nameValidation, quantityValidation, (req, res, next) => {
  try {
    return res.status(200).send({ message: 'created' });
  } catch (err) {
    next(err);
  }
});
router.put('/', nameValidation, quantityValidation, (req, res, next) => {
  try {
    return res.status(200).send({ message: 'att' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;