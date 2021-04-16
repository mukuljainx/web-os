import { useEffect, useState } from "react";
import dayjs from "dayjs";

const useClock = (format: string, interval = 1000) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return dayjs(time).format(format);
};

export default useClock;
