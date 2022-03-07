const express = require('express');

const { getAll, getById } = require('../models/sales');

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
module.exports = router;