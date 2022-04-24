const Order = require("../schema/orderModel");
const Purchase = require("../schema/purchasesModel");
const Cart = require("../schema/cartModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  //console.log(msg.body);
  console.log("Purchashing the Items in the cart");
  const doc1 = await Order.create({ date: msg.body.dateOfPurchase });

  if (doc1) {
    let items = [];
    for (let item of msg.body.items) {
      if (item.quantity != 0)
        items.push({
          order: doc1._id,
          item: mongoose.Types.ObjectId(item.item_id),
          user: mongoose.Types.ObjectId(msg.user.user_id),
          quantity_buyed: item.quantity,
          gift: item.gift ? item.gift : null,
          price_buyed: parseFloat(item.quantity * item.item_price),
          shop_name: item.shop_name,
          item_name: item.item_name,
          item_image: item.item_image,
        });
    }
    let purchaseDocuments = await Purchase.insertMany(items);

    //Removing quantity purchased from the items.
    for (let item of msg.body.items) {
      if (item.quantity != 0) {
        let itemDocument = await Item.find({
          _id: mongoose.Types.ObjectId(item.item_id),
        });

        //console.log(itemDocument);
        // if (itemDocument) {
        itemDocument[0].item_quantity =
          itemDocument[0].item_quantity - parseInt(item.quantity);
        await itemDocument[0].save();
        // }
      }
    }

    let deletedCart = await Cart.deleteMany({
      user: mongoose.Types.ObjectId(msg.user.user_id),
    });

    msg = {
      sent: "success!!!!! Item Added to purchases",
    };
    console.log(items);
    callback(null, items);
  }
}

exports.handle_request = handle_request;
