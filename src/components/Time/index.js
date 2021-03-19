import { useState, useEffect } from "react";

export default function Time() {
  const [, setState] = useState(0);
  useEffect(() => {
    let intervalId;
    const now = new Date();
    const secondsBeforeNewMinute = (60 - now.getSeconds()) * 1000;
    const timerId = setTimeout(() => {
      // start at the first second
      setState((s) => s + 1);
      intervalId = setInterval(() => {
        setState((s) => s + 1);
      }, 60_000);
    }, secondsBeforeNewMinute);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, []);

  const date = new Date();
  return <>{date.toLocaleTimeString().split(":").slice(0, 2).join(":")}</>;
}
