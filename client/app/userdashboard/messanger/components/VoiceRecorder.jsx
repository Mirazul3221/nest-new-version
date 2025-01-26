"use client";
import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";
import { useStore } from "@/app/global/DataProvider";
import { baseurl } from "@/app/config";
import { useSocket } from "../../global/SocketProvider";
import { useMessage } from "../../global/messageProvider";

const VoiceRecorder = ({
  isStartRecord,
  setIsStartRecord,
  hiddenTarget,
  receiverId,
  replyContent,
  toReplyerId,
  scrollToBottom,
}) => {
  const { store } = useStore();
    const { dispatch } = useMessage();
      const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
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
      const mediaRecorder = new MediaRecorder(mediaStream.current);

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecordingAndPrepareBlob = () =>
    new Promise((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob); // Generate a URL for playback
          setAudioUrl(audioUrl);

          if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((track) => track.stop());
            mediaStream.current = null;
          }

          resolve(audioBlob);
        };

        mediaRecorderRef.current.stop();
      } else {
        resolve(null);
      }
    });

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      await stopRecordingAndPrepareBlob();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(0);
      }
    }
  };

  const uploadAudio = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setTime(0);
    }
    const blob = await stopRecordingAndPrepareBlob(); // Ensure blob is prepared
    if (blob) {
      const formData = new FormData();
      formData.append("receiverId", receiverId); // Add receiverId
      formData.append("voice", blob);
      formData.append(
        "reply",
        JSON.stringify([replyContent.innerText, toReplyerId])
      );

      try {
        setLoading(true);
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
        setTimeout(() => {
          scrollToBottom();
        }, 500);
        setIsStartRecord(false);
        socket && socket.emit("message-to", data);
        dispatch({ type: "send-message", payload: data });
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No audio blob available to upload.");
      setLoading(false);
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
                <div className="bg-white rounded-full px-2 py-[3px]">
                  <h1>
                    {minute}:{second < 10 ? "0" + second : second}
                  </h1>
                </div>
              </div>
            )}

            {playRecord && <AudioPlayer audioSrc={audioUrl} duration={currentTime} />}
            {loading ? (
              "Loading..."
            ) : (
              <div onClick={uploadAudio} className="cursor-pointer">
                Send
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceRecorder;