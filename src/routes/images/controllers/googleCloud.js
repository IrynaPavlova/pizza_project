const path = require("path");
const cwd = path.join(__dirname, "..");

function main(bucketName = "pizza_project", filename = "123.png") {
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

    console.log("fileInfo", fileInfo);

    console.log(`${filename} uploaded to ${bucketName}.`);
  }

  uploadFile().catch(console.error);
}

main(...process.argv.slice(2));
