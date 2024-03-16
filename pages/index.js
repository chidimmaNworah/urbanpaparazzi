import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
// import Category from "@/components/home/category";
import Category from "../models/Category";
import { useMediaQuery } from "react-responsive";
import db from "@/utils/db";
import News from "@/models/News";
import MiniNews from "@/components/home/mini";
import HeroNews from "@/components/home/hero";
import BreakingNews from "@/components/breakingNews";

export default function Home({ country, news, categories }) {
  // console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });

  return (
    <div>
      <Head>
        <tilte>Urban Paparazzi Nigeria</tilte>
        <meta name="description" content="Urban Paparazzi Nigeria" />
        <meta name="keywords" content="Urban Paparazzi Nigeria" />
        <meta property="og:title" content="Urban Paparazzi Nigeria" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shop.nailsrepublic.co" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="Urban Paparazzi Nigeria" />
        {/* twitter cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nailrepublik" />
        <meta name="twitter:creator" content="@kimmoramicky" />
      </Head>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <MiniNews news={news} />
          <div className={styles.container__width}>
            <HeroNews news={news} />
          </div>
          <BreakingNews news={news} categories={categories} />
          {/* Fasion and accessories */}
          {/* <ForCreators
            products={products}
            headers="Unique & Stylish"
            bg="#ca4987"
          /> */}
          {/* <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          > */}
          {/* <ForCreators
              products={products}
              header="Unique & Stylish"
              bg="#ca4987"
            />{" "} */}
          {/* treatment and nail art */}
          {/* </motion.div> */}
          {/* </motion.div> */}
          {/* <div className={styles.products}>
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div> */}
        </div>
      </div>
      <Footer country={country} news={news} />
    </div>
  );
}

export async function getServerSideProps() {
  // db.connectDb();
  await db.connectDb();
  // console.log(await conn);
  let news = await News.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();

  let categories = await Category.find().sort({ createdAt: -1 }).lean();

  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=8buu5nzbgsrrfuf3")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
