import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage"; // path to your crop util
import "./EasyCropper.css";

const EasyCropper = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [textPos, setTextPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const onCropComplete = (_, croppedPixels) => setCroppedAreaPixels(croppedPixels);

  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    setTextPos({
      x: e.clientX - container.left - offsetRef.current.x,
      y: e.clientY - container.top - offsetRef.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const generateFinalImage = async () => {
    if (!croppedAreaPixels) return;

    const croppedCanvas = await getCroppedImg(image, croppedAreaPixels, rotation);
    const ctx = croppedCanvas.getContext("2d");

    // Draw text on canvas
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Floating Text", textPos.x, textPos.y + 30); // adjust baseline

    // Convert canvas to blob or base64
    croppedCanvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("file", blob, "combined-image.png");

      // Send via API
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => console.log("Uploaded!", res));
    }, "image/png");
  };


// Auto-zoom image to fill 70vh crop frame height

  return (
    <div>
      <div
        className="relative w-[400px] h-[70vh] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={200 / 300}
          cropShape="rect"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            cropAreaClassName: "rounded-crop-area",
          }}
        />

        <div
          className="absolute text-white font-bold text-xl cursor-move select-none"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${textPos.x}px, ${textPos.y}px)`,
            transition: dragging ? "none" : "transform 0.1s ease",
          }}
        >
          Floating Text
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center text-white gap-4 flex-wrap">
        <button onClick={() => setRotation((r) => (r - 90) % 360)}>⟲ Rotate Left</button>
        <button onClick={() => setRotation((r) => (r + 90) % 360)}>⟳ Rotate Right</button>
        <button onClick={generateFinalImage}>✅ Generate Image</button>
      </div>
    </div>
  );
};

export default EasyCropper;
