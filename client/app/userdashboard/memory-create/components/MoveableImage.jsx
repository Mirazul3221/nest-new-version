"use client";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import html2canvas from "html2canvas";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Moveable from "react-moveable";
import { commonLogout } from "../../components/common";
import { useRouter } from "next/navigation";
import { useGlobalData } from "../../global/globalDataProvider.jsx";

const MoveableImage = forwardRef((prop,ref) => {
  const { imgSrc, storyText, colorCode, font } = prop;
  const {appData,dispatch:globalDispatch} = useGlobalData()
  const { store, dispatch } = useStore();
  const router = useRouter()
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

  const handleUpload = async () => {
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

    // Capture the canvas as JPEG
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: null,
    });

    // Restore original styles
    element.style.borderRadius = originalBorderRadius;
    moveableControls.forEach((el) => (el.style.display = ""));

    // Convert canvas to JPEG base64 string
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Prepare base64 string for Cloudinary upload (remove the prefix)
    const base64Data = imgData.replace(/^data:image\/jpeg;base64,/, "");
    // Setup FormData for upload
    const formData = new FormData();
    formData.append("file", `data:image/jpeg;base64,${base64Data}`);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // <-- Replace this
    formData.append("format", "jpg"); // Force JPG format on Cloudinary
    formData.append("type", "image"); // Force JPG format on Cloudinary
    try {
      const { data } = await axios.post(
        `${baseurl}/usermemory/image-memory-build`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      if(appData.userMemories.length > 0 && appData.userMemories[0].user._id == store.userInfo.id){
       const ifOthers = appData.userMemories.filter((f)=>{
       return f.user._id !== store.userInfo.id
       })
        appData.userMemories[0].stories=[data,...appData.userMemories[0].stories];
        const finalData = [appData.userMemories[0],...ifOthers];
        globalDispatch({type:'ADD_NEW_MEMORY',payload:finalData});
      } else {
        const finalData = [{user:{_id:store.userInfo.id,name:store.userInfo.name,profile:store.userInfo.profile},stories:[data]},...appData.userMemories]
         globalDispatch({type:'ADD_NEW_MEMORY',payload:finalData});
      }
    router.push('/')
    } catch (error) {
        commonLogout(dispatch, error);
    }
  };
  // Expose the function to parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
      handleUpload
  }));
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
    <div className="md:w-full md:h-full overflow-hidden flex justify-center items-center">
      <div
        ref={sectionRef}
        className="relative flex justify-center items-center w-[80vw] md:w-[300px] h-[80vh] rounded-md border-2 bg-gray-200 overflow-hidden"
      >
        {storyText && (
          <h2
            onClick={(e) => {
              e.stopPropagation();
              setTarget(textRef.current);
            }}
            ref={textRef}
            style={{ color: colorCode, fontSize: font + "px" }}
            className={`break-words cursor-pointer max-w-full p-3 mx-auto text-center absolute z-30`}
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
    </div>
  );
});

export default MoveableImage;
