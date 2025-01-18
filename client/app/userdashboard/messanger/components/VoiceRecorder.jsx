'use client'
import React, { useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { VscSend } from "react-icons/vsc";

const VoiceRecorder = ({startRecord,setStartRecord}) => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
   const mediaStream = useRef(null)
   const mediaRecorderRef = useRef(null);
   const audioChunksRef = useRef([]);

   

    const startRecording =async () => {
       try {
        mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Media stream started:",  mediaStream.current);

        ////////////////////////////////////////////////////////////////
        const mediaRecorder = new MediaRecorder( mediaStream.current);

        audioChunksRef.current = [];
        mediaRecorderRef.current = mediaRecorder;
        ///////////////////////////////////////////////////////////////
        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
        //////////////////////////////////////////////////////////////
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
            setAudioBlob(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob); // Generate a URL for the Blob
            setAudioUrl(audioUrl); // Set the audio URL for playback
             console.log(audioBlob)
             if(mediaStream.current){
                mediaStream.current.getTracks().forEach((track) => track.stop());
                console.log("Media stream stopped.",mediaStream.current);
                mediaStream.current = null;
             }
          };
      
          mediaRecorder.start();
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    }
////////////////////////////////////////////////////////////////////////////////
    const stopRecording = () => {
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
          }
    }

    const stopMediaStream = () => {
        if(mediaStream.current){
            mediaStream.current.getTracks().forEach((track) => track.stop());
            console.log("Media stream stopped.",mediaStream.current);
            mediaStream.current = null;
         }
    }

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
       startRecord && startRecording()
  return (
    <div className='p-4 flex justify-between items-center gap-2'>
        <div onClick={()=>{setStartRecord(false),stopMediaStream()}} className="p-2 cursor-pointer bg-gray-200 rounded-full"><FaTimes /></div> 
        <div className="flex justify-between items-center px-6 py-1 bg-gray-200 w-full rounded-full">
            <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center">
                <div className="w-3 h-3 bg-slate-400 cursor-pointer"></div>
            </div>
            <div className=" bg-white rounded-full px-4 py-[3px]">
                12/17
            </div>
        </div>
        <div className='cursor-pointer'><VscSend /></div> 
    </div>
  )
}

export default VoiceRecorder
