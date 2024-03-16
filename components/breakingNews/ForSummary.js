import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForSummary({ news, header, bg }) {
  const categoryOptions = ["Fashion", "Accessories"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className="flex">
          {header && (
            <div
              className={styles.header}
              style={{ background: `${bg ? bg : ""}` }}
            >
              <p>{header}</p>
            </div>
          )}
        </div>
        <div className={styles.line}></div>
        <div className={styles.summary}>
          {news.slice(1, 2).map((post, i) => (
            <div className={styles.summary__news} key={i}>
              <div className="relative text-white">
                <img
                  src={post.image}
                  alt=""
                  className={styles.summary__news_summaryImage}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className={styles.summary__news_category}>
                    {post.category.name}
                  </p>
                  <p className={styles.summary__news_name}>{post.name}</p>
                  <div className={styles.summary__news_timestamp}>
                    <span className="flex">
                      <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
