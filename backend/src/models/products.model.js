const camelize = require('camelize');
const connection = require('./connection');
const { formattedColumns, formattedPlaceholders } = require('../utils/formattedHeaders');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return camelize(products);
};

const findById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [productId]);
  return camelize(product);
};

const insert = async (data) => {
  const columns = formattedColumns(data);
  const placeholder = formattedPlaceholders(data);
  const query = `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholder});`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(data)]);
  return insertId;
};

const update = async (productId, productData) => {
  const db = 'StoreManager';
  const columns = Object.keys(productData);
  const values = Object.values(productData);
  const placeholder = columns.map((_key) => '? ').join(', ');
  const query = `
  UPDATE ${db}.products
  SET ${columns} = ${placeholder}
  WHERE id = ?;`;
  await connection.execute(query, [values, productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
