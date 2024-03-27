import { useEffect, useState } from "react";
import Layout from "@/components/admin/layout";
import styles from "@/styles/dashboard.module.scss";
import User from "@/models/user";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/admin/dashboard/dropdown";
import Notifications from "@/components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import db from "@/utils/db";
import News from "@/models/News";
import Header from "@/components/header";
export default function dashboard({ users, news }) {
  const { data: session } = useSession();
  const searchIcon = <BiSearchAlt />;
  return (
    <div>
      <Head>
        <title>Urban Paparazzi - Admin Dashboard</title>
      </Head>
      <Header />
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              {typeof window !== "undefined" && window.innerWidth <= 400 ? (
                <input
                  type="text"
                  placeholder={searchIcon}
                  className={styles.place_search_icon2}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Search here..."
                  className={styles.place_search_icon1}
                />
              )}
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users?.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{news.length}</h4>
              <span>Posts</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Posts</h2>
              <Link href="/admin/dashboard/posts">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Slug</td>
                  <td>Views</td>
                  <td>Description</td>
                  <td>Date</td>
                </tr>
              </thead>
              <tbody>
                {news.map((post) => (
                  <tr>
                    <td>{post.name}</td>
                    <td>{post.slug}</td>
                    <td>1 view</td>
                    <td>
                      <div className="">{post.description}</div>
                    </td>
                    <td>
                      <Link href={`/post/${post._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users?.map((user) => (
                  <tr>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  db.connectDb();
  const users = await User.find().lean();
  const news = await News.find().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      news: JSON.parse(JSON.stringify(news)),
    },
  };
}
