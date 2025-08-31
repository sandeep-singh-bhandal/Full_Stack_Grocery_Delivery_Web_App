import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_CLOUD_NAME,
  });
};
