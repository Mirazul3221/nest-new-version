"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomVoicePlayer({ audioSrc, duration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        cancelAnimationFrame(animationRef.current); // Stop animation
      } else {
        audio.play();
        animationRef.current = requestAnimationFrame(updateProgress); // Start smooth progress
        
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Smooth Progress Update
  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const current = audio.currentTime;
      const progressPercentage = (current / duration) * 100;

      setCurrentTime(current);
      if(progressBar.current){
        progressBar.current.style.width = progressPercentage + '%';
      }

      if (!audio.paused && !audio.ended) {
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    }
  };

  const sec = Math.max(0,(duration - Math.floor(currentTime)) % 60);
  const progressBar = useRef(null)
  return (
    <div className="w-full bg-gray-200 relative px-4 flex justify-between items-center py-1 overflow-hidden rounded-full">
      <div ref={progressBar}
        className="absolute z-0 top-0 left-0 h-full bg-gray-300 transition-all"
      ></div>
      <button className="relative z-10" onClick={togglePlay}>
        {isPlaying ? (
          <img
            className="w-[30px] p-1 bg-white rounded-full"
            src="/play-btn/play.jpg"
            alt="play"
          />
        ) : (
          <img
            className="w-[30px] p-1 rounded-full bg-white"
            src="/play-btn/paused.jpg"
            alt="play"
          />
        )}
      </button>

      <div className="relative z-10 bg-white rounded-full px-2 py-[3px]">
      <h1>{Math.max(0,Math.floor((duration - Math.floor(currentTime)) / 60))}:{sec < 10 ? '0' + sec : sec}</h1>
      </div>
      <audio onEnded={() => {
           setTimeout(() => {
            progressBar.current.style.width = 0 + '%';
           }, 100);
            setCurrentTime(0);
            setIsPlaying(false)
      }} ref={audioRef} src={audioSrc}></audio>
    </div>
  );
}
