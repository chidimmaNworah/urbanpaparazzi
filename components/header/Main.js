import Link from "next/link";
import { RiArrowDropDownFill } from "react-icons/ri";
import {
  GrFacebookOption,
  GrInstagram,
  GrTiktok,
  GrTwitter,
} from "react-icons/gr";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import HomePage from "./Home";
import NewsPage from "./News";
import CategoryPage from "./Categories";
import PagesPage from "./Pages";
import { AiOutlineGooglePlus } from "react-icons/ai";
export default function Main({ searchHandler }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const { cart } = useSelector((state) => ({ ...state }));
  // console.log(cart);
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  const [homeVisible, setHomeVisible] = useState(false);
  const [newsVisible, setNewsVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [pagesVisible, setPagesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.main__container}`}>
        <ul className="flex">
          <li
            className={styles.li}
            onMouseOver={() => setHomeVisible(true)}
            onMouseLeave={() => setHomeVisible(false)}
          >
            <div className={styles.flex}>
              <span>Home</span>
              <RiArrowDropDownFill />
            </div>
            {homeVisible && <HomePage />}
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setNewsVisible(true)}
            onMouseLeave={() => setNewsVisible(false)}
          >
            <div className={styles.flex}>
              <span>News</span>
              <RiArrowDropDownFill />
            </div>
            {newsVisible && <NewsPage />}
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setCategoryVisible(true)}
            onMouseLeave={() => setCategoryVisible(false)}
          >
            <div className={styles.flex}>
              <span>Categories</span>
              <RiArrowDropDownFill />
            </div>
            {categoryVisible && <CategoryPage />}
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setPagesVisible(true)}
            onMouseLeave={() => setPagesVisible(false)}
          >
            <div className={styles.flex}>
              <span>Pages</span>
              <RiArrowDropDownFill />
            </div>
            {pagesVisible && <PagesPage />}
          </li>
          <li
            className={styles.li}
            // onClick={() => setSearchVisible(true)}
            // onMouseUp={() => setSearchVisible(false)}
            ref={searchRef}
          >
            <button
              type="submit"
              className={`${searchVisible ? "hidden" : styles.search__icon}`}
              onClick={() => setSearchVisible(true)}
            >
              <RiSearch2Line />
            </button>

            {searchVisible && (
              <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className={styles.search__icon}>
                  <RiSearch2Line />
                </button>
              </form>
            )}
          </li>
        </ul>
        <div className={styles.main__container_socials}>
          <ul className={styles.socialIcons}>
            <li>
              <GrFacebookOption />
            </li>
            <li>
              <GrTwitter />
            </li>
            <li>
              <AiOutlineGooglePlus />
            </li>
            <li>
              <GrInstagram />
            </li>
            <li>
              <GrTiktok />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
