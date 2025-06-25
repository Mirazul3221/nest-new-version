"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Import custom blot
import Quill from "quill";
import CustomVideo from "../utils/customVideoBlot";

const Editor = ({ change, onChange }) => {
//   useEffect(() => {
//     // Register the custom blot only once
//     if (typeof window !== "undefined" && !Quill.imports["formats/video-custom"]) {
//       Quill.register(CustomVideo, true);
//     }
//   }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image", "video"],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        [{ direction: "rtl" }],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="editor-container">
      <ReactQuill
        value={change}
        onChange={onChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default Editor;
