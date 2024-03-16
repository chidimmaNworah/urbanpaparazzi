import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const input = useRef(null);
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/coupon", {
        data: { id },
      });
      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      if (startDate.toString() == endDate.toString()) {
        return toast.error("You can't pick the same Dates.");
      } else if (endDate.getTime() - startDate.getTime() < 0) {
        return toast.error("Start Date cannot be more than the end date.");
      }
      const { data } = await axios.put("/api/admin/coupon", {
        id,
        coupon: name || coupon.coupon,
        discount: discount || coupon.discount,
        startDate: startDate,
        endDate: endDate,
      });
      console.log(data);
      setCoupons(data.coupons);
      setOpen(false);
      // setStartDate(coupon.startDate);
      // setEndDate(coupon.endDate);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : coupon.coupon}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <input
            className={open ? styles.open : ""}
            type="text"
            value={discount ? discount : coupon.discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={!open}
          />
          <div className="flex flex-col">
            <span>Start and End Dates</span>
            <span>{dayjs(coupon.startDate).format("MM/DD/YYYY")}</span>
            <span>{dayjs(coupon.endDate).format("MM/DD/YYYY")}</span>
          </div>

          <div className={styles.date_picker}>
            <DatePicker
              selected={startDate}
              onChange={handleStartDate}
              // minDate={new Date()}
              dateFormat="MM/dd/yyyy"
              value={startDate}
              placeholderText="Start Date"
              // renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDate}
              // minDate={tomorrow}
              dateFormat="MM/dd/yyyy"
              value={endDate}
              placeholderText="End Date"
              // renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <button
            className={styles.btn}
            onClick={() => handleUpdate(coupon._id)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
              setDiscount("");
              setStartDate(new Date());
              setEndDate(tomorrow);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(coupon._id)} />
      </div>
    </li>
  );
}
