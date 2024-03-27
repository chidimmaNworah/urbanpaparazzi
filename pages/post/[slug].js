import Head from "next/head";
import { useState } from "react";
import { produceWithPatches } from "immer";
import { motion } from "framer-motion";
import styles from "@/styles/product.module.scss";
import db from "@/utils/db";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Reviews from "@/components/productPage/reviews";
import ProductsSwiper from "@/components/breakingNews";
import { useRouter } from "next/router";
import News from "@/models/News";
import MiniNews from "@/components/home/mini";
import Category from "@/models/Category";
import MainPost from "@/components/productPage/mainPost";
import ForCategories from "../../components/breakingNews/ForCategories";
import ForCreators from "@/components/breakingNews/ForCreators";
// import News from "@/models/News";
export default function product({ post, related, news, categories }) {
  const [activeImg, setActiveImg] = useState("");
  console.log(post);

  const country = {
    name: "Nigeria",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/ng.svg",
  };
  return (
    <>
      <Head>
        <tilte>{post.name}</tilte>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.description} />
        <meta property="og:title" content={post.name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={post.slug} />
        <meta property="og:image" content={post.image} />
        <meta property="og:site_name" content="Urban Paparazzi" />
        {/* twitter cards */}
        <meta name="twitter:card" content="summary" />
        {/* <meta name="twitter:site" content="@nailrepublik" />
        <meta name="twitter:creator" content="@kimmoramicky" /> */}
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {post.category.name} / {post.name}
          </div>
          <MiniNews news={news} />
          <div className={styles.product__main}>
            <div className={styles.product__main_one}>
              <MainPost post={post} />
              {/* <p>baby it youuuuuuuuuuuu baby its you uuu</p> */}
            </div>
            <div className={styles.product__main_two}>
              <ForCategories
                categories={categories}
                header="All Categories"
                bg="#379237"
              />
              <ForCreators news={news} header="All Categories" bg="#379237" />
            </div>
          </div>

          {/*
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 px-8 rounded shadow-lg pb-8"
          >
            <Reviews product={product} />
          </motion.div>
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <ProductsSwiper products={related} />
          </motion.div>
           */}
        </div>
      </div>
      <Footer news={news} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const slug = params.slug;
    await db.connectDb();

    // slug post db calling
    let post = await News.findOne({ slug })
      .populate({ path: "category", model: Category })
      .lean();
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
