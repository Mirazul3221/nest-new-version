"use client";
import React, { useRef } from "react";

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
        style={{ borderRadius: "10px", objectFit: "cover",transform:scaleX(-1) }}
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
