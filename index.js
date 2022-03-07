const express = require('express');

const app = express();
const products = require('./controllers/products');
const sales = require('./controllers/sales');
const error = require('./middlewares/error');

require('dotenv').config();

app.use('/products', products);
app.use('/sales', sales);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
