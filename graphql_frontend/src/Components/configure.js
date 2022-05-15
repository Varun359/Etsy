import aws from "aws-sdk";

const config = {
  bucketName: "etsyimages",
  region: "us-west-1",
  accessKeyId: "AKIAZSRVTBBNQHCHG6FK",
  secretAccessKey: "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",
  signatureVersion: "v4",
};

export const bucketName = config.bucketName;

export const s3 = new aws.S3({
  region: config.region,
  signatureVersion: config.signatureVersion,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  Bucket: config.Bucket,
});
