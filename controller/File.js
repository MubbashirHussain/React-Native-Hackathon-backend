const { SendResponse } = require("../Helpers/HelperFx");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API,
});

let FileControllers = {
  Post: async (req, res) => {
    try {
      let File = req.files.Image;
      if (!File)
        return res
          .status(400)
          .send(SendResponse(false, "File No Found", req.files.Image));
      cloudinary.uploader.upload(File.tempFilePath, function (err, result) {
        if (err) {
          res
            .status(400)
            .send(SendResponse(false, "File Not Upload", req.files.Image));
        }
        res.status(201).send(
          SendResponse(true, "File Successfully Uploaded", {
            url: result.secure_url,
          })
        );
      });
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },

};

module.exports = FileControllers;
