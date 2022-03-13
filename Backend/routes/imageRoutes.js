const express = require("express");
const { imageUpload } = require("../controllers/imageController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "../frontend/images");
  },
  filename: (req, file, callBack) => {
    console.log(file);
    return callBack(
      null,
      `${path
        .basename(file.originalname)
        .replace(".", "_")
        .replace(" ", "_")}_${file.fieldname}_${Date.now()}_${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
});
router.post(
  "/imageUpload",
  async (req, res, next) => {
    try {
      await upload.single("image");
      next();
    } catch (err) {
      console.log(err);
      res.send("failed!");
    }
  },
  imageUpload
);
module.exports = router;
