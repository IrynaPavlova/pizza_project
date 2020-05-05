const formidable = require("formidable");

const agregateBodyWithImage = (request, response, next) => {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "../../../static"
  });
  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    request.body = {
      ...fields,
      ...files
    };

    next();
  });
};

module.exports = agregateBodyWithImage;
