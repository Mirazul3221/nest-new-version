"use client";
import React, { useRef, useState } from "react";

const ModifyPlayButton = () => {
  const audioRef = useRef(null);
  const [countAudio, setCountAudio] = useState('00:00');
  const [percentage,setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);

  // Play or Pause Audio
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      setPercentage(progressPercentage)
      const s = 1;
      const m = 60 * s;
      const h = m * 60;
      const getMinute = Math.floor(((audio.duration - audio.currentTime) % h) / m);
      const getSecond = Math.floor((audio.duration - audio.currentTime) % m);
      const sn = getSecond < 10 ? "0" + getSecond : getSecond;
      const md = getMinute < 10 ? "0" + getMinute : getMinute
      setCountAudio(`${md}:${sn}`);
    }
  };
  return (
<div>
  <div className="audio_container rounded-full mt-20 overflow-hidden bg-gray-200 relative py-2">
    <div style={{width:`${percentage}%`}}
      className={`absolute h-full rounded-full top-0 left-0 bg-violet-500 z-0`}
    ></div>
     <div className="relative z-10 flex px-6 justify-between items-center">
     <span
      onClick={togglePlay}
      className="px-2 py-1 bg-white border rounded-full cursor-pointer"
    >
      {isPlaying ? "stop" : "play"}
    </span>
    <span
      className="px-2 py-1 bg-white border rounded-full cursor-pointer"
    >
      {countAudio}
    </span>
     </div>
    <audio
      ref={audioRef}
      src={"/rington.m4a"}
      onTimeUpdate={updateProgress}
      onEnded={() => {
        setIsPlaying(false);
      }}
    ></audio>
  </div>
</div>
  );
};

export default ModifyPlayButton;
