import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForSummaryContinuation({ news, header, bg }) {
  const categoryOptions = ["Fashion", "Accessories"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className={styles.summaryCont}>
          {news.slice(0, 40).map((post, i) => (
            <div className={styles.summaryCont__news} key={i}>
              <div className={styles.summaryCont__news_image}>
                <img src={post.image} alt="" />
              </div>
              <div>
                <p className={styles.summaryCont__news_category}>
                  {post.category.name}
                </p>
                <p className={styles.summaryCont__news_name}>{post.name}</p>
                <div className={styles.summaryCont__news_timestamp}>
                  <span className="flex">
                    <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                  </span>
                  <span className="flex">
                    <LiaCommentSolid /> 20 comments
                  </span>
                </div>
                <span className={styles.summaryCont__news_desc}>
                  {post.description}
                </span>
              </div>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
