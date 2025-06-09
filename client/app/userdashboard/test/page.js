'use client'
import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";

const UploadableImageEditor = () => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [frame, setFrame] = useState({
    translate: [0, 0],
    rotate: 0,
    scale: [1, 1],
    skew: [0, 0],
  });
  const [selected, setSelected] = useState(false);

  // Listen for outside clicks to deselect the image
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(e.target)
      ) {
        setSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setSelected(true);
      setFrame({
        translate: [0, 0],
        rotate: 0,
        scale: [1, 1],
        skew: [0, 0],
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#f0f0f0",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imageURL && (
        <div
          ref={targetRef}
          onClick={() => setSelected(true)} // reselect when clicked
          style={{
            width: "300px",
            height: "300px",
            position: "absolute",
            top: 100,
            left: 100,
            cursor: "pointer",
            transform: `
              translate(${frame.translate[0]}px, ${frame.translate[1]}px)
              rotate(${frame.rotate}deg)
              scale(${frame.scale[0]}, ${frame.scale[1]})
              skew(${frame.skew[0]}deg, ${frame.skew[1]}deg)
            `,
            transformOrigin: "top left",
          }}
        >
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          />
        </div>
      )}

      {selected && (
        <Moveable
          target={targetRef.current}
          container={containerRef.current}
          origin={true}
          draggable={true}
          resizable={true}
          rotatable={true}
          scalable={true}
          skewable={true}
            throttleDrag={0}
  throttleResize={0}
  throttleRotate={0}
          onDrag={({ beforeTranslate }) => {
            setFrame((prev) => ({ ...prev, translate: beforeTranslate }));
          }}
          onResize={({ width, height, drag }) => {
            if (targetRef.current) {
              targetRef.current.style.width = `${width}px`;
              targetRef.current.style.height = `${height}px`;
            }
            setFrame((prev) => ({
              ...prev,
              translate: drag.beforeTranslate,
            }));
          }}
          onRotate={({ beforeRotate }) => {
            setFrame((prev) => ({ ...prev, rotate: beforeRotate }));
          }}
          onScale={({ scale, drag }) => {
            setFrame((prev) => ({
              ...prev,
              scale,
              translate: drag.beforeTranslate,
            }));
          }}
          onSkew={({ skew }) => {
            setFrame((prev) => ({ ...prev, skew }));
          }}
        />
      )}
    </div>
  );
};

export default UploadableImageEditor;
