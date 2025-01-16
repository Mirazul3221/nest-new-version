import { useState, useRef, useEffect } from "react";

export default function CustomVoicePlayer({audioUrl, audioBlob }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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

  // Update progress bar and time
  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio && progressRef.current) {
      setCurrentTime(audio.currentTime);
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      progressRef.current.style.width = `${progressPercentage}%`;
    }
  };

  // Load audio metadata to get duration
  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () =>
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
    }
  }, [audioBlob]);
  return (
    <div style={styles.playerContainer}>
      <button onClick={togglePlay} style={styles.playButton}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div style={styles.progressContainer}>
        <div ref={progressRef} style={styles.progress}></div>
      </div>
      <span style={styles.time}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      ></audio>
    </div>
  );
}

// Styles
const styles = {
  playerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#e8f4ff",
    borderRadius: "10px",
    width: "300px",
  },
  playButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
  },
  progressContainer: {
    flex: 1,
    height: "20 bbpx",
    backgroundColor: "#d6eaff",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
  },
  progress: {
    height: "100%",
    width: "0%",
    backgroundColor: "#007bff",
    transition: "width 0.1s linear",
  },
  time: {
    fontSize: "14px",
    color: "#007bff",
  },
};
