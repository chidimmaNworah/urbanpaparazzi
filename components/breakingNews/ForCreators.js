import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForCreators({ news, header, bg }) {
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
        <div className={styles.lineGreen}></div>
        <div className={styles.travel}>
          {news.slice(3, 6).map((post, i) => (
            <div className={styles.travel__news} key={i}>
              <img src={post.image} alt="" />

              <p className={styles.travel__news_desc}>{post.description}</p>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
