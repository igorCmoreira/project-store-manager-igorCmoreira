const { getAll, getById, getByName, create, update, del } = require('../models/products');

const list = ('/', async (req, res, next) => {
  try {
    const products = await getAll();
    
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
const listById = ('/', async (req, res, next) => {
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

const addToDB = ('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const created = await create(name, quantity);
    if (!created.insertId) {
      return res.status(409).send({ message: 'Product already exists' });
    }
    return res.status(201).json(await getById(created.insertId));
  } catch (err) {
    next(err);
  }
});
const upToDB = ('/', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updated = await update(name, quantity, id);
    if (!updated) {
      return res.status(404).send({ message: 'Product not found' });
    }
    return res.status(200).json(await getByName(name));
  } catch (err) {
    next(err);
  }
});

const delToDB = ('/', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await del(id);
    if (!deleted) {
      return res.status(501).end();
    }
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = { 
  list,
  listById,
  addToDB,
  delToDB,
  upToDB,
 };