'use client'
import { useEffect, useCallback } from "react";
export default function ClickTracker() {
  const logClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  useEffect(() => {
    document.addEventListener("click", logClick);
    return () => document.removeEventListener("click", logClick);
  }, []); // Dependency is stable due to useCallback

  return <p>Click anywhere to log!</p>;
}
