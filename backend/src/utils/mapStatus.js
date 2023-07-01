const mapStatus = (string) => {
  const statusObject = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_VALUE: 422,
  };
  return statusObject[string] || 500;
};

module.exports = {
  mapStatus,
};