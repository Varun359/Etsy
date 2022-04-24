//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var kafka = require("./kafka/client");
const auth = require("./middlewares/auth");
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/getAllItems", function (req, res) {
  kafka.make_request("getAllItems", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/userProfile", auth, function (req, res) {
  msg = {
    body: req.body,
    user: req.user,
  };
  kafka.make_request("userProfile", msg, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/updateUserProfile", auth, function (req, res) {
  msg = {
    body: req.body,
    user: req.user,
  };
  kafka.make_request("updateUserProfile", msg, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/checkshopName", auth, function (req, res) {
  kafka.make_request("checkShopName", req.body, function (err, results) {
    console.log("in checkShopName");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/changeshopName", auth, function (req, res) {
  msg = {
    body: req.body,
    user: req.user,
  };
  kafka.make_request("changeShopName", msg, function (err, results) {
    console.log("in changeShopName");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/shopItems", auth, function (req, res) {
  msg = {
    body: req.body,
    user: req.user,
  };
  kafka.make_request("shopItems", msg, function (err, results) {
    console.log("in shopItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/shopItems/:user_id", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("getShopItemsById", msg, function (err, results) {
    console.log("in getShopItems by id");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/shopDetails", auth, function (req, res) {
  msg = {
    user: req.user,
  };
  kafka.make_request("getShopDetails", msg, function (err, results) {
    console.log("in getShopDetails");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/shopDetailsById/:user_id", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("getShopDetailsById", msg, function (err, results) {
    console.log("in getShopDetailsById by id");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/createShop", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("createShop", msg, function (err, results) {
    console.log("in create shop");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/allItemsById", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("getAllItemsById", msg, function (err, results) {
    console.log("in get allItemsById");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/favoriteItems", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("getFavoriteItems", msg, function (err, results) {
    console.log("in get favorite Items");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/addFavorites/:item_id", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("addFavorites", msg, function (err, results) {
    console.log("in add favorite Items");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/removeFavorites/:item_id", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("removeFavorites", msg, function (err, results) {
    console.log("in remove favorite Items");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/searchItems/:search", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("searchItems", msg, function (err, results) {
    console.log("in searchItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/searchFavoriteItems/:search", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("searchFavoriteItems", msg, function (err, results) {
    console.log("in favorite searchItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/itemDetails/:item_id", auth, function (req, res) {
  msg = {
    user: req.user,
    params: req.params,
  };
  kafka.make_request("itemDetails", msg, function (err, results) {
    console.log("in item details");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.json({
        results,
      });
      res.end();
    }
  });
});

app.post("/AddToCart", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("addItemToCart", msg, function (err, results) {
    console.log("in addItemToCart");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/CartItems", auth, function (req, res) {
  msg = {
    user: req.user,
  };
  kafka.make_request("getCartItems", msg, function (err, results) {
    console.log("in getCartItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.json({
        results,
      });
      res.end();
    }
  });
});

app.post("/addAllCartItems", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("addMultipleItemsToCart", msg, function (err, results) {
    console.log("in addMultipleItemsToCart");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/addAllCartItems", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("addMultipleItemsToCart", msg, function (err, results) {
    console.log("in addMultipleItemsToCart");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/deleteCartItems", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("deleteCartItems", msg, function (err, results) {
    console.log("in deleteCartItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.post("/purchasingItems", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("purchasingItems", msg, function (err, results) {
    console.log("in purchasingItems");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

app.get("/orders", auth, function (req, res) {
  msg = {
    user: req.user,
    body: req.body,
  };
  kafka.make_request("getPreviousOrders", msg, function (err, results) {
    console.log("in getPreviousOrders");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        results,
      });

      res.end();
    }
  });
});

//start your server on port 4000
app.listen(4000);
console.log("Server Listening on port 4000");
