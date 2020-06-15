const { Router } = require("express");
const saveImage = require("./controllers/saveImage");
const agregateBodyWithImage = require("../../helpers/agregateBodyWithImage");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "static",
  filename: function(req, file, cb) {
    //console.log("file", file);
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// const { promises: fsPromises } = require('fs');
// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');

// const storage = multer.diskStorage({
//   destination: 'draft',
//   filename: function (req, file, cb) {
//     console.log('file', file);
//     const ext = path.parse(file.originalname).ext;
//     cb(null, Date.now() + ext);
//   }
// })

// const upload = multer({ storage });

// app.post('/form-data', upload.single('file_example'), minifyImage, (req, res, next) => {
//   console.log('req.file', req.file);
//   console.log('req.body', req.body);

//   res.status(200).json(req.file);
// });

// async function minifyImage(req, res, next) {
//   try {
//     const MINIFIED_DIR = 'static';

//     await imagemin([req.file.path], {
//       destination: MINIFIED_DIR,
//       plugins: [
//         imageminJpegtran(),
//         imageminPngquant({
//           quality: [0.6, 0.8]
//         })
//       ]
//     });

//     const { filename, path: draftPath } = req.file;

//     await fsPromises.unlink(draftPath);

//     req.file = {
//       ...req.file,
//       path: path.join(MINIFIED_DIR, filename),
//       destination: MINIFIED_DIR
//     };

//     next();
//   } catch (err) {
//     next(err);
//   }
// }

const imageRoute = Router();

imageRoute.post(
  "/",
  //agregateBodyWithImage, saveImage
  upload.single("file"),
  (req, res, next) => {
    const filePath = req.file.path;
    function main(bucketName = "pizza_project", filename = `${filePath}`) {
      const { Storage } = require("@google-cloud/storage");

      // Creates a client
      const storage = new Storage({
        keyFilename: "pizza-275717-24a25e883fb2.json"
      });

      async function uploadFile() {
        // Uploads a local file to the bucket
        const fileInfo = await storage.bucket(bucketName).upload(filename, {
          // Support for HTTP requests made with `Accept-Encoding: gzip`
          gzip: true,
          // By setting the option `destination`, you can change the name of the
          // object you are uploading to a bucket.
          metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: "public, max-age=31536000"
          },
          public: true
        });

        //console.log("fileInfo", fileInfo);

        // fileInfo.find(elem => {
        //   console.log("elem.mediaLink", elem.mediaLink);
        // });

        ///console.log(`${filename} uploaded to ${bucketName}.`);
      }

      uploadFile().catch(console.error);
      // [END storage_upload_file]
    }

    main(...process.argv.slice(2));

    // console.log("req.file", req.file);

    res.status(200).send();
  }
);

module.exports = imageRoute;
