import { Form, Formik } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import { TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Create({ setCoupons }) {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  console.log(startDate, endDate);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Coupon name is required.")
      .min(2, "Coupon name must be bewteen 2 and 30 characters.")
      .max(30, "Coupon name must be bewteen 2 and 30 characters."),
    discount: Yup.number()
      .required("Discount is required.")
      .min(1, "Discount must be atleast 1%")
      .max(99, "Discount must be 99% or less"),
  });
  const submitHandler = async () => {
    try {
      if (startDate.toString() == endDate.toString()) {
        return toast.error("You can't pick the same Dates.");
      } else if (endDate.getTime() - startDate.getTime() < 0) {
        return toast.error("Start Date cannot be more than the end date.");
      }
      const { data } = await axios.post("/api/admin/coupon", {
        coupon: name,
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      setName("");
      setDiscount(0);
      setStartDate(new Date());
      setEndDate(tomorrow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Coupon</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placholder="Coupon name"
              onChange={(e) => setName(e.target.value)}
            />
            <AdminInput
              type="number"
              label="Discount"
              name="discount"
              placholder="Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className={styles.date_picker}>
              <DatePicker
                selected={startDate}
                onChange={handleStartDate}
                minDate={new Date()}
                dateFormat="MM/dd/yyyy"
                value={startDate}
                placeholderText="Start Date"
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDate}
                minDate={tomorrow}
                dateFormat="MM/dd/yyyy"
                value={startDate}
                placeholderText="End Date"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Coupon</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
