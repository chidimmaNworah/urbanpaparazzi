import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";

export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="/images/empty.png" alt="" />
      <h1>Your Shopping Bag is Empty</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link href="/browse" legacyBehavior>
        <a>
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
            SHOP NOW
          </button>
        </a>
      </Link>
    </div>
  );
}
