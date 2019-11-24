const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//Chargement du model
const Users = require("../models/Users");
const Publish = require("../models/Publish");

router.post("/publish", async (req, res) => {
  //   console.log(req);
  console.log("Route ==> publish fields", req.fields);
  console.log("Route ==> publish query", req.query);
  console.log("Route ==> publish files", req.files);
  console.log(Object.keys(req.files));
  try {
    //
    // Autorization
    //
    // on lit le header authorization
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({
        error: "Missing Authorization Header"
      });
      return;
    }
    // on extrait le token et on vérifie que c'est bien un Bearer
    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        error: "Invalid Authorization Header"
      });
      return;
    }
    const token = parts[1];
    // on cherche l'utilisateur associé a ce token
    const user = await Users.findOne({ token });
    //   console.log(user);
    if (!user) {
      res.status(401).json({
        error: "Invalid Token"
      });
      return;
    }
    //
    //envois fichier vers cloudinary
    //
    const cloudUpload = await cloudinary.uploader.upload(
      req.files.picture.path,
      {
        folder: "leboncoin"
      },
      async (error, result) => {
        if (!error) {
          console.log("cloudinary Result => ", result.secure_url);
          //
          // Register Model  in DB
          //
          const { title, description, price } = req.fields;
          const publish = new Publish({
            title: title,
            description: description,
            price: price,
            creator: {
              account: {
                username: user.account.username,
                phone: user.account.phone
              },
              _id: user._id
            },
            picture_url: result.secure_url
          });
          await publish.save();
          res.status(200).send(publish);
        } else {
          res.status(401).json({
            error: "cloudinary Error"
          });

          console.log("cloudinary Error  => ", error);
          return;
        }
      }
    );
    console.log("cloudUpload", cloudUpload);
  } catch (e) {
    res.status(405).json(e.message);
    console.log("No file uploaded!");
  }
});

module.exports = router;
