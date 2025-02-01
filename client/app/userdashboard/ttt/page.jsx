'use client'
import { useState, useRef, useEffect } from "react";
import InputForm from "@/app/components/Login";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const toggleBox = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
      {/* Toggle Button */}
      <button onClick={toggleBox} style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
        Toggle Box
      </button>

      {/* Box Container */}
      {isOpen && (
        <div
          ref={boxRef}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "300px",
            textAlign: "center"
          }}
        >
          <h2>This is the Box</h2>
          <p>Click outside to close.</p>
           <InputForm/>
        </div>
      )}
    </div>
  );
}
