var Item = require("../schema/itemModel");
var userFavorites = require("../schema/userFavoritesModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside get all elements by id with favs");
  var fav_data = [];
  var un_fav = [];
  const fav_documents = await userFavorites.find({
    user: mongoose.Types.ObjectId(msg.user.user_id),
  });
  let items = [];
  fav_documents.map((doc) => items.push(doc.item.toString()));

  const all_fav = await Item.find().lean();

  if (all_fav.length) {
    for (let doc of all_fav) {
      if (items.includes(doc._id.toString())) {
        fav_data.push({
          user_id: doc.user,
          item_id: doc._id,
          item_name: doc.item_name,
          item_price: parseFloat(doc.item_price),
          item_desc: doc.item_desc,
          item_quantity: doc.item_quantity,
          item_category: doc.item_category,
          item_image: doc.item_image ? doc.item_image : null,
          sales_count: doc.sales_count,
          is_Favorite: true,
          //is_Favorite: items.includes(doc._id.toString()) ? true : false,
        });
      } else {
        un_fav.push({
          user_id: doc.user,
          item_id: doc._id,
          item_name: doc.item_name,
          item_price: parseFloat(doc.item_price),
          item_desc: doc.item_desc,
          item_quantity: doc.item_quantity,
          item_category: doc.item_category,
          item_image: doc.item_image ? doc.item_image : null,
          sales_count: doc.sales_count,
          is_Favorite: false,
          // is_Favorite: items.includes(doc._id.toString()) ? true : false,
        });
      }
    }
  }
  fav_data = [...fav_data, ...un_fav];
  console.log(all_fav);

  callback(null, fav_data);
}
exports.handle_request = handle_request;
