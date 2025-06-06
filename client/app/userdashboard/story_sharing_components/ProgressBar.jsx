'use client';
import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ duration, isActive, onFinish }) => {
  console.log(isActive)
  const innerRef = useRef();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isActive && innerRef.current) {
      innerRef.current.style.transition = 'none';
      innerRef.current.style.width = '0%';

      // Allow one frame to render width 0% before transitioning
      requestAnimationFrame(() => {
        if (innerRef.current) {
          innerRef.current.style.transition = `width ${duration}ms linear`;
          innerRef.current.style.width = "100%";
          setShouldAnimate(true);
        }
      });

      const timer = setTimeout(() => {
        if (isActive && onFinish) onFinish();
      }, duration);

      return () => clearTimeout(timer);
    } else if (innerRef.current) {
      innerRef.current.style.transition = 'none';
      innerRef.current.style.width = '0%';
      setShouldAnimate(false);
    }
  }, [isActive, duration]);

  return (
    <div className="w-full h-[5px] bg-gray-500 rounded overflow-hidden">
      <div ref={innerRef} className="h-full w-0 bg-amber-500 rounded"></div>
    </div>
  );
};

export default ProgressBar;
