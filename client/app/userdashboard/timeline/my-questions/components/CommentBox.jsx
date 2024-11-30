"use client";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const messangerRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSendComment = ()=>{
    console.log(message)
  }
  return (
    <div>
      <div className="footer flex justify-between items-center mt-2 text-gray-500">
        <div className="like mb-2 flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer p-2">
          <FaRegThumbsUp size={22} />
          <span>Like</span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="comment flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer py-2 px-4"
        >
          <FaRegCommentDots size={22} />
          <span>Comment</span>
        </div>
        <div className="Share flex items-center gap-2 hover:bg-gray-100 duration-150 rounded-full cursor-pointer py-2 px-4">
          <LuShare2 size={22} />
          <span>Share</span>
        </div>
      </div>
      <div
        className={`flex items-end gap-2 ${
          open ? "max-h-[100vh] duration-[2s]" : "max-h-0 duration-1000"
        } hidden_scroll overflow-y-scroll`}
      >
        <textarea
          ref={messangerRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          style={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
            padding: "6px 14px",
            paddingBottom:'10 px',
            boxSizing: "border-box",
            outline: "none",
            border: "none",
            borderRadius: "20px",
            background: "#f5f5f5",
          }}
        />
              <div
              onClick={handleSendComment}
              className="flex z-50 h-full items-start cursor-pointer mb-2 text-gray-500"
            >
              <RiSendPlaneLine size={20} />
            </div>
      </div>
    </div>
  );
};

export default CommentBox;
