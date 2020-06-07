const getToken = request =>
  request.body.token ||
  request.query.token ||
  request.headers["x-access-token"];

module.exports = getToken;
