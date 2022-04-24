var connection = new require("./kafka/Connection");
//topics files
//var connectDB = new require("./database/connection");
//var signin = require('./services/signin.js');
const connectDB = require("./database/connection.js");
connectDB();

var userProfile = require("./services/userProfile");
var updateUserProfile = require("./services/updateUserProfile");
var checkShopName = require("./services/checkShopName");
var changeShopName = require("./services/changeShopName");
var shopItems = require("./services/getShopItems");
var getShopItemsById = require("./services/getShopItemsById");
var getShopDetails = require("./services/getShopDetails");
var getShopDetailsById = require("./services/getShopDetailsById");
var createShop = require("./services/createShop");
var getAllItems = require("./services/getAllItems");
var getAllItemsById = require("./services/getAllItemsById");
var getFavoriteItems = require("./services/getFavoriteItems");
var addFavorites = require("./services/addFavorites");
var removeFavorites = require("./services/removeFavorites");
var searchItems = require("./services/searchItems");
var searchFavoriteItems = require("./services/searchFavoriteItems");
var itemDetails = require("./services/itemDetails");
var addItemToCart = require("./services/addItemToCart");
var getCartItems = require("./services/getCartItems");
var deleteCartItems = require("./services/deleteCartItems");
var addMultipleItemsToCart = require("./services/addMultipleItemsToCart");
var purchasingItems = require("./services/purchasingItems");
var getPreviousOrders = require("./services/getPreviousOrders");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  console.log("here in the ----------------------------", fname);
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    //console.log("=========", fname);
    fname.handle_request(data.data, function (err, res) {
      console.log("after handle im inside -----------------" + fname);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book", Books);
handleTopicRequest("getAllItems", getAllItems);
handleTopicRequest("userProfile", userProfile);
handleTopicRequest("updateUserProfile", updateUserProfile);
handleTopicRequest("checkShopName", checkShopName);
handleTopicRequest("changeShopName", changeShopName);
handleTopicRequest("shopItems", shopItems);
handleTopicRequest("getShopItemsById", getShopItemsById);
handleTopicRequest("getShopDetails", getShopDetails);
handleTopicRequest("getShopDetailsById", getShopDetailsById);
handleTopicRequest("createShop", createShop);
handleTopicRequest("getAllItemsById", getAllItemsById);
handleTopicRequest("getFavoriteItems", getFavoriteItems);
handleTopicRequest("addFavorites", addFavorites);
handleTopicRequest("removeFavorites", removeFavorites);
handleTopicRequest("searchItems", searchItems);
handleTopicRequest("searchFavoriteItems", searchFavoriteItems);
handleTopicRequest("itemDetails", itemDetails);
handleTopicRequest("addItemToCart", addItemToCart);
handleTopicRequest("getCartItems", getCartItems);
handleTopicRequest("addMultipleItemsToCart", addMultipleItemsToCart);
handleTopicRequest("deleteCartItems", deleteCartItems);
handleTopicRequest("purchasingItems", purchasingItems);
handleTopicRequest("getPreviousOrders", getPreviousOrders);
