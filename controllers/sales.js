const express = require('express');

const { getAll, getById } = require('../models/sales');
const { idValidation, quantityValidation } = require('../middlewares/saleValidation');
const { formulate, formulateUpdate } = require('../services/saleFormulate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const sales = await getAll();
    
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundSale = await getById(id);
    if (!foundSale[0]) {
      return res.status(404).send({ message: 'Sale not found' });
    }
    return res.status(200).json(foundSale);
  } catch (err) {
    next(err);
  }
});

router.post('/', idValidation, quantityValidation, async (req, res, next) => {
  try {
    const sales = req.body;
    const saleCreated = await formulate(sales);
    if (saleCreated) {
      return res.status(201).json(saleCreated);
    }
    return res.status(501).end();
  } catch (err) {
    next(err);
  }
});
router.put('/:id', idValidation, quantityValidation, async (req, res, next) => {
  try {
    const [updates] = req.body;
    const { id } = req.params;
   const updated = await formulateUpdate(updates, id);
   return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;