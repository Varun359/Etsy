const userFavorites = require("../schema/userFavoritesModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const search_term = new RegExp(msg.params.search, "i");
  const doc = await userFavorites.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(msg.user.user_id),
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "item",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: {
        path: "$item",
      },
    },
    {
      $match: {
        $or: [
          {
            "item.item_name": search_term,
          },
          {
            "item.item_category": search_term,
          },
          {
            "item.item_desc": search_term,
          },
        ],
      },
    },
  ]);
  console.log(doc);

  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        user_id: item.user._id,
        item_id: item.item._id,
        item_name: item.item.item_name,
        item_price: parseFloat(item.item.item_price),
        item_desc: item.item.item_desc,
        item_quantity: item.item.item_quantity,
        item_category: item.item.item_category,
        item_image: item.item.item_image ? item.item.item_image : null,
        is_favorite: true,
      });
    }
  }

  // console.log(data);
  data = data?.length ? data : "0";
  callback(null, data);
}

exports.handle_request = handle_request;
