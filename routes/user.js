const express = require("express");
const router = express.Router();

//Chargement du model
const Users = require("../models/Users");

// Read
router.get("/user", async (req, res) => {
  console.log(req.fields);
  res.json({ Test: "Get Connected" });
});
router.post("/user", async (req, res) => {
    console.log(req.fields);
    res.json({ Test: "Post Connected" });
  });

module.exports = router;
