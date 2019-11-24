/*
//Middleware
const authenticate = async (req, res, next) => {
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
  return next();
};
*/

// const cloudupload = require("./Components/cloudUpload");
//Envois fichier cloudinary
//   const resultUpload = cloudupload(req);

//   console.log("cloudUpload Result ===> ", resultUpload);


const results = {};
  //Envois fichier cloudinary
  // les différentes clés des fichiers (file1, file2, file3...)
  const files = Object.keys(req.files);
  if (files.length) {
    // on parcourt les fichiers
    files.forEach(fileKey => {
      // on utilise les path de chaque fichier (la localisation temporaire du fichier sur le serveur)
      cloudinary.uploader.upload(
        req.files[fileKey].path,
        {
          // on peut préciser un dossier dans lequel stocker l'image
          folder: "leboncoin"
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
            console.log(results);
            console.log(results.file.result.secure_url);
            // { file:
            //     { success: true,
            //       result:
            //        { public_id: 'some_folder/g2kngfdasvj6fi0ojqe0',
            //          version: 1574464637,
            //          signature: '76fe56731991d95582f22a9108bbe78605cbd0e6',
            //          width: 276,
            //          height: 183,
            //          format: 'png',
            //          resource_type: 'image',
            //          created_at: '2019-11-22T23:17:17Z',
            //          tags: [],
            //          bytes: 5927,
            //          type: 'upload',
            //          etag: 'cbd59e9dbf3b0bf49b29545068f2c7e4',
            //          placeholder: false,
            //          url:
            //           'http://res.cloudinary.com/projectesi1/image/upload/v1574464637/some_folder/g2kngfdasvj6fi0ojqe0.png',
            //          secure_url:
            //           'https://res.cloudinary.com/projectesi1/image/upload/v1574464637/some_folder/g2kngfdasvj6fi0ojqe0.png',
            //          original_filename: 'upload_272e6b7f0f63d7933e4dc0f3e9c0d2af' } } }
            return results;
          }
        }
      );
    });
  } else {
    res.send("No file uploaded!");
  }

  /*
  cloudinary Result =>  { public_id: 'leboncoin/flvyk3tsa05cpgcrvlce',
  version: 1574554490,
  signature: 'e3516d5557b84a689b8fc722723e9accc9dc3f13',
  width: 276,
  height: 183,
  format: 'png',
  resource_type: 'image',
  created_at: '2019-11-24T00:14:50Z',
  tags: [],
  bytes: 5927,
  type: 'upload',
  etag: 'cbd59e9dbf3b0bf49b29545068f2c7e4',
  placeholder: false,
  url:
   'http://res.cloudinary.com/projectesi1/image/upload/v1574554490/leboncoin/flvyk3tsa05cpgcrvlce.png',
  secure_url:
   'https://res.cloudinary.com/projectesi1/image/upload/v1574554490/leboncoin/flvyk3tsa05cpgcrvlce.png',
  original_filename: 'upload_1b28cee824e8152ce3d2798b2c60c61a' }
cloudUpload { public_id: 'leboncoin/flvyk3tsa05cpgcrvlce',
  version: 1574554490,
  signature: 'e3516d5557b84a689b8fc722723e9accc9dc3f13',
  width: 276,
  height: 183,
  format: 'png',
  resource_type: 'image',
  created_at: '2019-11-24T00:14:50Z',
  tags: [],
  bytes: 5927,
  type: 'upload',
  etag: 'cbd59e9dbf3b0bf49b29545068f2c7e4',
  placeholder: false,
  url:
   'http://res.cloudinary.com/projectesi1/image/upload/v1574554490/leboncoin/flvyk3tsa05cpgcrvlce.png',
  secure_url:
   'https://res.cloudinary.com/projectesi1/image/upload/v1574554490/leboncoin/flvyk3tsa05cpgcrvlce.png',
  original_filename: 'upload_1b28cee824e8152ce3d2798b2c60c61a' }

  Finale:
  cloudinary Result =>  https://res.cloudinary.com/projectesi1/image/upload/v1574555002/leboncoin/yy0rx495mhyyq4hfbqzt.png
  cloudUpload { public_id: 'leboncoin/yy0rx495mhyyq4hfbqzt',
  version: 1574555002,
  signature: 'd11ae9f9bd9b9c638785d359208a833aa629693a',
  width: 276,
  height: 183,
  format: 'png',
  resource_type: 'image',
  created_at: '2019-11-24T00:23:22Z',
  tags: [],
  bytes: 5927,
  type: 'upload',
  etag: 'cbd59e9dbf3b0bf49b29545068f2c7e4',
  placeholder: false,
  url:
   'http://res.cloudinary.com/projectesi1/image/upload/v1574555002/leboncoin/yy0rx495mhyyq4hfbqzt.png',
  secure_url:
   'https://res.cloudinary.com/projectesi1/image/upload/v1574555002/leboncoin/yy0rx495mhyyq4hfbqzt.png',
  original_filename: 'upload_17e5da6182777ff344c9e23bab3ccf4a' }


  */
  

  // si on a trouvé l'utilisateur on peut ajouter une annonce
  const { title, description, price } = req.fields;
  const publish = new Publish({
    title: title,
    description: description,
    price: price,
    creator: {
      account: { username: user.account.username, phone: user.account.phone },
      _id: user._id
    },
    picture_url: results.file.result.secure_url
  });
  //   console.log(publish);
  await publish.save();
  res.status(200).send(publish);
});


