const snakeize = require('./snakeize');

const formattedColumns = (obj) => Object.keys(snakeize(obj)).join(', ');

module.exports = {
  formattedColumns,
};
