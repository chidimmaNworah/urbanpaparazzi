import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { FaStaylinked } from "react-icons/fa";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showDialog } from "@/store/DialogSlice";
import styles from "./styles.module.scss";
import { GiExtractionOrb } from "react-icons/gi";
export default function Images({
  image,
  setImage,
  header,
  text,
  name,
  value,
  setColorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);

  const handleImages = (e) => {
    const file = e.target.files[0]; // Get the first selected file from the input
    // console.log("image: ", file);
    const reader = new FileReader();

    reader.readAsDataURL(file); // Read the file as a data URL
    reader.onload = (e) => {
      setImage(e.target.result); // Update the state with the image data URL
    };
  };
  // const handleRemove = (image) => {
  //   setImage((image) => image.filter((item) => item !== image));
  // };

  const handleRemove = () => {
    setImage(""); // Set the image state to an empty string
  };
  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
          {header}
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name="name"
        ref={fileInput}
        hidden
        // multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
        // {...field}
      />
      <div className={styles.images__main}>
        <div className={`${styles.images__main_grid}`}>
          {!image?.length ? (
            <img src="../../../images/no_image.png" alt="" />
          ) : (
            <div className={styles.images__main_grid_wrap}>
              <div className={styles.blur}></div>
              <img src={image} alt="" />
              <div className={styles.images__main_grid_actions}>
                <button onClick={() => handleRemove(image)}>
                  <RiDeleteBin7Fill />
                </button>
                <button>
                  <RiShape2Line />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        type="reset"
        // style={{ opacity: `${image?.length >= 1 && "0.5"}` }}
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
        // disabled={image?.length >= 1}
      >
        {text}
      </button>
    </div>
  );
}
