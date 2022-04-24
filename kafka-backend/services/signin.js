var mongo = require("./mongo");

function handle_request(msg, callback) {

   const { email, password } = msg;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email And Password", 400));
  }

  const user = await User.findOne({ email: email, password: password });

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  } else {
    console.log(user);
    jwt.sign(
      { user_id: user._id, email },
      "secret123",
      { expiresIn: "3h" },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        console.log("I am in token");
        console.log(token);

        const data = {
          email: email,
          user_id: user._id,
          first_name: user.first_name,
          shop_name: user.shop_name ? user.shop_name : null,
          // user_image: user.user_image,
          // shop_image: user.shop_image,
          token: token,
          //shops: shops,
        };

        console.log(data);
        res.cookie("cookie", data, {
          maxAge: 9000000,
          httpOnly: false,
          path: "/",
        });
        res.send(data);
      }
    );
  }
}

exports.handle_request = handle_request;
