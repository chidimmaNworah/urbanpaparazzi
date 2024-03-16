import { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { calcaulateDiff } from "./utils";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calcaulateDiff(timeInMs));
  };
  return (
    <div className={styles.countdown}>
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => {
        if (remainingTime?.days == 0) {
          return;
        }
        return (
          <>
            <div className="flex flex-col items-center text-center">
              <div>
                <span className="mr-[2px]">
                  {remainingTime?.days.slice(i, i + 1)}
                </span>
              </div>
              <p className="font-light text-[8px]">DAYS</p>
            </div>
            <b>:</b>
          </>
        );
      })}
      <div className="flex flex-col items-center text-center">
        <div>
          <span className="mr-[2px]">{remainingTime?.hours.slice(0, 1)}</span>
          <span>{remainingTime?.hours.slice(1, 2)}</span>
        </div>
        <p className="font-light text-[8px]">HOURS</p>
      </div>
      <b>:</b>
      <div className="flex flex-col items-center text-center">
        <div>
          <span className="mr-[2px]">{remainingTime?.minutes.slice(0, 1)}</span>
          <span>{remainingTime?.minutes.slice(1, 2)}</span>
        </div>
        <p className="font-light text-[8px]">MINUTES</p>
      </div>
      <b>:</b>
      <div className="flex flex-col items-center text-center">
        <div>
          <span className="mr-[2px]">{remainingTime?.seconds.slice(0, 1)}</span>
          <span>{remainingTime?.seconds.slice(1, 2)}</span>
        </div>
        <p className="font-light text-[8px]">SECONDS</p>
      </div>
    </div>
  );
}
