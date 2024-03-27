import React from "react";
import BreakingNews from "@/components/breakingNews";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MiniNews from "@/components/home/mini";
import db from "@/utils/db";
import News from "@/models/News";
import Category from "@/models/Category";
import styles from "../styles/news.module.scss";
import ForCategories from "@/components/breakingNews/ForCategories";
import ForCreators from "@/components/breakingNews/ForCreators";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineLibraryBooks } from "react-icons/md";
import dayjs from "dayjs";

export default function news({ news, categories }) {
  return (
    <div>
      <Header />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>Home / news</div>
          <MiniNews news={news} />
          <div className={styles.product__main}>
            <div className={styles.product__main_one}>
              {news?.map((post, i) => (
                <div key={i} className={styles.newsPage}>
                  <div className={styles.newsPage__post}>
                    <img src={post.image} alt="" />
                    <span className={styles.newsPage__post_category}>
                      {post.category.name}
                    </span>
                    <p className={styles.newsPage__post_name}>{post.name}</p>
                    <div className={styles.newsPage__post_timestamp}>
                      <span className="flex">
                        <IoTimeOutline />{" "}
                        {dayjs(post.createdAt).format("MMMM D")}
                      </span>
                      <span className="flex">
                        <MdOutlineLibraryBooks /> 2 mins Read
                      </span>
                    </div>
                    <p className={styles.newsPage__post_desc}>
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
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
        </div>
      </div>
      <Footer news={news} />
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
