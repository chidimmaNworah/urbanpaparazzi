import { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

export default function ShippingDetail({ shipping, product, setProduct }) {
  const handleDetails = (e) => {
    // const values = [...details];
    // values[i][e.target.name] = e.target.value;
    setProduct({ ...product, shipping: e.target.value });
  };
  // const handleRemove = (i) => {
  //   if (details.length > 0) {
  //     const values = [...details];
  //     values.splice(i, 1);
  //     setProduct({ ...product, details: values });
  //   }
  // };
  // console.log("product details", product.details);
  return (
    <div>
      <div className={styles.header}>shipping</div>

      {/* {details
        ? details.map((detail, i) => ( */}
      <div className={styles.clicktoadd}>
        <input
          type="text"
          name="name"
          placeholder="Shipping Fee"
          value={shipping}
          onChange={(e) => handleDetails(e)}
        />
      </div>
      {/* ))
        : ""} */}
    </div>
  );
}
