const camelize = function camelize(array) {
  return array.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const camelizedKey = key.replace(/[\W_]+(\w|$)/g, (_, match) => match
      .toUpperCase()).replace(/^\w/, (match) => match.toLowerCase());
      newObj[camelizedKey] = obj[key];
    });
    return newObj;
  });
};

module.exports = camelize;