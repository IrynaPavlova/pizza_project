// const { Router } = require("express");
// // const saveImage = require("./controllers/saveImage");
// // const agregateBodyWithImage = require("../../helpers/agregateBodyWithImage");
// const multer = require("multer");
// const path = require("path");
// const Image = require("./imageSchema");
// //const Product = require("../products/productSchema");

// const storage = multer.diskStorage({
//   destination: "static",
//   filename: function(req, file, cb) {
//     const ext = path.parse(file.originalname).ext;
//     cb(null, Date.now() + ext);
//   }
// });

// const upload = multer({ storage });

// // const { promises: fsPromises } = require('fs');
// // const imagemin = require('imagemin');
// // const imageminJpegtran = require('imagemin-jpegtran');
// // const imageminPngquant = require('imagemin-pngquant');

// // const storage = multer.diskStorage({
// //   destination: 'draft',
// //   filename: function (req, file, cb) {
// //     console.log('file', file);
// //     const ext = path.parse(file.originalname).ext;
// //     cb(null, Date.now() + ext);
// //   }
// // })

// // const upload = multer({ storage });

// // app.post('/form-data', upload.single('file_example'), minifyImage, (req, res, next) => {
// //   console.log('req.file', req.file);
// //   console.log('req.body', req.body);

// //   res.status(200).json(req.file);
// // });

// // async function minifyImage(req, res, next) {
// //   try {
// //     const MINIFIED_DIR = 'static';

// //     await imagemin([req.file.path], {
// //       destination: MINIFIED_DIR,
// //       plugins: [
// //         imageminJpegtran(),
// //         imageminPngquant({
// //           quality: [0.6, 0.8]
// //         })
// //       ]
// //     });

// //     const { filename, path: draftPath } = req.file;

// //     await fsPromises.unlink(draftPath);

// //     req.file = {
// //       ...req.file,
// //       path: path.join(MINIFIED_DIR, filename),
// //       destination: MINIFIED_DIR
// //     };

// //     next();
// //   } catch (err) {
// //     next(err);
// //   }
// // }

// const imageRoute = Router();

// imageRoute.post(
//   "/",
//   //agregateBodyWithImage, saveImage
//   upload.single("file"),
//   async (req, res, next) => {
//     const filePath = req.file.path;
//     function main(bucketName = "pizza_project", filename = `${filePath}`) {
//       const { Storage } = require("@google-cloud/storage");
//       const storage = new Storage({
//         keyFilename: "pizza-275717-24a25e883fb2.json"
//       });

//       async function uploadFile() {
//         const fileInfo = await storage.bucket(bucketName).upload(filename, {
//           gzip: true,
//           metadata: {
//             cacheControl: "public, max-age=31536000"
//           },
//           public: true
//         });

//         //const productId = req.body.productId;
//         const imageUrl = fileInfo.find(elem => {
//           if (elem.mediaLink !== undefined) {
//             return elem.mediaLink;
//           }
//         });

//         const imageData = {
//           file: imageUrl.mediaLink
//         };

//         try {
//           const newImage = new Image(imageData);
//           const ImageToSave = await newImage.save();

//           // const product = await Product.findById(productId);
//           // const productImages = product.images;
//           // productImages.push(imageData.file);

//           // await Product.findOneAndUpdate(
//           //   { _id: ImageToSave.productId },
//           //   { images: imageData.file },
//           //   { new: true }
//           // );

//           res.status(201).json({
//             status: "success",
//             image: ImageToSave
//           });
//         } catch (error) {
//           res.status(400).json({
//             status: "error",
//             message: error.message,
//             text: "image was not saved"
//           });
//         }
//       }
//       uploadFile().catch(console.error);
//     }
//     main(...process.argv.slice(2));
//   }
// );

// module.exports = imageRoute;

////---------------------------------------------------------------////

const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("./imageSchema");

const { promises: fsPromises } = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const Jimp = require("jimp");

const storage = multer.diskStorage({
  destination: "draft",
  filename: function(req, file, cb) {
    if (!file.mimetype.includes("image")) {
      const err = new Error();
      err.status = 400;
      return cb(err);
    }
    //console.log("file", file);
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

const imageRoute = Router();

imageRoute.post(
  "/",
  upload.single("file"),
  compressImage,

  async (req, res, next) => {
    const filePath = req.file.path;
    function main(bucketName = "pizza_project", filename = `${filePath}`) {
      const { Storage } = require("@google-cloud/storage");
      const storage = new Storage({
        keyFilename: "pizza-275717-24a25e883fb2.json"
      });

      async function uploadFile() {
        const fileInfo = await storage.bucket(bucketName).upload(filename, {
          gzip: true,
          metadata: {
            cacheControl: "public, max-age=31536000"
          },
          public: true
        });
        const imageUrl = fileInfo.find(elem => {
          if (elem.mediaLink !== undefined) {
            return elem.mediaLink;
          }
        });

        const imageData = {
          file: imageUrl.mediaLink
        };

        try {
          const newImage = new Image(imageData);
          const ImageToSave = await newImage.save();

          res.status(201).json({
            status: "success",
            image: ImageToSave
          });
        } catch (error) {
          res.status(400).json({
            status: "error",
            message: error.message,
            text: "image was not saved"
          });
        }
      }
      uploadFile().catch(console.error);
    }
    main(...process.argv.slice(2));
  }
);

async function compressImage(req, res, next) {
  try {
    //console.log("req.file", req.file);
    const { path: filePath, filename } = req.file;
    const COMPRESSED_IMAGES_DIST = "static";
    const compressedFilePath = path.join(COMPRESSED_IMAGES_DIST, filename);

    const lenna = await Jimp.read(filePath);
    await lenna
      .resize(1200, Jimp.AUTO) // resize
      .quality(50) // set JPEG quality
      .write(compressedFilePath); // save

    req.file = {
      ...req.file,
      destination: COMPRESSED_IMAGES_DIST,
      path: compressedFilePath
    };
    //console.log("req.file2", req.file);

    await fsPromises.unlink(filePath);

    next();
  } catch (err) {
    next(err);
  }
}

async function minifyImage(req, res, next) {
  try {
    const MINIFIED_DIR = "static";
    console.log("req.file", req.file);
    await imagemin([req.file.path], {
      destination: MINIFIED_DIR,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    const { filename, path: draftPath } = req.file;

    await fsPromises.unlink(draftPath);

    req.file = {
      ...req.file,
      path: path.join(MINIFIED_DIR, filename),
      destination: MINIFIED_DIR
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = imageRoute;
