"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { BsFillStopFill, BsFillPlayFill } from "react-icons/bs";

export default function MiniMessagePlayer({ url, userType = "me" }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null); // Persist wavesurfer instance
  const [playPause, setPlayPause] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    try {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: userType === "me" ? "#969696" : "gray",
        progressColor: userType === "me" ? "white" : "black",
        url: url,
        hideScrollbar: true,
        normalize: true,
        barGap: 5,
        height: 40,
        barHeight: 20,
        barRadius: 10,
        barWidth: 3,
        autoplay: false, // Prevents auto-play issues on mobile
        interact: true, // Allows users to seek
      });

      const wavesurfer = wavesurferRef.current;

      wavesurfer.on("ready", () => {
        setDuration(wavesurfer.getDuration());
      });

      wavesurfer.on("audioprocess", () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on("finish", () => {
        wavesurfer.stop();
        setCurrentTime(0);
        setPlayPause(false);
      });
    } catch (error) {
      console.error("WaveSurfer initialization error:", error);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [url]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setPlayPause((prev) => !prev);
    }
  };

  return (
    <div
      className={`p-4 w-[58vw] md:w-[18vw] ${
        userType === "me" ? "bg-[#3e19fa]" : "bg-gray-200"
      } rounded-2xl shadow-lg`}
    >
      <div className="relative flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          className={`text-white ${
            userType === "me"
              ? "bg-[#969696] hover:bg-white/50"
              : "bg-[#969696] hover:bg-black/50"
          } p-2 rounded-full`}
          onClick={handlePlayPause}
        >
          {playPause ? <BsFillStopFill /> : <BsFillPlayFill />}
        </button>

        {/* Waveform */}
        <div ref={waveformRef} className="w-full h-full" />

        {/* Time Display */}
        <div
          className={`w-20 ${
            userType === "me" ? "text-white" : "text-gray-500"
          } flex`}
        >
          {`${Math.floor(currentTime)}s / ${Math.floor(duration)}s`}
        </div>
      </div>
    </div>
  );
}
