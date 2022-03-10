const express = require('express');

const { nameValidation,
  quantityValidation,
  deleteValidation } = require('./middlewares/productValidation');

const app = express();
const products = require('./controllers/products');
const sales = require('./controllers/sales');
const error = require('./middlewares/error');

require('dotenv').config();

app.use(express.json());

app.get('/products/:id', products.listById);
app.get('/products', products.list);
app.post('/products', nameValidation, quantityValidation, products.addToDB);
app.put('/products/:id', nameValidation, quantityValidation, products.upToDB);
app.delete('/products/:id', deleteValidation, products.delToDB);

app.use('/sales', sales);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
