const connection = require('./connection');

const getAll = async () => { 
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;'); 
return products;
};

const getById = async (id) => {
  const [foundProduct] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ?
    `, [id],
);
return foundProduct[0];
};

module.exports = {
  getAll,
  getById,
};