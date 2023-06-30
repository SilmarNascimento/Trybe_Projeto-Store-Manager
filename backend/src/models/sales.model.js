const { formattedColumns, formattedPlaceholders } = require('../utils/formattedHeaders');
const connection = require('./connection');

const findAll = async () => {
  const db = 'StoreManager';
  const query = `
  SELECT SP.sale_id AS saleId, S.date, P.id AS productId, SP.quantity
  FROM ${db}.sales_products AS SP INNER JOIN ${db}.products AS P ON SP.product_id = P.id
  INNER JOIN ${db}.sales AS S ON S.id = SP.sale_id
  ORDER BY SP.sale_id, P.id;`;
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (productId) => {
  const db = 'StoreManager';
  const query = `
  SELECT SP.sale_id AS saleId, S.date, P.id AS productId, SP.quantity
  FROM ${db}.sales_products AS SP INNER JOIN ${db}.products AS P ON SP.product_id = P.id
  INNER JOIN ${db}.sales AS S ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, P.id;`;
  const [product] = await connection.execute(query, [productId]);
  return product;
};

const insert = async (salesArray) => {
  const db = 'StoreManager';
  const query = `INSERT INTO ${db}.sales (date) VALUES (now());`;
  const [{ insertId }] = await connection.execute(query);
  const [affectedRows] = salesArray.map(async (sale) => {
    const tableLabel = { saleId: insertId, ...sale };
    const columns = formattedColumns(tableLabel);
    const placeholder = formattedPlaceholders(tableLabel);
    const saleQuery = `INSERT INTO ${db}.sales_products (${columns}) VALUES (${placeholder});`;
    const [responseObj] = await connection.execute(saleQuery, [insertId, ...Object.values(sale)]);
    return responseObj.insertId;
  });
  console.log(affectedRows);
};

module.exports = {
  findAll,
  findById,
  insert,
};
