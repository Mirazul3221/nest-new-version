"use client";
import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ duration, isActive, isPaused, onFinish }) => {
  const innerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const [progress, setProgress] = useState(0); // progress from 0 to 1
  const [elapsed, setElapsed] = useState(0);

  // Animate the progress
  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const delta = timestamp - startTimeRef.current;
    const totalElapsed = elapsed + delta;
    const newProgress = Math.min(totalElapsed / duration, 1);

    setProgress(newProgress);

    if (newProgress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      onFinish?.();
    }
  };

  // Start or resume animation
  useEffect(() => {
    if (isActive && !isPaused) {
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive, isPaused]);

  // Pause logic
  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(animationRef.current);
      if (startTimeRef.current) {
        const delta = performance.now() - startTimeRef.current;
        setElapsed((prev) => prev + delta);
      }
    }
  }, [isPaused]);

  // Reset when inactive
  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(animationRef.current);
      setProgress(0);
      setElapsed(0);
    }
  }, [isActive]);

  return (
    <div className="w-full h-[5px] bg-gray-300 rounded overflow-hidden">
      <div
        ref={innerRef}
        className="h-full bg-gray-50 transition-none rounded"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
