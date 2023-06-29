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

module.exports = {
  findAll,
  findById,
};
