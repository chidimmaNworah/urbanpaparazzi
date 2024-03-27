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
// import ImageResize from "quill-image-resize-module-react";
// import { Quill } from "react-quill";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

// Quill.register("modules/imageResize", ImageResize);

// const insertImageFromURL = (quill, imageURL) => {
//   const range = quill.getSelection();
//   const delta = {
//     ops: [
//       {
//         insert: {
//           image: imageURL,
//         },
//       },
//     ],
//   };
//   quill.updateContents(delta);
//   quill.setSelection(range.index + 1, range.length);
// };

// // Register the custom function as a Quill module
// Quill.register("modules/imageUpload", function (quill, options) {
//   const toolbar = quill.getModule("toolbar");
//   toolbar.addHandler("image", () => {
//     const imageURL = prompt("Enter the URL of the image:");
//     if (imageURL) {
//       insertImageFromURL(quill, imageURL);
//     }
//   });
// });

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

  // imageUpload: true,
  // imageResize: {
  //   parchment: Quill.import("parchment"),
  //   modules: ["Resize", "DisplaySize"],
  // },
};

const quillFormats = [
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

const initialState = {
  name: "",
  description: "",
  image: "",
  parent: "",
  category: "",
  subCategories: [],
};

export default function create({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [post, setPost] = useState("");

  useEffect(() => {
    const getParentData = async () => {
      if (product.parent) {
        try {
          const { data } = await axios.get(`/api/product/${product.parent}`);
          if (data) {
            setProduct({
              ...product,
              name: data.name,
              description: data.description,
              category: data.category,
              subCategories: data.subCategories,
            });
          }
        } catch (error) {
          console.error("Error fetching parent data:", error);
          // Handle error appropriately
        }
      }
    };

    getParentData();
  }, [product.parent]);

  // useEffect(() => {
  //   async function getSubs() {
  //     const { data } = await axios.get("/api/admin/subCategory", {
  //       params: {
  //         category: product.category,
  //       },
  //     });
  //     // console.log(data);
  //     setSubs(data);
  //   }
  //   getSubs();
  // }, [product.category]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // const handleChange = (name, value) => {
  //   setProduct({ ...product, [name]: value });
  // };

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    category: Yup.string().required("Please select a category."),
    description: Yup.string().required("Please add a description"),
  });
  // const createProduct = async () => {
  //   let test = validateCreateProduct(product, image);
  //   if (test == "valid") {
  //     createProductHandler();
  //     // setLoading(false);
  //     // toast.success("uploaded sucessfully");
  //     // setProduct({});
  //   } else {
  //     dispatch(
  //       showDialog({
  //         header: "Please follow our instructions.",
  //         msgs: test,
  //       })
  //     );
  //   }
  // };

  const createProductHandler = async () => {
    try {
      setLoading(true);
      let uploaded_image = "";

      if (image) {
        const path = "product images";
        let formData = new FormData();
        formData.append("path", path);
        const imageBlob = dataURItoBlob(image);
        formData.append("file", imageBlob);
        // const response = await uploadImages(formData);
        // console.log(response);
        // uploaded_image = response;
        const { response } = await axios.post("/api/cloudinary", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
      }

      setLoading(true);
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        post: post,
        image: image,
      });
      setLoading(false);
      console.log("successful", data);
      toast.success(data.message);
      // setProduct({});
      // router.push("/admin/dashboard/product/all");
      router.push("/admin/dashboard/post/all");
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
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            subCategories: product.subCategories,
            parent: product.parent,
            imageInputFile: "",
          }}
          validationSchema={validate}
          onSubmit={() => {
            createProductHandler();
          }}
        >
          {(formik) => (
            <Form>
              <Images
                name="imageInputFile"
                header="Post Image"
                text="Add images"
                image={image}
                setImage={setImage}
              />
              <AdminInput
                type="text"
                label="Name"
                name="name"
                placholder="Post name"
                onChange={handleChange}
              />
              {/* <AdminInput
                type="text"
                label="Post"
                name="post"
                placholder="Post story"
                onChange={handleChange}
              /> */}
              <SingularSelect
                name="category"
                value={product.category}
                placeholder="Category"
                data={categories}
                header="Select a Category"
                handleChange={handleChange}
                disabled={product.parent}
              />
              {/* {product.category && (
                <MultipleSelect
                  value={product.subCategories}
                  data={subs}
                  header="Select SubCategories"
                  name="subCategories"
                  disabled={product.parent}
                  handleChange={handleChange}
                />
              )} */}
              <div className={styles.header}>Basic Infos</div>

              <AdminInput
                type="text"
                label="Description"
                name="description"
                placholder="Post description"
                onChange={handleChange}
              />
              <div className={`${styles.quill} h-full`}>
                {/* <input
                  type="text"
                  name="description"
                  label="description"
                  placeholder="Post Description"
                  onChange={handleChange}
                /> */}
                <label>Post</label>
                <QuillEditor
                  name="post"
                  value={post}
                  onChange={(newValue) => setPost(newValue)}
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
  await db.connectDb();
  const results = await News.find().select("name").lean();
  const categories = await Category.find().lean();
  // db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
