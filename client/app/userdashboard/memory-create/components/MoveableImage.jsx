"use client";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";

const MoveableImage = ({ imgSrc, storyText, colorCode }) => {
  console.log(colorCode);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const frame = {
    translate: [0, 0],
    scale: [1, 1],
    rotate: 0,
    matrix: null,
  };
  const [target, setTarget] = useState(null);
  const handleDownload = async () => {
    const element = sectionRef.current;
    if (!element) return;

    // Hide moveable control handles
    const moveableControls = document.querySelectorAll(".moveable-control-box");
    moveableControls.forEach((el) => (el.style.display = "none"));

    // Save original border radius
    const originalBorderRadius = element.style.borderRadius;
    element.style.borderRadius = "0";

    // Wait for styles to apply
    await new Promise((r) => setTimeout(r, 50));

    // Capture the canvas
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: null,
    });

    // Restore original styles
    element.style.borderRadius = originalBorderRadius;
    moveableControls.forEach((el) => (el.style.display = "")); // show again

    // Download image
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "section-image.jpg";
    link.click();
  };

  function updateTransform(useMatrix = false) {
    if (!target) return;

    if (useMatrix && frame.matrix) {
      target.style.transform = `matrix3d(${frame.matrix.join(",")})`;
    } else {
      const [x, y] = frame.translate;
      const [scaleX, scaleY] = frame.scale;
      const rotate = frame.rotate;

      target.style.transform = `
          translate(${x}px, ${y}px)
          rotate(${rotate}deg)
          scale(${scaleX}, ${scaleY})
        `;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        imageRef.current &&
        textRef.current &&
        !imageRef.current.contains(event.target) &&
        !textRef.current.contains(event.target) &&
        !event.target.closest(".moveable-control-box")
      ) {
        setTarget(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex justify-center items-center bg-black/90">
      <div
        ref={sectionRef}
        className="relative flex justify-center items-center w-[300px] h-[80vh] rounded-md border-2 bg-gray-200 overflow-hidden"
      >
        {storyText && (
          <h2
            onClick={(e) => {
              e.stopPropagation();
              setTarget(textRef.current);
            }}
            ref={textRef}
            style={{ color: colorCode }}
            className={`break-words max-w-full p-3 mx-auto text-center absolute z-30`}
          >
            {storyText}
          </h2>
        )}
        <img
          onClick={(e) => {
            e.stopPropagation(); // Prevent bubbling to document click
            setTarget(imageRef.current);
          }}
          onLoad={() => {
            setTarget(imageRef.current); // Set target after image is loaded
          }}
          ref={imageRef}
          src={imgSrc}
          alt="Moveable"
          className="absolute cursor-move"
        />

        <Moveable
          target={target}
          container={null}
          draggable={true}
          resizable={true}
          rotatable={true} // ✅ Add this
          warpable={true} // ✅ Add this for skew
          throttleDrag={0}
          throttleResize={0}
          throttleRotate={0}
          onDrag={({ beforeTranslate }) => {
            frame.translate = beforeTranslate;
            updateTransform();
          }}
          onResize={({ width, height, drag }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            const [x, y] = drag.beforeTranslate;
            frame.translate = [x, y];
            updateTransform();
          }}
          onRotate={({ beforeRotate }) => {
            frame.rotate = beforeRotate;
            updateTransform();
          }}
          onWarp={({ matrix }) => {
            frame.matrix = matrix;
            updateTransform(true); // Pass true to use matrix/
          }}
        />
      </div>
      <div>
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download as JPG
        </button>
      </div>
    </div>
  );
};

export default MoveableImage;
