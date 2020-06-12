const getToken = request =>
  request.body.token ||
  request.query.token ||
  request.headers["x-access-token"] ||
  request.get("Authorization").replace("Bearer ", "");

module.exports = getToken;
