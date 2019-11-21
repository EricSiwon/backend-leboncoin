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
    }
  },
  email: {
    type: String,
    default: ""
  }
});

module.exports = Users;
