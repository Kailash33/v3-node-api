exports.modifyResponseBody = function (req, res, next) {
  res.ok = function (data, message) {
    if (message == undefined) {
      message = "";
    }
    res
      .status(200)
      .json({ responseCode: 200, responseMessage: message, results: data });
  };
  res.failed = function (message, error) {
    res.status(200).json({
      responseCode: 200,
      responseMessage: message,
      results: null,
      error: error,
    });
  };
  res.badRequest = function (message) {
    if (message == undefined) {
      message = "Missing Required Field";
    }
    res
      .status(400)
      .json({ responseCode: 400, responseMessage: message, results: null });
  };

  res.unauth = function (error) {
    res.status(403).json({
      responseCode: 403,
      responseMessage: "Invaild Token",
      results: null,
      error: error,
    });
  };
  next();
};
