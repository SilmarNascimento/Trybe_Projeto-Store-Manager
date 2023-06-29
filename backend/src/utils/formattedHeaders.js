const snakeize = require('./snakeize');

const formattedColumns = (obj) => (Object.keys(obj)).join(', ');

const formattedPlaceholders = (obj) => snakeize(Object.keys(obj)).map((_key) => '?').join(', ');

module.exports = {
  formattedColumns,
  formattedPlaceholders,
};
