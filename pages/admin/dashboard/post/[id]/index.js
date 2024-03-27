"use client";

import styles from "@/styles/products.module.scss";
import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Category from "@/models/Category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "@/components/selects/SingularSelect";
import MultipleSelect from "@/components/selects/MultipleSelect";
import AdminInput from "@/components/inputs/adminInput";
import DialogModal from "@/components/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "@/store/DialogSlice";
import Images from "@/components/admin/createProduct/images";
import { validateCreateProduct } from "@/utils/validation";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import DotLoader from "@/components/loaders/dotLoader";
import { useRouter } from "next/router";
import News from "@/models/News";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

let quillFormats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "clean",
];

export default function edit({ parents, categories, post }) {
  const initialState = {
    name: post.name,
    description: post.description,
    image: post.image,
    post: post.post,
    parent: "",
    category: post.category,
    subCategories: [],
  };
  const [product, setProduct] = useState(initialState);
  const [editPost, setEditPost] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id: postId } = router;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    category: Yup.string().required("Please select a category."),
    description: Yup.string().required("Please add a description"),
  });

  const createProductHandler = async () => {
    try {
      setLoading(true);
      if (image) {
        const path = "product images";
        let formData = new FormData();
        formData.append("path", path);
        const imageBlob = dataURItoBlob(image);
        formData.append("file", imageBlob);
        const { response } = await axios.post("/api/cloudinary", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
      }
      setLoading(true);
      const { data } = await axios.put("/api/admin/product", {
        ...product,
        post: editPost || product.post,
        image: image,
      });
      setLoading(false);
      console.log("successful", data);
      toast.success(data.message);
      router.push("/admin/dashboard/product/all");
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <>
      <Layout>
        {loading && <DotLoader loading={loading} />}
        <div className={styles.header}>Create Product</div>
        <DialogModal />
        <Formik
          enableReinitialize
          // initialValues={{
          //   name: product.name,
          //   description: product.description,
          //   category: product.category,
          //   subCategories: product.subCategories,
          //   parent: product.parent,
          //   imageInputFile: "",
          // }}
          validationSchema={validate}
          onSubmit={() => {
            createProductHandler();
          }}
        >
          {(formik) => (
            <Form>
              <Images
                // value={post.image}
                name="imageInputFile"
                header="Post Image"
                text="Add images"
                image={image}
                setImage={setImage}
              />
              <div className={styles.editName}>
                <label className={styles.label}>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    // placeholder={placeholder}
                    value={product.name || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <SingularSelect
                name="category"
                placeholder={product.category.name}
                label="Category"
                data={categories || product.category.name}
                header="Select a Category"
                handleChange={handleChange}
                // disabled={product.category.name}
              />

              <div className={styles.header}>Basic Infos</div>
              <div className={styles.editName}>
                <label className={styles.label}>
                  <span>Description</span>
                  <input
                    type="text"
                    name="description"
                    // placeholder={placeholder}
                    value={product.description || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${styles.quill} h-full`}>
                <label>Post</label>
                <QuillEditor
                  name="post"
                  value={product.post || editPost}
                  onChange={(newValue) => setEditPost(newValue)}
                  modules={quillModules}
                  formats={quillFormats}
                  className="w-full h-[70%] mt-2w bg-white"
                />
              </div>

              <button
                className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
                type="submit"
              >
                Create Product
              </button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { params } = ctx;
    console.log(params);
    const id = params.id;
    await db.connectDb();

    // slug post db calling
    let post = await News.findById(id)
      .populate({ path: "category", model: Category })
      .lean();
    console.log("post", post);
    if (!post) {
      return {
        notFound: true, // Return 404 page if post is not found
      };
    }

    // all post db calling
    let news = await News.find()
      .populate({ path: "category", model: Category })
      .sort({ createdAt: -1 })
      .lean();

    // all categories db calling
    let categories = await Category.find().sort({ createdAt: -1 }).lean();

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        news: JSON.parse(JSON.stringify(news)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        post: null,
        news: null,
        categories: null,
      },
    };
  }
}
