'use client'

import { useState, useRef } from "react";

export default function VoiceRecorder({startRecord,setStartRecord}) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true }); 
    const mediaRecorder = new MediaRecorder( streamRef.current);

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
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null

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
   startRecord && startRecording()
   const stopRecord = () => {
    console.log(streamRef.current)
     streamRef.current.getTracks().forEach((track) => track.stop());
     streamRef.current = null
     console.log(streamRef.current)
   }
  return (
    <div>
      <div onClick={stopRecord}>Button</div>
         {
          startRecord && <div className="">
                    <button onClick={()=>{stopRecording,setStartRecord(false)}}>Stop Recording</button> <br />
      {!recording ? (
        <button>Start Recording</button>
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
         }
    </div>
  );
}
