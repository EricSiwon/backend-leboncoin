const mongoose = require("mongoose");

const Publish = mongoose.model("Publish", {
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: "" },
  picture_url: { type: String, default: "" },
  date_created: { type: Date, default: Date.now },
  creator: Object
});

module.exports = Publish;
