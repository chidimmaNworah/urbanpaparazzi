import styles from "./styles.module.scss";
import ForEntreprenuers from "./ForEntreprenuers";
import ForCreators from "./ForCreators";
import ForEntertainment from "./ForEntertainment";
import ForTripple from "./ForTripple";
import ForContinuation from "./ForContinuation";
import ForPopular from "./ForPopular";
import ForPopularContinuation from "./ForPopularCont";
import ForSummary from "./ForSummary";
import ForSummaryContinuation from "./ForSummaryCont";
import ForCategories from "./ForCategories";
export default function BreakingNews({ header, news, bg, categories }) {
  // console.log(products);
  return (
    <>
      <div className={styles.breakingNewsContainer}>
        <div className={styles.breakingNewsContainer__gridContainer}>
          <div
            className={`${styles.breakingNewsContainer__gridContainer_gridItem} ${styles.breakingNewsContainer__gridContainer_gridItemWide}`}
          >
            <div>
              <ForEntreprenuers
                news={news}
                header="Breaking News"
                bg="#333333"
              />
              <ForEntertainment
                news={news}
                header="Entertainment"
                bg="#333333"
              />
              <ForTripple news={news} bg="#333333" />
              <ForContinuation news={news} />
            </div>
          </div>
          <div className={styles.breakingNewsContainer__gridContainer_gridItem}>
            <ForCreators news={news} header="Travel" bg="#379237" />
          </div>
        </div>
      </div>
      <div className={styles.popularNewsContainer}>
        <div className={styles.popularNewsContainer__gridContainer}>
          <div
            className={`${styles.popularNewsContainer__gridContainer_gridItem} ${styles.popularNewsContainer__gridContainer_gridItemWide}`}
          >
            <div>
              <ForPopular news={news} header="Breaking News" bg="#333333" />
              <ForPopularContinuation news={news} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryNewsContainer}>
        <div className={styles.summaryNewsContainer__gridContainer}>
          <div
            className={`${styles.summaryNewsContainer__gridContainer_gridItem} ${styles.summaryNewsContainer__gridContainer_gridItemWide}`}
          >
            <div>
              <ForSummary news={news} header="Breaking News" bg="#333333" />
              <ForSummaryContinuation news={news} />
            </div>
          </div>
          <div className={styles.summaryNewsContainer__gridContainer_gridItem}>
            <ForCategories
              categories={categories}
              header="All Categories"
              bg="#379237"
            />
          </div>
        </div>
      </div>
    </>
  );
}
