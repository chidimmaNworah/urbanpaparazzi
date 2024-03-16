import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";

export default function ForTripple({ news, bg }) {
  const categoryOptions = [
    {
      name: "Fashion",
    },
    {
      name: "Accessories",
    },
    {
      name: "Diamonds",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className={styles.breaking}>
          {news.slice(0, 3).map((post, index) => (
            <div className={styles.breaking__news} key={index}>
              <div className="flex">
                <div
                  className={styles.header}
                  style={{ background: `${bg ? bg : ""}` }}
                >
                  <p>{categoryOptions[index % categoryOptions.length].name}</p>
                </div>
              </div>
              <div className={`${styles.line} mb-8`}></div>
              <div className="relative text-white">
                <img
                  src={post.image}
                  alt=""
                  className={styles.breaking__news_trippleimage}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className={styles.breaking__news_category}>
                    <p className="bg-[#379237] text-white px-4 py-2 rounded">
                      {post.category.name}
                    </p>
                  </div>
                  <p className={styles.breaking__news_name}>{post.name}</p>
                  <div className={styles.breaking__news_timestamp}>
                    <span className="flex">
                      <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
