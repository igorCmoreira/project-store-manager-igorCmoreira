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

const getByName = async (name) => { 
  const [foundProduct] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name LIKE ?
    `, [name],
);
return foundProduct[0];
};

const create = async (name, quantity) => {
 const foundP = await getByName(name);
 if (!foundP) {
  const [created] = await connection.execute(`
INSERT INTO StoreManager.products (name, quantity) VALUES (? , ?)`, [name, quantity]);
return created;
 }
 return foundP;
 };

module.exports = {
  getAll,
  getById,
  create,
};