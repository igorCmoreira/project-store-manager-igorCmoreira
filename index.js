const express = require('express');

const { nameValidation,
  quantityValidationP,
  deleteValidation } = require('./middlewares/productValidation');
  const { idValidation, quantityValidation } = require('./middlewares/saleValidation');

const app = express();
const products = require('./controllers/products');
const sales = require('./controllers/sales');
const error = require('./middlewares/error');

require('dotenv').config();

app.use(express.json());

app.get('/products/:id', products.listById);
app.get('/products', products.list);
app.post('/products', nameValidation, quantityValidationP, products.addToDB);
app.put('/products/:id', nameValidation, quantityValidationP, products.upToDB);
app.delete('/products/:id', deleteValidation, products.delToDB);

app.get('/sales/:id', sales.listById);
app.get('/sales', sales.list);
app.post('/sales', idValidation, quantityValidation, sales.addToDB);
app.put('/sales/:id', idValidation, quantityValidation, sales.upToDB);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
