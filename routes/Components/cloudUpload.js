function cloudupload(obj) {
  console.log("cloudUpload Loaded ==> ", typeof obj);
  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  //Envois fichier cloudinary
  // les différentes clés des fichiers (file1, file2, file3...)
  const files = Object.keys(obj.files);
  if (files.length) {
    const results = {};
    // on parcourt les fichiers
    files.forEach(fileKey => {
      // on utilise les path de chaque fichier (la localisation temporaire du fichier sur le serveur)
      cloudinary.uploader.upload(
        obj.files[fileKey].path,
        {
          // on peut préciser un dossier dans lequel stocker l'image
          folder: "some_folder"
        },
        (error, result) => {
          // on enregistre le résultat dans un objet
          if (error) {
            results[fileKey] = {
              success: false,
              error: error
            };
          } else {
            results[fileKey] = {
              success: true,
              result: result
            };
          }
          if (Object.keys(results).length === files.length) {
            // tous les uploads sont terminés, on peut donc envoyer la réponse au client
            // return res.json(results);
            return results;
          }
        }
      );
    });
  } else {
    res.send("No file uploaded!");
  }

  /*
  //   console.log("obj", Object.keys(obj));
  const files = Object.keys(obj.files);
  if (files.length) {
    // on parcourt les fichiers
    files.forEach(fileKey => {
      console.log("cloudUpload Files ==> ", obj.files[fileKey].path);
    });
  }

  return { picture: "====== maphoto ======" };
  */
}

module.exports = cloudupload;
