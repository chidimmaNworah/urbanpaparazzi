import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import styles from "./styles.module.scss";

export default function DotLoader({ loading }) {
  return (
    <div className={styles.loader}>
      <CircleLoader color="#5a141d" loading={loading} />
    </div>
  );
}
