"use client"
import React, { useRef, useState, useEffect } from "react";
import "./timer.css";
// import "./timerFunc";

const CustomTimer = () => {
  const [time, setTime] = useState([
    {
      twoDigigt: "",
      oneDigit: "",
    },
    {
      twoDigigt: "",
      oneDigit: "",
    },
    {
      twoDigigt: "",
      oneDigit: "",
    },
  ]);
  const oneDigitSecond = useRef(null);
  const TwoDigitSecond = useRef(null);
  const oneDigigtMinute = useRef(null);
  const TwoDigigtMinute = useRef(null);
  // const oneDigigtHour = useRef(null);
  // const TwoDigigtHour = useRef(null);
  // console.log(second);
  useEffect(() => {
    setInterval(() => {
      const currentTime = new Date();
      const h = currentTime.getHours();
      const m = currentTime.getMinutes();
      const s = currentTime.getSeconds();
      setTime([
        {
          twoDigigt: Math.floor(s / 10),
          oneDigit: s % 10,
        },
        {
          twoDigigt: Math.floor(m / 10),
          oneDigit: m % 10,
        },
        {
          twoDigigt: Math.floor((h % 12) / 10),
          oneDigit: (h % 12) % 10,
        },
      ]);
    }, 1000);
  }, []);
  //==============================
  useEffect(() => {
      //==============================
  function timingFunction() {
    const currentTime = new Date();
    // const h = currentTime.getHours();
    const m = currentTime.getMinutes();
    const s = currentTime.getSeconds();
    const timingCondition = (domElement, value) => {
      if (parseInt(domElement.current?.children[0].innerText, 10) === value) {
        domElement.current.classList.add("flip");
        setTimeout(() => {
          domElement.current?.classList.remove("flip");
        }, 800);
      }
    };
    let x = m / 10;
    let y = Math.floor(m / 10);
    let z = x - y;
    let minuteTwoDigit = (m * 60 + s) / 60 / 10;
    let oneDigitMinuteResult = z.toFixed(1) * 10 + s;
    //========================================
    timingCondition(oneDigitSecond, time[0].oneDigit);
    timingCondition(TwoDigitSecond, s / 10);
    timingCondition(oneDigigtMinute, oneDigitMinuteResult);
    timingCondition(TwoDigigtMinute, minuteTwoDigit);
   }
   timingFunction()
  }, [time]);


  // console.log(parseInt(oneDigitSecond.current.children[0].innerText, 10));

  // if (parseInt(oneDigitSecond.current.children[0].innerText, 10) === s % 10) {
  //   alert("fsdjk");
  //   // console.log("gdjkkzalhk");
  // }
  return (
    <div className="countdown w-fit pt-2">
      <div className="time-section" id="hours">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"> {time[2].twoDigigt}</div>
              <div className="segment-display__bottom">{time[2].twoDigigt}</div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"> {time[2].twoDigigt}</div>
                <div className="segment-overlay__bottom">
                  {time[2].twoDigigt}
                </div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top">{time[2].oneDigit}</div>
              <div className="segment-display__bottom">{time[2].oneDigit}</div>
              <div className="segment-overlay">
                <div className="segment-overlay__top">{time[2].oneDigit}</div>
                <div className="segment-overlay__bottom">
                  {time[2].oneDigit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="time-section" id="minutes">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top">{time[1].twoDigigt}</div>
              <div className="segment-display__bottom">{time[1].twoDigigt}</div>
              <div ref={TwoDigigtMinute} className="segment-overlay">
                <div className="segment-overlay__top">{time[1].twoDigigt}</div>
                <div className="segment-overlay__bottom">
                  {time[1].twoDigigt}
                </div>
              </div>
            </div>
          </div>

          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top">{time[1].oneDigit}</div>
              <div className="segment-display__bottom">{time[1].oneDigit}</div>
              <div ref={oneDigigtMinute} className="segment-overlay">
                <div className="segment-overlay__top">{time[1].oneDigit}</div>
                <div className="segment-overlay__bottom">
                  {time[1].oneDigit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="time-section" id="seconds">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top">{time[0].twoDigigt}</div>
              <div className="segment-display__bottom">{time[0].twoDigigt}</div>
              <div ref={TwoDigitSecond} className="segment-overlay">
                <div className="segment-overlay__top">{time[0].twoDigigt}</div>
                <div className="segment-overlay__bottom">
                  {time[0].twoDigigt}
                </div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top">{time[0].oneDigit}</div>
              <div className="segment-display__bottom">{time[0].oneDigit}</div>
              <div ref={oneDigitSecond} className={`segment-overlay `}>
                <div className="segment-overlay__top">{time[0].oneDigit}</div>
                <div className="segment-overlay__bottom">
                  {time[0].oneDigit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTimer;
