"use client";
import React, { useRef } from "react";
import './video.css'
const MyVideoStream = ({ stream }) => {
  const localuserRef = useRef(null);
  if (stream && localuserRef.current) {
    localuserRef.current.srcObject = stream;
  }
  console.log(localuserRef);
  console.log(stream);
  return (
    <div>
      <video
        style={{ borderRadius: "10px", objectFit: "cover" }}
        ref={localuserRef}
        autoPlay
        muted
        className="w-full"
      />
      {stream?.id}
    </div>
  );
};

export default MyVideoStream;
