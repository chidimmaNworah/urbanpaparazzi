import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
export default function ProductCard({ product }) {
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/product", {
        data: { id },
      });
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.name}</h1>
      <h2 className={styles.product__category}>#{product.category.name}</h2>
      <div className={styles.product__item}>
        <div className={styles.product__item_img}>
          <img src={product.image} alt="" />
        </div>
        <div className={styles.product__actions}>
          {/* <Link href={`/admin/dashboard/post/${product._id}`}> */}
          <TbEdit />
          {/* </Link> */}
          <Link href={`/post/${product.slug}`}>
            <AiOutlineEye className="text-[#6cc070]" />
          </Link>
          <Link href="" onClick={() => deleteProduct(product._id)}>
            <RiDeleteBin2Line className="text-[#ed4337]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
