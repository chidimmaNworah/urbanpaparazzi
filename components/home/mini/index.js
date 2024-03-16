import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function MiniNews({ news }) {
  // console.log(products[0].subProducts);
  return (
    <div className={styles.main}>
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={styles.main__container}
      >
        <div className={styles.main__container_block}>
          {news?.slice(0, 4).map((post, i) => (
            <Link href={`/post/${post.slug}`} key={i}>
              <div className={styles.main__container_post}>
                <div className={styles.main__container_post_img}>
                  <img src={post.image} alt="" />
                </div>
                <span>{post.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
