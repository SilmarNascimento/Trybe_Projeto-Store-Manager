const camelize = require('camelize');
const { formattedColumns, formattedPlaceholders } = require('../utils/formattedHeaders');
const connection = require('./connection');

const findAll = async () => {
  const db = 'StoreManager';
  const query = `
  SELECT SP.sale_id, S.date, P.id, SP.quantity
  FROM ${db}.sales_products AS SP INNER JOIN ${db}.products AS P ON SP.product_id = P.id
  INNER JOIN ${db}.sales AS S ON S.id = SP.sale_id
  ORDER BY SP.sale_id, P.id;`;
  const [products] = await connection.execute(query);
  return camelize(products);
};

const findById = async (saleId) => {
  const db = 'StoreManager';
  const query = `
  SELECT SP.sale_id, S.date, P.id, SP.quantity
  FROM ${db}.sales_products AS SP INNER JOIN ${db}.products AS P ON SP.product_id = P.id
  INNER JOIN ${db}.sales AS S ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, P.id;`;
  const [product] = await connection.execute(query, [saleId]);
  return camelize(product);
};

const insert = async (salesArray) => {
  const db = 'StoreManager';
  const query = `INSERT INTO ${db}.sales (date) VALUES (now());`;
  const [{ insertId }] = await connection.execute(query);
  salesArray.forEach(async (sale) => {
    const tableLabel = { saleId: insertId, ...sale };
    const columns = formattedColumns(tableLabel);
    const placeholder = formattedPlaceholders(tableLabel);
    const saleQuery = `INSERT INTO ${db}.sales_products (${columns}) VALUES (${placeholder});`;
    await connection.execute(saleQuery, [insertId, ...Object.values(sale)]);
  });
  return insertId;
};
const deleteById = async (saleId) => {
  const db = 'StoreManager';
  const querySalesProductTable = `
  DELETE FROM ${db}.sales_products
  WHERE sale_id = ?;`;
  const querySalesTable = `
  DELETE FROM ${db}.sales
  WHERE id = ?;`;
  await connection.execute(querySalesProductTable, [saleId]);
  await connection.execute(querySalesTable, [saleId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
};
