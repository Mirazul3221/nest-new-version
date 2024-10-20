"use client";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import storeContext from "@/app/global/createContex";
import { useSocket } from "@/app/userdashboard/global/SocketProvider";
import MyVideoStream from "./MyVideoStream";
import { PeerConnection } from "./webRTC";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { IoVideocamOffOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { MdCallEnd } from "react-icons/md";
import './video.css'
const Page = () => {
  const data = useSearchParams();
  // const [localStream, setLocalStream] = useState(null);
  const [myFace, setMyFace] = useState(true);
  const [isRing, setIsRing] = useState(true);
  const [isRemoteRing, setIsRemoteRing] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [localStream, setLocalStram] = useState(null);
  // const [attached,setAttached] = useState(false)
  const [toggleVid, setToggleVid] = useState(false);
  const [toggleMick, setToggleMick] = useState(false);
  const { store } = useContext(storeContext);
  const myId = data.get("my_peear");
  const fdId = data.get("friend_peear");
  const name = data.get("name");
  const profile = data.get("profile");
  const type = data.get("type");
  const action = data.get("action");
  const [callInv, setCallInv] = useState(action);
  //  const invokeSocket = useCallback(()=>{
  //    const {socket} = useSocket()
  //   return socket
  //  },[])
  const { socket } = useSocket();
  const myStream = useRef(null);
  const remoteStream = useRef(null);
  const peearConnectionRef = useRef(null);
  const remoteRef = useRef(null);
  //////////////////////////////////////////////////////////////////////////////
  ////////////////////////global media stream call here////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const generateStream = async () => {
    const videoConstraints = {
      width: { ideal: 640 },
      height: { ideal: 360 },
      frameRate: { ideal: 15 }
    };
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video:  {
        width: {
          ideal: 380,
          min: 380,
          max: 1920,
        },
        height: {
          ideal: 200,
          min: 200,
          max: 1280,
        },
        frameRate: { ideal: 10 }
        // facingMode: { exact: "user" },
      },
    });
    //////////////////////////////////////////
    // if (callInv === "call-start") {
    //   const mike = stream?.getAudioTracks()[0];
    //   mike.enabled = !mike.enabled;
    // }
    const devices = await navigator.mediaDevices.enumerateDevices();
    setDeviceInfo(devices);
    setLocalStram(stream);
    return stream;
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////webRTC logic start from here/////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const CreatePeearConnection = useCallback(async () => {
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

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const configuration = {
              iceServers: [
                // STUN server
                {
                  urls: 'stun:stun.l.google.com:19302'  // Replace with your STUN server address
                },
                {
                  urls: 'stun:global.stun.twilio.com:3478'  // Replace with your STUN server address
                },
                // TURN server with credentials
                {
                  urls: 'turn:192.158.29.39:3478?transport=tcp',  // Replace with your TURN server address
                  username: '28224511:1379330808',        // Replace with your TURN server username
                  credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='     // Replace with your TURN server credential
                }
              ]
            };
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const rtc = await new RTCPeerConnection(configuration);
      ///////////////////////////////////////////////////////////////////////////////////////////////
    //  const sender = rtc.getSenders()[0];
    //  const params = sender.getParameters();
    //  params.encodings = [
    //   { rid: 'low', maxBitrate: 500000 },  // Low resolution stream
    //   { rid: 'med', maxBitrate: 1500000 }, // Medium resolution stream
    //   { rid: 'high', maxBitrate: 3000000 } // High resolution stream
    //  ];
    //  sender.setParameters(params);

      //////////////////////////////add local stream to peer connection//////////////////////////////
      if (myStream.current !== null) {
        myStream.current.getTracks().forEach((track) => {
          rtc.addTrack(track, myStream.current);
        });
      }
      ////////////////////listen to remote stream and add to peer connection/////////////////////////
      rtc.ontrack = function (event) {
        remoteStream.current = event.streams[0];
        remoteRef.current.srcObject = event.streams[0];
        console.log(event.streams[0]);
      };
      ////////////////////////////////////////////////////////////////////////////////////////////////
      // listen for ice candidate

      /////////////////////////
      return rtc;
    }
  }, []);

  //////////////////////////////////////globally call both stram and rtc for one time call////////////////////////////////////
  useEffect(() => {
    async function callStream() {
      myStream.current = await generateStream();
      const rtcCall = await CreatePeearConnection();
      peearConnectionRef.current = rtcCall;
    }
    callStream();
  }, []);
  ///////////////////////////////////////setIceCandidate/////////////////////////////////////////////////////////
  if (peearConnectionRef.current !== null) {
    peearConnectionRef.current.onicecandidate = async function (event) {
      if (event.candidate) {
        
      console.log('Mirazul')
      console.log(event.candidate)
        await socket?.emit("icecandidate", {
          me: myId,
          friend: fdId,
          candidate: event.candidate,
        });
      }
    };
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const startCall = async () => {
    if (callInv === "call-start") {
      await socket?.emit("signal-call", {
        senderId: store.userInfo.id,
        receiverId: fdId,
        name: store.userInfo.name,
        profile: store.userInfo.profile,
        type,
      });
    }
  };
  useEffect(() => {
    startCall();
  }, [socket]);

  /////////////////////////////////////logic for open window when received call////////////////////////////////////
  useEffect(() => {
    (async () => {
      if (action === "call-received") {
        (await socket) &&
          socket.emit("receivedCallSuccess", {
            friendId: fdId,
            msg: "call received success",
          });
      }
    })();
  }, [socket]);

  ///////////////////////////Render webRTC in here/////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("receivedCallSuccess", () => {
        setCallInv("call-received");
        init();
      });
    return () => {
      socket && socket.off("receivedCallSuccess");
    };
  }, [socket]);
  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////All logic for create offer and receive remote answer//////////////////////////////////////////////////
  ///////////////////////////Create a offer///////////////////////////
  const createOffer = async () => {
    if (peearConnectionRef.current) {
      const offer = await peearConnectionRef.current.createOffer();
      await peearConnectionRef.current.setLocalDescription(offer);
      return offer;
    }
  };
  //////////////////////////////////////send offer to the remote user///////////////////////////////////
  const sendOfferToRemoteUser = async () => {
    const offer = await createOffer();
    (await socket) && socket.emit("offer", { me: myId, friend: fdId, offer });
  };

  //////////////////////////////////////////Create answer///////////////////////////////////////////////
  const createAnswer = async (offer) => {
    if (peearConnectionRef.current) {
      await peearConnectionRef.current.setRemoteDescription(offer);
      const answer = await peearConnectionRef.current.createAnswer();
      await peearConnectionRef.current.setLocalDescription(answer);
      console.log("answer");
      return answer;
    }
  };
  /////////////////////////////////////receive offer and send answer for the remote user//////////////////////////////////////////
  useEffect(() => {
    console.log(peearConnectionRef.current);
    socket &&
      socket.on("offer", async (res) => {
        const answer = await createAnswer(res.offer);
        (await socket) &&
          socket.emit("answer", { me: res.friend, friend: res.me, answer });
        console.log(res);
      });
    return () => {
      socket && socket.off("offer");
    };
  }, [socket, peearConnectionRef.current]);

  //////////////////////receive answer and set in rtc///////////////////////////
  const setRemoteAns = async (ans) => {
    if (peearConnectionRef.current) {
      await peearConnectionRef.current.setRemoteDescription(ans);
    }
  };
  //////////////////////////////////Set Answer//////////////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("answer", async (res) => {
        await setRemoteAns(res.answer);
      });
    return () => {
      socket && socket.off("answer");
    };
  }, [socket]);
  ///////////////////////////////set ice candidate in rtc////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("icecandidate", async (candidate) => {
        if (peearConnectionRef.current) {
          await peearConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        }
      });
    return () => {
      socket && socket.off("icecandidate");
    };
  }, [socket]);
  //////////////////////////////////////////////////////////////////////////////
  const init = () => {
    // const mike = myStream.current?.getAudioTracks()[0];
    // mike.enabled = true;
    setTimeout(async () => {
      await sendOfferToRemoteUser();
    }, 2000);
  };

  const handleCallEnd = () => {
    setIsRemoteRing(false);
    setMyFace(false);
    setIsRing(false);
    socket?.emit("end-call", { id: fdId, end: "call-end" });
    socket &&
      socket.on("call-reached", (res) => {
        console.log(res);
      });
    setCallInv("end-call");
  };
  const handleCallStart = () => {
    setMyFace(true);
    setIsRing(true);
    socket?.emit("signal-call", {
      senderId: store.userInfo.id,
      receiverId: fdId,
      name: store.userInfo.name,
      profile: store.userInfo.profile,
      type,
    });
    setCallInv("call-start");
  };
  // useEffect(() => {

  // }, [socket]);
  useEffect(() => {
    socket &&
      socket.on("call-reached", (res) => {
        setIsRing(false);
        setIsRemoteRing(true);
      });
    return () => {};
  }, [socket]);

  const toggleVideo = () => {
    if (myStream.current) {
      const videoCamera = myStream.current?.getVideoTracks()[0];
      videoCamera.enabled = !videoCamera.enabled;
      setToggleVid(!toggleVid);
    }
  };
  const toggleMike = () => {
    if (myStream.current) {
      setToggleMick(!toggleMick);
    const mike = myStream.current?.getAudioTracks()[0];
    mike.enabled = !mike.enabled;
    }
  };
  // const aidioInput = localStream?.getAudioTracks()[0]
  // =========================================================================================================================
  // =========================================================================================================================

  return (
    <div
      className={`${
        callInv === "call-start"
          ? "bg-black duration-1000"
          : "bg-gray-500 duration-1000"
      } w-screen h-screen overflow-hidden fixed flex justify-center items-center`}
    >
      {(callInv === "call-start" || callInv === "call-received") && (
        <div>
          {myFace && type === "Video" && (
            <div className="absolute z-50 right-4 top-4 w-3/12 rounded-md h-3/12">
              <MyVideoStream stream={myStream.current} />
              {/* <video autoPlay ref={myVideoRef}></video> */}
              {callInv === "call-start" && (
                <div className="h-[400px] overflow-y-auto hidden md:block">
                  {deviceInfo?.map((info, i) => {
                    return (
                      !toggleVid && (
                        <h4 key={i} className="text-white mt-4">
                          {info.kind} {info.label}
                        </h4>
                      )
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div>
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
        {type === "Video" && callInv !== "call-received" && (
          <div>
            <img
              className={`border-[10px] border-white mx-auto duration-500 ${callInv === 'end-call' ? 'w-32 h-32' : 'shadow-[-1px_5px_40px_0px_white] w-48 h-48'} rounded-full`}
              src={profile}
              alt="profile-image"
            />
            {type === "Video" && (
              <h3 className="text-2xl text-white text-center">
                {callInv === "end-call"
                  ? "Video call end"
                  : ` You are in video call with ${name}`}
              </h3>
            )}
          </div>
        )}
        {type === "Audio" && (
          <div>
            <img
              className={`border-[10px] duration-1000 border-white mx-auto w-48 h-48 shadow-[-1px_5px_40px_0px_white] rounded-full`}
              src={profile}
              alt="profile-image"
            />
            {type === "Audio" && (
              <h3 className="text-2xl text-white">
                {callInv === "end-call"
                  ? "Audio call end"
                  : ` You are in audio call with ${name}`}
              </h3>
            )}
          </div>
        )}
        {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="relative">
        <div className={`${
            callInv === "call-start" ? "scale-1 duration-500" : "scale-0"
          } flex absolute top-0 left-[50%] -translate-x-[50%] justify-between px-6 items-center gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700`}>
            <h4
              className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
              onClick={handleCallEnd}
            >
              <MdCallEnd size={30} />
            </h4>
            <h2
              onClick={toggleVideo}
              className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-not-allowed"
            >
              <IoVideocamOffOutline size={30} />
            </h2>
            <button
              disabled={true}
              onClick={toggleMike}
              className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-not-allowed"
            >
              <CiMicrophoneOff size={30} />
            </button>
          </div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div
          className={`${
            callInv === "end-call" ? "scale-1 duration-500" : "scale-0"
          } flex absolute top-0 left-[50%] -translate-x-[50%] justify-between px-6 items-center mt-3 gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700`}
        >
          <h4
            className="text-white w-fit bg-green-500 p-2 rounded-full cursor-pointer"
            onClick={handleCallStart}
          >
            <MdCallEnd size={30} />
          </h4>
          <button
            onClick={() => window.close()}
            className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-pointer"
          >
            <RxCross1 size={30} />
          </button>
        </div>
        </div>
        {/* ///////////////////////////////////////////////////////////video call logic here///////////////////////////////////////////////////////////// */}
       {
        !remoteRef.current && callInv === 'call-received' && (
          <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden flex justify-center items-center">
          <h2 className="text-2xl text-white">Loading...</h2>
    </div>
        )
       }
        {callInv === "call-received" && type === "Video" && (
          <div className="relative">
            <video
              className="rounded-lg h-screen w-auto"
              autoPlay
              ref={remoteRef}
            ></video>
            <div className="flex mx-auto absolute bottom-20 md:bottom-4 left-[50%] -translate-x-[50%] justify-between px-6 items-center gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700">
              <h4
                className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
                onClick={handleCallEnd}
              >
                <MdCallEnd size={30} />
              </h4>
              <h2
                onClick={toggleVideo}
                className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
              >
                <IoVideocamOffOutline size={30} />
              </h2>
              <button
                onClick={toggleMike}
                className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
              >
                <CiMicrophoneOff size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Suspen = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default Suspen;
////////////
