const express = require('express');
const { productsRoutes } = require('./routes');

const app = express();
app.use(express.json());

app.use('/products', productsRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
