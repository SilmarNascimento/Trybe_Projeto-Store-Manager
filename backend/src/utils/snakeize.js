const snakeize = function snakeize(array) {
  return array.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const snakeizedKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      newObj[snakeizedKey] = obj[key];
    });
    return newObj;
  });
};

module.exports = snakeize;