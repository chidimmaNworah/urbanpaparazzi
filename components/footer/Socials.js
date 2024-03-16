import React from "react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";
import styles from "./styles.module.scss";

export default function Socials() {
  return (
    <div className={styles.footer__socials}>
      <section>
        <h3>STAY CONNECTED</h3>
        <ul>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <BsInstagram />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <BsYoutube />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <BsPinterest />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <BsSnapchat />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
