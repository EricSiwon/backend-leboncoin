const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Chargement du model
const Users = require("../models/Users");

// Read
router.get("/user", async (req, res) => {
  console.log(req.fields);
  res.json({ Test: "Get Connected" });
});
router.post("/user", async (req, res) => {
  console.log(req.fields);
  console.log(req.query);
  res.json({ Test: "Post Connected" });
});

// Login
router.post("/user/login", async (req, res) => {
  console.log(req.fields);
  console.log(req.query);
  try {
    const user = await Users.findOne({ email: req.fields.email });
    console.log(user); // null no user,
    if (user) {
      if (
        SHA256(req.fields.password + user.salt).toString(encBase64) ===
        user.hash
      ) {
        return res.json({
          _id: user._id,
          token: user.token,
          account: user.account
        });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (e) {
    return res.status(402).json({ message: "An error occurred" });
  }
  // res.json({ token: "AZERTYUIOPMLKJHGFDSQ", account: { username: "Eric" } });
});

// Sign_up
router.post("/user/signup", async (req, res) => {
  console.log(req.fields);
  console.log(req.query);

  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);

  try {
    const newUser = new Users({
      email: req.fields.email,
      token: token,
      salt: salt,
      hash: hash,
      account: {
        username: req.fields.username,
        phone: req.fields.phone
      }
    });
    await newUser.save();
    res.json({
      _id: newUser._id,
      token: newUser.token,
      account: newUser.account
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
