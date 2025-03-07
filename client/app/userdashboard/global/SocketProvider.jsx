"use client";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import socketContext from "./socketContext";
import storeContext from "@/app/global/createContex";
const SocketProvider = ({ children }) => {
  let mysocketUrl = "https://edu-socket.onrender.com";
  // mysocketUrl = "http://localhost:3001";
  const { store } = useContext(storeContext);
  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStram] = useState(null);
  const [remoteStream,setRemoteStream] = useState(null);
  const [myActiveFriends, setMyActiveFriends] = useState(null);
  useEffect(() => {
    const socketInstance = io(mysocketUrl, {
      query: {
        myId: store?.userInfo?.id,
      },
    });
    setSocket(socketInstance);
    socketInstance?.emit("myUserInfo", {
      id: store?.userInfo?.id,
      name: store.userInfo.name,
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on("onlineFriends", (res) => {
        setMyActiveFriends(res);
        console.log(res);
      });
    return () => {
      socket?.off("onlineFriends");
    };
  }, [socket]);

  /////////////////////All logic for webRTC/////////////////////////////
  const peearConnectionRef = useRef(null);
  const CreatePeearConnection = useCallback(() => {
    if (typeof window !== undefined) {
      const config = {
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      };
      peearConnectionRef.current = new RTCPeerConnection(config)
    }
  }, []);

  useEffect(() => {
    CreatePeearConnection()
    return () => {
      if (peearConnectionRef.current) {
         peearConnectionRef.current.close()
         peearConnectionRef.current = null
      }
    };
  }, []);
  ////////////////////////////////////////////////////////////////////
const newIceCandidate = (socket)=>{
  peearConnectionRef.current.onicecandidate = (event)=>{
    if (event.candidate) {
      console.log(event.candidate)
      socket?.emit('ice-candidate',event.candidate)
    }
   }
}

  ///////////////////////////Create a offer///////////////////////////
const createOffer = async()=>{
  if (peearConnectionRef.current) {
     const offer = await peearConnectionRef.current.createOffer()
     await peearConnectionRef.current.setLocalDescription(offer)
     return offer
  }
}

//////////////////////Create answer//////////////////////////
const createAnswer = async(offer)=>{
  if (peearConnectionRef.current) {
     await peearConnectionRef.current.setRemoteDescription(offer)
     const answer = await peearConnectionRef.current.createAnswer()
     await peearConnectionRef.current.setLocalDescription(answer)
     return answer
  }
}
///////////////////////////////////////////////////////
const setRemoteAns = async(ans)=>{
  if (peearConnectionRef.current) {
   await peearConnectionRef.current.setRemoteDescription(ans)
  }}
  /////////////////////////////////////////////////////
  /////////////////////////Send stream to rtc///////////////////////
  const sendStream = async(stream)=>{
    const tracks = stream?.getTracks();
    tracks.forEach(track=>{
      peearConnectionRef.current.addTrack(track,stream)
    })
}
////////////////////get remote stream//////////////////////\par
// const handleTrackEvent = useCallback((ev)=>{
//   const streams = ev.streams; 
//   setRemoteStream(streams[0])
// },[])

// useEffect(() => {
//   peearConnectionRef.current.addEventListener('track',handleTrackEvent)
//   return () => {
//     peearConnectionRef.current.removeEventListener('track',handleTrackEvent)
//   };
// }, [peearConnectionRef.current,handleTrackEvent]);
/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
  return (
    <socketContext.Provider value={{ socket,peearConnectionRef, myActiveFriends,createOffer,createAnswer,setRemoteAns,sendStream,remoteStream}}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const socketCall = useContext(socketContext);
  return socketCall && socketCall;
};
// console.log(useSocket())