import { createRouter } from "next-connect";
import db from "@/utils/db";
import News from "@/models/News";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    db.connectDb();
    req.body.slug = slugify(req.body.name);
    const newProduct = new News({
      name: req.body.name,
      description: req.body.description,
      post: req.body.post,
      slug: slugify(req.body.name),
      image: req.body.image,
      category: req.body.category,
      subCategories: req.body.subCategories,
    });
    await newProduct.save();
    res.status(200).json({ message: "Post created Successfully." });
    db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(async (req, res) => {
  try {
    const { id } = req.query; // Extract the blog post ID from the request query parameters
    const { name, slug, image, category, post, description } = req.body; // Extract data from the request body

    await db.connectDb();
    const blog = await News.findById(id);

    if (blog) {
      blog.name = name;
      blog.slug = slug;
      blog.image = image;
      blog.category = category;
      blog.post = post;
      blog.description = description;
      await blog.save();
      console.log(blog);
      return res.status(200).json({ message: "Blog Post Updated" });
    } else {
      return res.status(404).json({ message: "Blog Post Not Found" });
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete(async (req, res) => {
  try {
    const { id } = req.body;

    // Connect to the database
    await db.connectDb();

    // Find the product by ID
    const product = await News.findById(id);

    // If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await News.findByIdAndDelete(id);

    // Disconnect from the database
    await db.disconnectDb();

    // Return a success response
    return res.json({ message: "Product has been deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router.handler();
