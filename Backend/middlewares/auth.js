const jwt = require("jsonwebtoken");

module.exports = (res, req, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ msg: "No Token - Authorization Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .send({ msg: "Cannot Verify - Authorization Denied" });
    }
    console.log("Verified value: ", verified);
    next();
  } catch (err) {
    res.status(401).send({ msg: err });
  }
};
