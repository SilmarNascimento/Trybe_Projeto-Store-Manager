const snakeize = require('snakeize');

const formattedColumns = (obj) => Object.keys(snakeize(obj)).join(', ');

const formattedPlaceholders = (obj) => Object.keys(snakeize(obj)).map((_key) => '?').join(', ');

module.exports = {
  formattedColumns,
  formattedPlaceholders,
};
