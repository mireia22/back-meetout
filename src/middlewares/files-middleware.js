const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Project-8",
    allowedFormats: ["jpg", "png", "jpeg", "git", "webp"],
  },
});
const upload = multer({ storage });

const deleteImgCloudinary = (imgUrl) => {
  const imgSplitted = imgUrl.split("/");
  const folderName = imgSplitted.at(-2);
  const fileName = imgSplitted.at(-1)?.split(".")[0];

  cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
    console.group("Photo Destroyed");
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
    api_key: process.env.API_KEY,
  });
};
module.exports = { upload, deleteImgCloudinary, configCloudinary };
