import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "chai-aur-backend",
    });

    // file has been uploaded successfully
    // console.log("File has been uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
    return null;
  }
};

const deleteFileFromCloudinary = async (filePath) => {
  try {
    await cloudinary.uploader.destroy(filePath, (result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error?.message);
  }
};

export { uploadOnCloudinary, deleteFileFromCloudinary };
