const connection = require('./connection');
const camelize = require('../utils/camelize');
const { formattedColumns, formattedPlaceholders } = require('../utils/formattedHeaders');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return camelize(products);
};

const findById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

const insert = async (data) => {
  const columns = formattedColumns(data);
  console.log(columns);
  const placeholder = formattedPlaceholders(data);
  console.log(placeholder);
  const query = `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholder});`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(data)]);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
