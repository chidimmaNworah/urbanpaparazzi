import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
import Select from "./Select";
import styles from "./styles.module.scss";
import Table from "./Table";

export default function Reviews({ product }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState(product.reviews);
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <div className={styles.reviews__stats}>
          {/* <div className={styles.reviews__stats_overview}> */}
          <span>Average Rating ({product.reviews.length})</span>
          <div className={styles.reviews__stats_overview_rating}>
            <Rating
              name="half-rating"
              defaultValue={product.rating}
              precision={1}
              readOnly
              style={{ color: "#5a141d" }}
            />
            {product.rating == 0 ? "No review yet." : product.rating}
          </div>
          {/* </div> */}
          {/* <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  style={{ color: "#5a141d" }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div> */}
        </div>
        {session ? (
          <AddReview product={product} setReviews={setReviews} />
        ) : (
          <div className={styles.login_btn}>
            <button onClick={() => signIn()}>Login to add review</button>
          </div>
        )}
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
}
