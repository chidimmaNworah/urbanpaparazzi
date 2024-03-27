import axios from "axios";

export const uploadImages = async (formData) => {
  try {
    const response = await axios.post("/api/cloudinary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image to Cloudinary.");
  }
};
