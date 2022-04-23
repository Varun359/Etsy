const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accesskeyId: "AKIAZSRVTBBNQ4X6YQX7",
  secretAccessKey: "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",
  region: "us-west-1",
});

// const s3 = new aws.S3({
//   accessKeyId: "AKIAZSRVTBBNQHCHG6FK",
//   secretAccessKey: "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",
//   region: "us-west-1",
// });

const uploadS3 = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      acl: "public-read",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${Date.now()}_${req.files.UserImage.name}`);
      },
    }),
  });

module.exports = uploadS3;
