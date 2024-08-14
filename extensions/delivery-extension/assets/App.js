import React, { useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(86400);

  seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);

  return <div id="root">{formatTime(seconds)}</div>;
}

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};
  





