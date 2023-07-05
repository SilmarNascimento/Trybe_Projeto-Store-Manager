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

const findByQuery = async (q) => {
  const db = 'StoreManager';
  const preparedStatement = `%${q}%`;
  const query = `SELECT * FROM ${db}.products WHERE name LIKE ?;`;
  const productsByQuery = await connection.execute(query, [preparedStatement]);
  if (productsByQuery) {
    return camelize(productsByQuery[0]);
  }
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
  const values = Object.values(productData);
  const query = `
  UPDATE ${db}.products
  SET name = ?
  WHERE id = ?;`;
  const [{ affectedRows }] = await connection.execute(query, [...values, productId]);
  return affectedRows;
};

const deleteById = async (productId) => {
  const db = 'StoreManager';
  const query = `DELETE FROM ${db}.products WHERE id = ?;`;
  const [{ affectedRows }] = await connection.execute(query, [productId]);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
  findByQuery,
};
