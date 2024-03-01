const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const defaultCloudinaryImages = {
  event:
    "https://res.cloudinary.com/dwigdvgwe/image/upload/v1709214988/siew1cfva3oksjdsruof.jpg",
  user: "https://res.cloudinary.com/dwigdvgwe/image/upload/v1709150661/profile_hxoxnk.webp",
};

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
module.exports = {
  upload,
  deleteImgCloudinary,
  configCloudinary,
  defaultCloudinaryImages,
};
