import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForEntertainment({ news, header, bg }) {
  const categoryOptions = ["Fashion", "Accessories"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className="flex gap-10">
          {header && (
            <div
              className={styles.header}
              style={{ background: `${bg ? bg : ""}` }}
            >
              <div>
                <p>{header}</p>
              </div>
            </div>
          )}
          <div className={`${styles.entertainmentHeader} flex gap-10`}>
            <span>Music</span>
            <span>Movies</span>
            <span>Comedy</span>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.breaking}>
          {news.slice(2, 5).map((post, i) => (
            <div className={styles.breaking__news} key={i}>
              <img src={post.image} alt="" />
              <p className={styles.breaking__news_category}>
                {post.category.name}
              </p>
              <p className={styles.breaking__news_name}>{post.name}</p>
              <div className={styles.breaking__news_timestamp}>
                <span className="flex">
                  <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                </span>
              </div>
              <p className={styles.breaking__news_desc}>{post.description}</p>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
