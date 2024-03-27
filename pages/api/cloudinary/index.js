import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
import fileUpload from "express-fileupload";
import { imgMiddleware } from "../../../middleware/imgMiddleware";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const router = createRouter()
  .use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  )
  .use(imgMiddleware);
export const config = {
  api: {
    bodyParser: false,
  },
};
router.post(async (req, res) => {
  try {
    const { path } = req.body || {};
    // let files = Object.values(req.files).flat();
    let file = req.files.file;
    console.log("cloudinary", file);
    // let image = "";
    // for (const file of files) {
    // if (!file || !file.tempFilePath) {
    //   throw new Error("No file uploaded or temporary file path not found.");
    // }
    const img = await uploadToCloudinaryHandler(file, path);
    // image.push(img);
    removeTmp(file.tempFilePath);
    // }
    res.json(img);
    console.log("successfully uploaded image");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.v2.uploader.destroy(image_id, (err, res) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true });
  });
});

const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          console.log(err);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
          public_url: res.public_id,
        });
      }
    );
  });
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router.handler();
