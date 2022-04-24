const JwtStrategy = require("passport-jwt").Strategy;
//const Member = require("../models/Member");

var cookieExtractor = function (req) {
  const token = req.header("auth-token");
  return token;
};

module.exports = (passport) => {
  var opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: "secret123",
    passReqToCallback: true,
  };
  passport.use(
    new JwtStrategy(opts, (req, jwt_payload, callback) => {
      req.user = jwt_payload;
      callback(null, req.user);
    })
  );
};
