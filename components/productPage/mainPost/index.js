import styles from "./styles.module.scss";
import ReactImageMagnify from "react-image-magnify";
import { useState } from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";
import { HiShare } from "react-icons/hi";

export default function MainPost({ post }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__list}>
        <p className={styles.swiper__list_category}>{post.category.name}</p>
        <h3 className={styles.swiper__list_name}>{post.name}</h3>
        <div className={styles.swiper__list_timestamp}>
          <span className="flex">
            <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
          </span>
          <span className="flex">
            <MdOutlineLibraryBooks /> 2 mins Read
          </span>
        </div>
        <img src={post.image} alt="postImage" />
        <div className="flex items-start gap-4">
          <div className={styles.textOverlay__timestamp}>
            <span className="flex flex-col items-center justify-center">
              <LiaCommentSolid />{" "}
              <p className="text-[0.5rem] text-center">Add Comment</p>
            </span>
            <span className="flex flex-col items-center justify-center mt-[1rem]">
              <HiShare />{" "}
              <p className="text-[0.5rem] text-center">Share Post</p>
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.post }}></p>
        </div>
      </div>
    </div>
  );
}
