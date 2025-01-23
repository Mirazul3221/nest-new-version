"use client";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";

const VoiceRecorder = ({ isStartRecord, setIsStartRecord }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
  const mediaStream = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log("Media stream started:", mediaStream.current);

      ////////////////////////////////////////////////////////////////
      const mediaRecorder = new MediaRecorder(mediaStream.current);

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;
      ///////////////////////////////////////////////////////////////
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      //////////////////////////////////////////////////////////////
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob); // Generate a URL for the Blob
        setAudioUrl(audioUrl); // Set the audio URL for playback
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((track) => track.stop());
          console.log("Media stream stopped.", mediaStream.current);
          mediaStream.current = null;
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const stopMediaStream = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      console.log("Media stream stopped.", mediaStream.current);
      mediaStream.current = null;
    }
  };

  /////////////////////////////////////////////////////////////////////////////
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
  isStartRecord && startRecording();

  const voiceCountRef = useRef();
  let [second, minute] = [0, 0];
  let timer = null;
  const counterVoice = () => {
    second++;
    if (second == 60) {
      second = 0;
      minute++;
      if (minute == 60) {
        minute = 0;
      }
    }
    let s = second < 10 ? "0" + second : second;
    let m = minute < 10 ? "0" + minute : minute;
    if (voiceCountRef.current) {
      voiceCountRef.current.innerText = `${m}:${s}`;
    }
  };

  const startCounting = () => {
    if (timer !== null) {
      clearInterval(timer);
    }
    timer = setInterval(counterVoice, 1000);
  };
  const stopCounting = () => {
    clearInterval(timer);
  };
  isStartRecord && startCounting();
  !isStartRecord && stopCounting();
  return (
    <>
      {!isStartRecord && (
        <div
          onClick={() => {
            setIsStartRecord(true);
          }}
          className="pl-4 pr-2"
        >
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100">
            <img
              className="w-5 cursor-pointer"
              src="/microphone.png"
              alt="message"
            />
          </div>
        </div>
      )}
       {
        isStartRecord && 
        <div className="w-full">
          <div className="p-4 flex justify-between items-center gap-2">
            <div
              onClick={() => {
                setIsStartRecord(false), stopMediaStream();
              }}
              className="p-2 cursor-pointer bg-gray-200 rounded-full"
            >
              <FaTimes />
            </div>
            <div className="flex justify-between items-center px-6 py-1 bg-gray-200 w-full rounded-full">
              <div
                onClick={stopCounting}
                className="w-6 h-6 bg-white rounded-full flex justify-center items-center"
              >
                <div className="w-3 h-3 bg-slate-400 cursor-pointer"></div>
              </div>
              <div
                ref={voiceCountRef}
                className=" bg-white rounded-full px-4 py-[3px]"
              >
                00:00
              </div>
            </div>
            <div
              onClick={() => {
                stopRecording(), setIsStartRecord(false);
              }}
              className="cursor-pointer"
            >
              <VscSend />
            </div>
          </div>
        </div>
       }
    </>
  );
};

export default VoiceRecorder;
