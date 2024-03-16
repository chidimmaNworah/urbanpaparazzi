import Link from "next/link";
import styles from "./styles.module.scss";
import CircledIconBtn from "../buttons/circledIconBtn";

export default function Ad() {
  return (
    <Link href="/">
      <div className={styles.name}>
        <div className={styles.nameText}>
          <p>
            <b>URBAN</b> PAPARAZZI
          </p>
        </div>
      </div>
    </Link>
  );
}
