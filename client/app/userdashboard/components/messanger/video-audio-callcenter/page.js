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
import { LuScreenShare } from "react-icons/lu";
import { LuScreenShareOff } from "react-icons/lu";
import { IoVideocamOffOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoCameraOutline } from "react-icons/io5";
import { IoCameraReverseOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { MdCallEnd } from "react-icons/md";
import { visualEffect } from "./audioVisualizer";
const Page = () => {
  const data = useSearchParams();
  // const [localStream, setLocalStream] = useState(null);
  const [myFace, setMyFace] = useState(true);
  const [isRing, setIsRing] = useState(true);
  const [isRemoteRing, setIsRemoteRing] = useState(false);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [callAlert, setCallAlert] = useState("local");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [localStream, setLocalStram] = useState(null);
  // const [attached,setAttached] = useState(false)
  const [toggleVid, setToggleVid] = useState(false);
  const [toggleMick, setToggleMick] = useState(false);
  const [toggleStream, setToggleStream] = useState(false);
  const [faceVideoMove, setFaceVideoMove] = useState(true);
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
  const remoteVideo = useRef(null);
  const remoteAudio = useRef(null);
  const canvRef = useRef(null);
  const exchangeLocalStream = useRef(null);
  const exchangeRemoteStream = useRef(null);
  //////////////////////////////////////////////////////////////////////////////
  ////////////////////////global media stream call here////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const generateStream = async () => {
    const videoConstraints = {
      width: { ideal: 640 },
      height: { ideal: 360 },
      frameRate: { ideal: 15 },
    };

    const videoTrack = {
      audio: true,
      video: {
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
        frameRate: { ideal: 10 },
        // facingMode: { exact: "user" },
      },
    };

    const audioTracks = {
      audio: true,
    };
    ////////////////////////////////////////////////////////////////////////////////

    const stream =
      type === "Video"
        ? await navigator.mediaDevices.getUserMedia(videoTrack)
        : type === "Audio"
        ? await navigator.mediaDevices.getUserMedia(audioTracks)
        : null;
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
      const configuration = {
        iceServers: [
          // STUN server
          {
            urls: "stun:stun.l.google.com:19302", // Replace with your STUN server address
          },
          {
            urls: "stun:global.stun.twilio.com:3478", // Replace with your STUN server address
          },
          // TURN server with credentials
          {
            urls: "turn:relay1.expressturn.com:3478", // Your TURN server
            username: "efNFMA7S3AXKL4C9FV", // Your username
            credential: "qHpAu3uMlVCiUAlR", // Your password
          },
        ],
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
        if (event.streams[0] && type === "Audio") {
          visualEffect(canvRef.current, event.streams[0]);
        }
        remoteStream.current = event.streams[0];
        if (type === "Video") {
          exchangeRemoteStream.current.srcObject = event.streams[0];
        }
        type === "Video"
          ? (remoteVideo.current.srcObject = event.streams[0])
          : (remoteAudio.current.srcObject = event.streams[0]);
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

  if (
    type === "Video" &&
    callInv === "call-received" &&
    exchangeLocalStream.current !== null &&
    myStream.current !== null
  ) {
    exchangeLocalStream.current.srcObject = myStream.current;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////Here is the logic for screen sharing method/////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRemoteScreenSharing, setIsRemoteScreenSharing] = useState(false);
  const [screenTrack, setScreenTrack] = useState(null);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const track = await screenStream.getVideoTracks()[0];
      setScreenTrack(track);

      // Replace current video track with the screen track
      if (peearConnectionRef.current) {
        const sender = await peearConnectionRef.current?.getSenders();
        sender[1].replaceTrack(track);
      }

      // sender.replaceTrack(screenTrack);

      // Set state to indicate screen sharing is active
      setIsScreenSharing(true);
      socket &&
        socket.emit("screen-sharing", { friend: fdId, isSharing: true });
      // Listen for when screen sharing stops directly (e.g., from the browser prompt)
      track.onended = async () => await stopScreenShare();
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };
  //////////////////////////////////////////////////////////////
  const stopScreenShare = async () => {
    if (screenTrack) {
      // Stop the screen track and replace it with the camera track
      await screenTrack.stop();
      //  setScreenTrack(null)
      const sender = await peearConnectionRef.current?.getSenders();
      sender[1].replaceTrack(myStream.current.getVideoTracks()[0]);
      setIsScreenSharing(false);
    }
    socket && socket.emit("screen-sharing", { friend: fdId, isSharing: false });
  };
  //////////////////////////////////////Reomte screen sharing statue check by socket signalig//////////////////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("screen-sharing", (res) => {
        setIsRemoteScreenSharing(res);
      });
    return () => {
      socket && socket.off("screen-sharing");
    };
  }, [socket]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////Here is the logic for toggling between forth and back camera///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [toggleCam, setToggleCam] = useState(false);
  const [isBackcameraExist, setIsBackcameraExist] = useState(null);
  const frontVideStream = async () => {
    const stm = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
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
        frameRate: { ideal: 10 },
        facingMode: { exact: "user" },
      },
    });

    return stm;
  };
  const backVideStream = async () => {
    const stm = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
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
        frameRate: { ideal: 10 },
        facingMode: { exact: "environment" },
      },
    });

    return stm;
  };
  async function checkBackCamera() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some(
      (device) =>
        device.kind === "videoinput" &&
        device.label.toLowerCase().includes("back")
    );
  }
  useEffect(() => {
    async function backCm() {
      const backYes = await checkBackCamera();
      setIsBackcameraExist(backYes);
    }
    backCm();
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function setFrontCameraStream() {
    if (myStream.current) {
      myStream.current.getTracks().forEach(track => track.stop());
    }
    const stm = await frontVideStream();
    const audiotrack = await stm.getAudioTracks()[0];
    const videotrack = await stm.getVideoTracks()[0];
    if (peearConnectionRef.current) {
      const sender = await peearConnectionRef.current?.getSenders();
      sender[0].replaceTrack(audiotrack);
      sender[1].replaceTrack(videotrack);
    }
    if (!toggleMick) {
      audiotrack.enabled = false
    }
    if (!toggleVid) {
      videotrack.enabled = false
    }
    myStream.current = stm;
    setToggleCam(false);
  }

  ////////////////////////////////////////////////////////
  async function setBackCameraStream() {
    if (myStream.current) {
      myStream.current.getTracks().forEach(track => track.stop());
    }
    const stm = await backVideStream();
    const audiotrack = await stm.getAudioTracks()[0];
    const videotrack = await stm.getVideoTracks()[0];
    if (peearConnectionRef.current) {
      const sender = await peearConnectionRef.current?.getSenders();
      sender[0].replaceTrack(audiotrack);
      sender[1].replaceTrack(videotrack);
    }

    myStream.current = stm;
    if (!toggleMick) {
      audiotrack.enabled = false
    }
    if (!toggleVid) {
      videotrack.enabled = false
    }
    setToggleCam(true);
  }

  ///////////////////////////////////////setIceCandidate/////////////////////////////////////////////////////////
  if (peearConnectionRef.current !== null) {
    peearConnectionRef.current.onicecandidate = async function (event) {
      if (event.candidate) {
        console.log("Mirazul");
        console.log(event.candidate);
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

  ///////////////////////////Render webRTC in here///////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("receivedCallSuccess", () => {
        setCallInv("call-received");
        setCallAlert("none");
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

  //==================================================================================================================
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
    setCallAlert("local");
  };

  const handleCallEnd = async () => {
    setMyFace(false);
    setIsRing(false);
    socket && (await socket?.emit("end-call", { id: fdId, end: "call-end" }));
    socket &&
      (await socket.on("call-reached", (res) => {
        console.log(res);
      }));
    setCallInv("end-call");
    setCallAlert("none");
  };
  // useEffect(() => {

  // }, [socket]);
  useEffect(() => {
    socket &&
      socket.on("call-reached", (res) => {
        setCallAlert("remote");
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
  // ===============================================All logic for call stop===================================================
  useEffect(() => {
    socket &&
      socket.on("callStatus", (res) => {
        setCallInv("end-call");
        setCallAlert("none");
        const error = new Audio("/call-ringtone/error-126627.mp3");
        error.play();
      });
    return () => {
      socket && socket.off("callStatus");
    };
  }, [socket]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    socket?.on("end-call-signal", (res) => {
      if (res) {
        if (callInv === "call-received") {
          window.close();
        } else {
          setCallInv("end-call");
          setCallAlert("none");
        }
      }
    });
    return () => {
      socket?.off("end-call-signal");
    };
  }, [socket, callInv]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onTabClose = () => {
    null;
  };
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", function (event) {
      // Code to execute before the tab is closed
      onTabClose();
    });
  }

  /////////////////////////////////////////////////////////END////////////////////////////////////////////////////////////
  //Start from new
  useEffect(() => {
    if (callInv === "call-received" && type === "Video") {
      setTimeout(() => {
        setFaceVideoMove(false);
      }, 10000);
    }
  }, [callInv]);

  //////////////////////////////Check My browser support screen sharing option///////////////////////////////
  function isDisplayMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
  }

  ////////////////////////////////////////////
  return (
    <div
      className={`${
        callInv === "call-start" ? "bg-black duration-1000" : "bg-gray-500"
      } w-screen h-screen overflow-hidden fixed flex justify-center items-center`}
    >
      {callAlert === "local" && action === "call-start" && (
        <audio autoPlay src="/call-ringtone/local-alarm (1).mp3" loop></audio>
      )}
      {callAlert === "remote" && action === "call-start" && (
        <audio autoPlay src="/call-ringtone/remote-alaram.mp3" loop></audio>
      )}
      {(callInv === "call-start" || callInv === "call-received") && (
        <div>
          {myFace && type === "Video" && (
            <div
              onClick={() => setToggleStream(!toggleStream)}
              className="absolute cursor-pointer z-50 right-4 top-4 w-3/12 rounded-md h-3/12"
            >
              <div
                className={`${toggleStream ? "hidden" : "block"} ${
                  faceVideoMove
                    ? "scale-100 duration-150"
                    : "scale-0 duration-150"
                }`}
              >
                <MyVideoStream stream={myStream.current} />
              </div>
              <video
                className={`scale-x-[-1] rounded-lg max-h-[300px] mx-auto duration-150 w-auto ${
                  toggleStream ? "block" : "hidden"
                }  ${
                  faceVideoMove
                    ? "scale-100 duration-150"
                    : "scale-0 duration-150"
                }`}
                autoPlay
                ref={exchangeRemoteStream}
              ></video>
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
              className={`border-white mx-auto duration-500 ${
                callInv === "end-call"
                  ? "w-32 h-32 border-[4px]"
                  : "shadow-[-1px_5px_40px_0px_white] w-48 h-48 border-[10px]"
              } rounded-full`}
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
              className={`border-[10px] duration-1000 border-white ${
                callInv === "call-received" && "opacity-60"
              } mx-auto w-48 h-48 shadow-[-1px_5px_40px_0px_white] rounded-full`}
              src={profile}
              alt="profile-image"
            />
            {callInv === "call-received" && (
              <h2
                className={`font-semibold text-gray-700 w-fit mx-auto py-2 px-4 rounded-lg text-center ${
                  callInv === "call-received" && "bg-white"
                } text-3xl uppercase mt-4`}
              >
                {name}
              </h2>
            )}
            {type === "Audio" && callInv !== "call-received" && (
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
          <div
            className={`${
              callInv === "call-start" ? "scale-1 duration-500" : "scale-0"
            } flex absolute top-0 left-[50%] -translate-x-[50%] justify-between px-6 items-center gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700`}
          >
            <h4
              className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
              onClick={handleCallEnd}
            >
              <MdCallEnd size={30} />
            </h4>
            <h2 className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-not-allowed">
              <LuScreenShareOff size={30} />
            </h2>
            <h2 className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-not-allowed">
              <IoVideocamOffOutline size={30} />
            </h2>
            <button className="text-white w-fit bg-gray-500/10 p-2 rounded-full cursor-not-allowed">
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
              className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
            >
              <RxCross1 size={30} />
            </button>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////////////video call logic here///////////////////////////////////////////////////////////// */}
        {!remoteVideo.current &&
          callInv === "call-received" &&
          type === "Video" && (
            <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden flex justify-center items-center">
              <h2 className="text-2xl text-white">Loading...</h2>
            </div>
          )}
        {callInv === "call-received" && type === "Video" && (
          <div className="relative">
            <video
              onMouseMove={() => {
                setFaceVideoMove(true);
                setTimeout(() => {
                  setFaceVideoMove(false);
                }, 10000);
              }}
              className={`${
                isRemoteScreenSharing ? "rotate-0" : "scale-x-[-1]"
              } rounded-lg h-screen w-auto ${
                toggleStream ? "hidden" : "block"
              }`}
              autoPlay
              ref={remoteVideo}
            ></video>
            <video
              onMouseMove={() => {
                setFaceVideoMove(true);
                setTimeout(() => {
                  setFaceVideoMove(false);
                }, 10000);
              }}
              className={`scale-x-[-1] rounded-lg h-screen w-auto ${
                toggleStream ? "block" : "hidden"
              }`}
              autoPlay
              muted
              ref={exchangeLocalStream}
            ></video>
            <div className="flex mx-auto absolute bottom-20 md:bottom-4 left-[50%] -translate-x-[50%] justify-between px-6 items-center gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700">
              <h4
                className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
                onClick={handleCallEnd}
              >
                <MdCallEnd size={30} />
              </h4>
              {isDisplayMediaSupported() && (
                <button
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                  className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
                >
                  {isScreenSharing ? (
                    <LuScreenShareOff size={30} />
                  ) : (
                    <LuScreenShare size={30} />
                  )}
                </button>
              )}
              <button
                onClick={toggleVideo}
                className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
              >
                {toggleVid ? (
                  <IoVideocamOffOutline size={30} />
                ) : (
                  <GoDeviceCameraVideo size={30} />
                )}
              </button>
              {isBackcameraExist && (
                <div>
                  {toggleCam && (
                    <button
                      onClick={setFrontCameraStream}
                      className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
                    >
                      {" "}
                      <IoCameraReverseOutline size={30} />
                    </button>
                  )}
                  {!toggleCam && (
                    <button
                      onClick={setBackCameraStream}
                      className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
                    >
                      <IoCameraOutline size={30} />
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={toggleMike}
                className="text-white w-fit bg-gray-500/10 p-2 rounded-full"
              >
                {toggleMick ? (
                  <CiMicrophoneOff size={30} />
                ) : (
                  <CiMicrophoneOn size={30} />
                )}
              </button>
            </div>
          </div>
        )}
        {/* //////////////////////////////////////audio call logic////////////////////////////////////////// */}
        {callInv === "call-received" && type === "Audio" && (
          <div className="w-screen h-screen overflow-hidden -z-10 absolute -top-[5%] left-0">
            <canvas ref={canvRef} className="w-full h-full bg-black"></canvas>
          </div>
        )}
        {callInv === "call-received" && type === "Audio" && (
          <div>
            <audio autoPlay ref={remoteAudio}></audio>
            <div
              className={`${
                callInv === "call-received" && "bg-white"
              } flex mx-auto absolute bottom-20 left-[50%] -translate-x-[50%] justify-between px-6 items-center gap-6 py-2 bg-gray-500/10 rounded-full shadow-sm shadow-gray-700`}
            >
              <h4
                className="text-white w-fit bg-red-500 p-2 rounded-full cursor-pointer"
                onClick={handleCallEnd}
              >
                <MdCallEnd size={30} />
              </h4>
              <button className="text-white w-fit bg-gray-500 p-2 rounded-full cursor-not-allowed">
                <IoVideocamOffOutline size={30} />
              </button>
              <button
                onClick={toggleMike}
                className="text-white w-fit bg-gray-500 p-2 rounded-full"
              >
                {toggleMick ? (
                  <CiMicrophoneOff size={30} />
                ) : (
                  <CiMicrophoneOn size={30} />
                )}
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
/////
