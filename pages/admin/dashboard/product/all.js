import styles from "@/styles/products.module.scss";
import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Product from "@/models/News";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";
export default function all({ products }) {
  //   console.log(products);
  return (
    <Layout>
      <div className={`${styles.header} text-[#e6bac8]`}>All Products</div>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
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
