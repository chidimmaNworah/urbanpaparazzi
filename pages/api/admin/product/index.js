import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/News";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    db.connectDb();
    if (req.body.parent) {
      const parent = await Product.findById(req.body.parent);
      if (!parent) {
        return res.status(400).json({
          message: "Parent product not found !",
        });
      } else {
        const newParent = await parent.updateOne(
          {
            $push: {
              subProducts: {
                sku: req.body.sku,
                color: req.body.color,
                images: req.body.images,
                sizes: req.body.sizes,
                discount: req.body.discount,
              },
            },
          },
          { new: true }
        );
      }
    } else {
      req.body.slug = slugify(req.body.name);
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        questions: req.body.questions,
        slug: req.body.slug,
        category: req.body.category,
        subCategories: req.body.subCategories,
        subProducts: [
          {
            sku: req.body.sku,
            color: req.body.color,
            images: req.body.images,
            sizes: req.body.sizes,
            discount: req.body.discount,
          },
        ],
      });
      await newProduct.save();
      res.status(200).json({ message: "Product created Successfully." });
    }
    db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  try {
    const { id, productId } = req.body;

    db.connectDb();

    // Find the parent product by ID
    const product = await Product.findById(productId);

    // If the parent product is not found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Parent product not found" });
    }

    // Filter out the sub-product with the specified ID
    product.subProducts = product.subProducts.filter(
      (subProduct) => subProduct._id.toString() !== id
    );

    // If there are no more sub-products left, delete the parent product as well
    if (product.subProducts.length < 1) {
      await Product.findByIdAndDelete(productId);
      return res.json({
        message:
          "Parent product has been deleted as there are no more sub-products",
      });
    }

    // Save the updated parent product
    await product.save();

    db.disconnectDb();

    // Return a success response
    return res.json({
      message: "Sub-product has been deleted successfully",
      product: product, // Optionally return the updated parent product
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
