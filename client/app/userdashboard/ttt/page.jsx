"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
} from "react-icons/bs";

export default function Home({url,userType='me'}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null); // Use ref to persist wavesurfer instance
  const [playPause, setPlayPause] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: `${userType=='me' ? '#969696' : 'gray'}`,
      progressColor: `${userType=='me' ? 'white' : 'black'}`,
      url: "/rington.m4a",
      dragToSeek: true,
      hideScrollbar: true,
      normalize: true,
      barGap: 10,
      height: 60,
      barHeight: 30,
      barRadius: 20,
      barWidth: 5,
    });
  
    const wavesurfer = wavesurferRef.current;
  
    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
    });
  
    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });
  
    wavesurfer.on("finish", () => {
      wavesurfer.stop(); // Reset the progress bar
      setCurrentTime(0); // Reset the current time
      setPlayPause(false); // Set play state to false
    });
  
    return () => {
      wavesurfer.destroy();
    };
  }, []);
  

  const handlePause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setPlayPause(!playPause);
    }
  };
  return (
    <div className={`w-full max-w-lg p-4 ${userType=='me' ? 'bg-violet-500' : 'bg-gray-200'} rounded-lg shadow-lg`}>
    <div className="relative flex gap-4">
    <div className="flex justify-between items-center">
      <button
        className="text-white bg-[#969696] hover:bg-black p-2 rounded-full"
        onClick={handlePause}
      >
        {playPause ? <BsFillStopFill /> : <BsFillPlayFill />}
      </button>
    </div>
      <div ref={waveformRef} className="w-full h-full" />
      <div className={`w-20 ${userType == 'me' ? 'text-white' : 'text-gray-500'} flex mt-8`}>
        {`${Math.floor(currentTime)}s / ${Math.floor(duration)}s`}
      </div>
    </div>
  </div>
  );
}
