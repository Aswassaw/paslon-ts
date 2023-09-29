import { v2 as cloudinary } from "cloudinary";
import * as dottenv from "dotenv";

dottenv.config();

export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const opt = { folder: "paslon" };

    cloudinary.uploader.upload(file.path, opt, function (error, result) {
      if (error) {
        return reject(error);
      }
      return resolve(result.secure_url);
    });
  });
};
