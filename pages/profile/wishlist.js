import { getSession } from "next-auth/react";
import Layout from "@/components/profile/layout";
import User from "@/models/user";
import Shipping from "@/components/checkout/shipping";
import styles from "@/styles/profile.module.scss";
import { useState } from "react";
import Link from "next/link";
export default function addresses({ user, tab, wishlist }) {
  //   const [addresses, setAddresses] = useState(user.address.address);
  // console.log("style: ", wishlist.style);
  console.log("wishlist: ", wishlist[0].product.subProducts[0]);
  return (
    <Layout session={user} tab={tab}>
      <div className={styles.header}>
        <h1 className="pl-4">MY WISHLIST</h1>
      </div>
      {wishlist.map((item, i) => (
        <p
          key={i}
          className="bg-[#e39a9a] px-4 py-4 rounded-full shadow-2xl text-sm mb-2 truncate w-full"
        >
          <Link href={`/product/${item.product.slug}?style=${i}`}>
            {item.product.name}
          </Link>
        </p>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  //--------------
  const wishlist = await User.findById(session?.user.id)
    .select("wishlist")
    .populate("wishlist.product")
    .lean();
  // console.log(wishlist);
  return {
    props: {
      user: session.user,
      wishlist: JSON.parse(JSON.stringify(wishlist.wishlist)),
      tab,
    },
  };
}
