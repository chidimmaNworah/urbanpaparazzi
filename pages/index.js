import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
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
        </div>
      </div>
      <Footer country={country} news={news} />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connectDb();
  let news = await News.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();

  let categories = await Category.find().sort({ createdAt: -1 }).lean();

  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
