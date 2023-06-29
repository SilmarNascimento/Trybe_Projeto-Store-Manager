const snakeize = require('./snakeize');

const formattedColumns = (obj) => (Object.keys(obj)).join(', ');

const obj = {
  name: 'bla',
  age: 22,
};

console.log(formattedColumns(obj));