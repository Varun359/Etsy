const express = require("express");

exports.imageUpload = (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
  var imageName = `${Date.now()}_${req.files.image.name}`;
  req.files.image.mv(`../frontend/images/${imageName}`);
  res.json({
    body: req.body,
    // url: `http://localhost:3001/profile/${imageLocation}`,
    // files: req.files,
  });
};

// module.exports = app1;
