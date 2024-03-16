import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links({ news }) {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={link.heading}>
          {i === 0 ? (
            <div className={styles.name}>
              <div className={styles.nameText}>
                <p>
                  <Link href="/">
                    <b>URBAN</b> PAPARAZZI
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <b>{link.heading}</b>
          )}
          {link.heading === "MOST POPULAR"
            ? news.map((item, i) => (
                <li key={i}>
                  <Link href={`/post/${item.slug}`}>
                    <div className={styles.footerNews}>
                      <img src={item.image} alt="" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))
            : link.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
        </ul>
      ))}
    </div>
  );
}

const links = [
  {
    heading: "Urban Paparazzi",
    links: [
      {
        name: "Urban Paparazzi is the next generation Nigerian Magazine, featuring a fully flexible environmental information in all Urban and Various areas and an easy-to-read interface for readers of all types",
        link: "/about",
      },
    ],
  },
  {
    heading: "MOST POPULAR",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "QUICK LINKS",
    links: [
      {
        name: "About Us",
        link: "",
      },
      {
        name: "Contact Us",
        link: "",
      },
      {
        name: "Most Popular News",
        link: "",
      },
      {
        name: "Trending News",
        link: "",
      },
    ],
  },
];
