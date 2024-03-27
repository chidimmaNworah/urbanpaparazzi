import styles from "@/styles/products.module.scss";
import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";
import News from "@/models/News";
import Header from "@/components/header";
export default function all({ products }) {
  //   console.log(products);
  return (
    <>
      <Header />
      <Layout>
        <div className={`${styles.header}`}>All Posts</div>
        <div className={styles.productsCard}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await News.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
