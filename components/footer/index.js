import React from "react";
import styles from "./styles.module.scss";
import Links from "./Links";
import Socials from "./Socials";
import NewsLetter from "./NewsLetter";
import Copyright from "./Copyright";

export default function Footer({ country, news }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links news={news} />
        <Socials />
        <NewsLetter />
        <Copyright country={country} />
      </div>
    </footer>
  );
}
