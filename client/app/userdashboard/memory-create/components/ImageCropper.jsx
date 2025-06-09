"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({imgSrc}) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);

      const onImageLoad = useCallback((img) => {
        imageRef.current = img;
    
        // Center crop in % units (for aspect ratio = 1)
        const width = 60; // 80% of the image width
        const height = 45; // 80% of the image height (same for 1:1 aspect)
        const x = (100 - width) / 2;
        const y = (100 - height) / 2;
    
        setCrop({
          unit: "%",
          x,
          y,
          width,
          height,
        });
    
        setCompletedCrop({
          unit: "%",
          x,
          y,
          width,
          height,
        });
      }, []);
  return (
    <div className="relative w-1/2 h-3/2">
      <ReactCrop
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={(c) => {
          setCompletedCrop(c);
        }}
        aspect={1}
      >
        <img src={imgSrc} onLoad={(e) => onImageLoad(e.target)} />
      </ReactCrop>
      <canvas
        className="absolute top-0 right-0 z-20"
        ref={canvasRef}
        style={{
          maxWidth: "50px",
          maxHeight: "50px",
        }}
      />
    </div>
  );
};

export default ImageCropper;
