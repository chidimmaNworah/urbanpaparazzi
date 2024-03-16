import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
export default function ForPopularContinuation({ news, header, bg }) {
  const categoryOptions = ["Fashion", "Accessories"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className={styles.popularCont}>
          {news.slice(0, 40).map((post, i) => (
            <div className={styles.popularCont__news} key={i}>
              <img src={post.image} alt="" />
              <div>
                <p className={styles.popularCont__news_category}>
                  {post.category.name}
                </p>
                <p className={styles.popularCont__news_name}>{post.name}</p>
              </div>
            </div>
          ))}

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
