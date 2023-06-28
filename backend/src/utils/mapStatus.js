const mapStatus = (string) => {
  const statusObject = {
    SUCCESSFUL: 200,
    NOT_FOUND: 404,
  };
  return statusObject[string] || 500;
};

module.exports = {
  mapStatus,
};