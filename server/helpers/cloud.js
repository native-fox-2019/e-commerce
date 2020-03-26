const path = require("path");
const { Storage } = require("@google-cloud/storage");
const unggah = require("unggah");

const storage = unggah.gcs({
  keyFilename: "../Kolokal-8e26cc668555.json",
  bucketName: "tokolokal",
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`;
  }
});

const upload = unggah({
  limits: {
    fileSize: 1e15
  },
  storage: storage
});

module.exports = upload;
