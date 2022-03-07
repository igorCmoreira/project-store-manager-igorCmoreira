const connection = require('./connection');

const getAll = async () => { 
  const [dataSales] = await connection.execute(
  `SELECT salesp.sale_id, sales.date, salesp.product_id, salesp.quantity
  FROM StoreManager.sales as sales
  INNER JOIN StoreManager.sales_products as salesp
  ON sales.id = salesp.sale_id;`,
  ); 

  const sales = dataSales.map((s) => ({ 
      saleId: s.sale_id,
      date: s.date,
      productId: s.product_id,
      quantity: s.quantity,
    }));

return sales;
};
const getById = async (id) => {
  const [foundDataSale] = await connection.execute(
    `SELECT salesp.sale_id, sales.date, salesp.product_id, salesp.quantity
    FROM StoreManager.sales as sales
    INNER JOIN StoreManager.sales_products as salesp
    ON sales.id = ? AND sales.id = salesp.sale_id
    ORDER BY sale_id AND product_id;
    `, [id],
);
const foundSale = foundDataSale.map((s) => ({ 
  date: s.date,
  productId: s.product_id,
  quantity: s.quantity,
}));
return foundSale;
};
module.exports = {
  getAll,
  getById,
};