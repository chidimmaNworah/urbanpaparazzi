import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForCategories({ categories, header, bg }) {
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
        <div className={`${styles.lineGreen}`}></div>
        <div className={styles.category}>
          {categories.slice(3, 6).map((category, i) => (
            <div className={styles.category__news} key={i}>
              <p className={styles.category__news_category}>{category.name}</p>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
