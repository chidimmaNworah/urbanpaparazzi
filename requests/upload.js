import axios from "axios";

export const uploadImages = async (formData) => {
  try {
    const response = await axios.post("/api/cloudinary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images to Cloudinary.");
  }
};
