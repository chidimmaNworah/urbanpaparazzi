import { BsSuitHeart } from "react-icons/bs";
import { motion, Variants } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./Home";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Top({ country }) {
  const { data: session } = useSession();

  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  // var yyyy = today.getFullYear();
  // today = mm + "/" + dd + "/" + yyyy;
  // console.log(today);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Link href="/Contact">
              <span>Contact</span>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/About">
              <span>About</span>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/About">
              <span>Forum</span>
            </Link>
          </li>
          {session?.user?.role === "admin" ? (
            <li className={styles.li}>
              <Link href="/admin/dashboard">
                <span>Admin</span>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <div className={styles.date}>
          <FaRegCalendarAlt />
          <span>{dayjs().format("MMMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
