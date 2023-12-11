import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"; // Import dotenv for environment variable support

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadImage(imageUrl) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl);
    // console.log(result);
    return result;
    // const getLink = result.url;
    // return getLink; // Return the URL if needed
  } catch (error) {
    console.error({ message: "Error uploading image:", error });
    throw error;
  }
}

async function deleteImage(imagePublicId) {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
  } catch (error) {}
}
//ini buat multiple kalau diperlukan
// async function uploadImages(images) {
//   try {
//     const uploadPromises = images.map((image) => uploadImage(image));
//     const results = await Promise.all(uploadPromises);
//     console.log(results);
//     const getLink = result.url;
//     return getLink; // Return the URL if needed
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     throw error;
//   }
// }

//hanya satu upload contoh
// const uploadImageSingle = `${YOUR_DIR_FILE_STRING}`;
// uploadImage(uploadImageSingle);

//lebih dari satu
// const uploadImagesArray = [
//   `${YOUR_DIR_FILE_STRING}`,
//   `${YOUR_DIR_FILE_STRING}`,
// ];

// uploadImages(uploadImagesArray);

export { uploadImage, deleteImage };
