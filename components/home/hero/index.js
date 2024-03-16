import { useState } from "react";
import styles from "./styles.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import dayjs from "dayjs";
import Link from "next/link";

export default function HeroNews({ news }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__flashDeals}>
        <div className={styles.container__flashDeals_main}>
          {news.slice(0, 4).map((post, i) => (
            <div key={i}>
              <img src={post.image} alt="images" />
              <div className={styles.textOverlay}>
                <div className={styles.textOverlay__category}>
                  <p>{post.category.name}</p>
                </div>
                <Link href={`/post/${post.slug}`}>
                  <h3 className={styles.textOverlay__name}>
                    {post.name ? post.name : "Post Name"}
                  </h3>
                </Link>
                <div className={styles.textOverlay__timestamp}>
                  <span className="flex">
                    <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                  </span>
                  <span className="flex">
                    <LiaCommentSolid /> 20 comments
                  </span>
                </div>
                <div className={styles.textOverlay__description}>
                  <span>{post.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
