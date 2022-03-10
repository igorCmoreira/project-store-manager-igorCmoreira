const { createSaleProduct, createSale } = require('../models/sales');

const formulate = async (sales) => {
  const forCreate = [];
  const saleId = await createSale();
  const data = [];
  let results = {};
  for (let i = 0; i < sales.length; i += 1) {
      const { productId, quantity } = sales[i];
      data.push({ productId, quantity });
      forCreate.push(createSaleProduct(saleId, productId, quantity));
    }
    const created = await Promise.all(forCreate);
    if (created) {
    results = {
       id: saleId,
      itemsSold: data,
    };
    }
    return results;
  };
module.exports = { formulate };