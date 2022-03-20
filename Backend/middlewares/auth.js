const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("hi auth");
  console.log(req.header("auth-token"));
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ msg: "No Token - Authorization Denied" });
  }

  try {
    const verified = jwt.verify(token, "secret123");
    if (!verified) {
      return res
        .status(401)
        .send({ msg: "Cannot Verify - Authorization Denied" });
    }
    console.log("Verified value: ", verified);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send({ msg: err });
  }
};
