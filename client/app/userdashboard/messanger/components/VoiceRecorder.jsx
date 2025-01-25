"use client";
import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";
import { useStore } from "@/app/global/DataProvider";
import { baseurl } from "@/app/config";

const VoiceRecorder = ({ isStartRecord, setIsStartRecord, hiddenTarget,receiverId,replyContent,toReplyerId}) => {
   const { store } = useStore();
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
  const [time, setTime] = useState(0); // To keep track of the timer
  const [currentTime, setCurrentTime] = useState(null);
  const [playRecord, setPlayRecord] = useState(false);

  const mediaStream = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);

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
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(0);
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("receiverId", receiverId); // Add receiverId
      formData.append("voice", audioBlob);
      formData.append(
        "reply",
        JSON.stringify([replyContent.innerText, toReplyerId])
      ); // Add reply as a string if it's an array or object

      try {
        const { data } = await axios.post(
          `${baseurl}/messanger/voice-create`,
          formData, // Pass FormData as the body
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
              "Content-Type": "multipart/form-data", // Ensure Content-Type is set correctly
            },
          }
        );

        // socket && socket.emit("message-to", data);
        // dispatch({ type: "send-message", payload: data });

        console.log(data)
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
      }
    }
  };


  const second = time % 60;
  const minute = Math.floor(time / 60);
  return (
    <>
      {!hiddenTarget && (
        <div>
          {!isStartRecord && (
            <div
              onClick={() => {
                setIsStartRecord(true);
                startRecording();
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
        </div>
      )}
      {isStartRecord && (
        <div className="w-full">
          <div className="p-4 flex justify-between items-center gap-2">
            <div
              onClick={() => {
                setIsStartRecord(false);
                stopRecording();
                setPlayRecord(false);
                setCurrentTime(null);
              }}
              className="p-2 cursor-pointer bg-gray-200 rounded-full"
            >
              <FaTimes />
            </div>
            {!playRecord && (
              <div className="flex justify-between items-center px-4 py-1 bg-gray-200 w-full rounded-full">
                <div
                  onClick={() => {
                    stopRecording();
                    setCurrentTime(time);
                    setPlayRecord(true);
                  }}
                  className="w-6 h-6 bg-black rounded-full flex justify-center items-center"
                >
                  <div className="w-3 h-3 bg-white cursor-pointer"></div>
                </div>
                <div className=" bg-white rounded-full px-2 py-[3px]">
                  <h1>
                    {minute}:
                    {second < 10 ? "0" + second : second}
                  </h1>
                </div>
              </div>
            )}

            {playRecord &&  <AudioPlayer audioSrc={audioUrl} duration={currentTime} />}
            <div
              onClick={() => {
                stopRecording(); setIsStartRecord(false); setPlayRecord(false);uploadAudio()
              }}
              className="cursor-pointer"
            >
              <VscSend />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceRecorder;
//
