import { useState, useRef } from "react";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    audioChunksRef.current = [];
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob); // Generate a URL for the Blob
      setAudioUrl(audioUrl); // Set the audio URL for playback
       console.log(audioBlob)
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("file", audioBlob);

      await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <div>
        <button onClick={stopRecording}>Stop Recording</button> <br />
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {audioBlob && (
        <div>
          <button onClick={uploadAudio}>Upload Audio</button>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
