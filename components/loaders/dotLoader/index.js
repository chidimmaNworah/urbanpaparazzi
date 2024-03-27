import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import styles from "./styles.module.scss";

export default function DotLoader({ loading }) {
  return (
    <div className={styles.loader}>
      <PuffLoader color="#379237" loading={loading} />
    </div>
  );
}
