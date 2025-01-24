'use client'
import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0); // To keep track of the timer
  useEffect(() => {
    let intervalId;
      // Start the timer
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

    // Clear interval on component unmount or when the timer stops
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const second = time%60
const minute = Math.floor(time/60)
  return (
    <div>
      <h1>{minute < 10 ? '0' + minute : minute }:{second < 10 ? '0' + second :second}</h1>
    </div>
  );
}
