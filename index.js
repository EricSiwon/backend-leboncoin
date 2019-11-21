require("dotenv").config();

const express = require("express"); // Web Server
const mongoose = require("mongoose"); // Dadabase
const formidable = require("express-formidable"); // Parcing requeste (req.fields)
const cors = require("cors"); // Browser autorisation
const cloudinary = require("cloudinary").v2; // Cloud images

const app = express(); // Créer le serveur
app.use(formidable()); // Activer formidable

app.use(cors()); // Activer cors pour accepte toutes les connexions browser

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./models/Users");
// require("./models/Offers");

const userRoutes = require("./routes/user");
// const offerRoutes = require("./routes/offer");

// Active Routes
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Starter :", process.env.PORT);
});
