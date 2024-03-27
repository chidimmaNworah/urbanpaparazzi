import Link from "next/link";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import {
  GrFacebookOption,
  GrInstagram,
  GrTiktok,
  GrTwitter,
} from "react-icons/gr";
import { CgMenuRight, CgMenuLeft } from "react-icons/cg";
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
import { useSession } from "next-auth/react";
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(false);
  const [newsVisible, setNewsVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [pagesVisible, setPagesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  const { data: session } = useSession();

  return (
    <>
      <div>
        <div className={styles.name}>
          <div className={styles.name__menu_close}>
            {!menuVisible ? (
              <CgMenuLeft onClick={toggleMenu} />
            ) : (
              <CgMenuRight onClick={toggleMenu} />
            )}
          </div>
          <Link href="/">
            <div className={styles.nameText}>
              <p>
                <b>URBAN</b> PAPARAZZI
              </p>
            </div>
          </Link>
        </div>
        {menuVisible ? (
          <div className={`${styles.menumain}`}>
            <div className={`${styles.menumain__container}`}>
              <ul>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Link href="/">Home</Link>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Link href="/news">All News</Link>
                  </div>
                </li>
                <li
                  className={styles.li}
                  onClick={() => setCategoryVisible(true)}
                  onMouseLeave={() => setCategoryVisible(false)}
                >
                  <div className={styles.flex}>
                    <span>Categories</span>
                    {!categoryVisible ? (
                      <RiArrowDropDownFill />
                    ) : (
                      <RiArrowDropUpFill />
                    )}
                  </div>
                  {categoryVisible && <CategoryPage />}
                </li>
                <li
                  className={styles.li}
                  onClick={() => setPagesVisible(true)}
                  onMouseLeave={() => setPagesVisible(false)}
                >
                  <div className={styles.flex}>
                    <span>Pages</span>
                    {!pagesVisible ? (
                      <RiArrowDropDownFill />
                    ) : (
                      <RiArrowDropUpFill />
                    )}
                  </div>
                  {pagesVisible && <PagesPage />}
                </li>
                {session?.user?.role === "admin" ? (
                  <li>
                    <div className={styles.flex}>
                      <Link href="/admin/dashboard">Admin</Link>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                <li
                  className={styles.li}
                  // onClick={() => setSearchVisible(true)}
                  // onMouseUp={() => setSearchVisible(false)}
                  ref={searchRef}
                >
                  <button
                    type="submit"
                    className={`${
                      searchVisible ? "hidden" : styles.search__icon
                    }`}
                    onClick={() => setSearchVisible(true)}
                  >
                    <RiSearch2Line />
                  </button>

                  {searchVisible && (
                    <form
                      onSubmit={(e) => handleSearch(e)}
                      className={styles.search}
                    >
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
        ) : (
          ""
        )}
      </div>
      <div className={`${styles.main}`}>
        <div className={`${styles.main__container}`}>
          <ul className="flex">
            <li className={styles.li}>
              <div className={styles.flex}>
                <Link href="/">Home</Link>
              </div>
            </li>
            <li className={styles.li}>
              <div className={styles.flex}>
                <Link href="/news">All News</Link>
              </div>
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
                <form
                  onSubmit={(e) => handleSearch(e)}
                  className={styles.search}
                >
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
    </>
  );
}
