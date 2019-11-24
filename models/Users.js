const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  token: {
    type: String,
    default: ""
  },
  account: {
    username: {
      type: String,
      default: ""
    },
    phone: {
      type: Number,
      default: "00"
    }
  },
  email: {
    type: String,
    default: ""
  },
  salt: {
    type: String,
    default: ""
  },
  hash: {
    type: String,
    default: ""
  }
});

module.exports = Users;
