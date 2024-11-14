"use client";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { IoHeartSharp, IoImageOutline } from "react-icons/io5";
import { BiMessageRoundedDots } from "react-icons/bi";
import { RiSendPlaneLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import MyCurrentMessage from "./MyCurrentMessage";
import HTMLReactParser from "html-react-parser";
import messageader from "@/public/notification-soun/f35a1c_d8d5997a805a452ba9d3f5cbb48ce87cmv2-ezgif.com-crop.gif";
import Image from "next/image";
import { useSocket } from "../../global/SocketProvider";
import EntryPoint from "./video-audio-callcenter/EntryPoint";
import moment from "moment";
import { formatetime } from "./components/time";
const Messanger = ({
  id,
  name,
  profile,
  title,
  status,
  desc,
  // switcher,
  // setSwitcher
}) => {
  const [switcher, setSwitcher] = useState(false);
  const [message, setMessage] = useState("");
  const [myAndFriendMessage, setMyAndFriendMessage] = useState();
  const [currentMessage, setCurrentMessage] = useState([]);
  const [storeMessage, setStoreMessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState(false);
  const [leftHide, setLeftHide] = useState(false);
  const [typingMsg, setTypingMsg] = useState(null);
  const [isOpenMyFriendMessangerWindow, setIsOpenMyFriendMessangerWindow] =
    useState(null);
  const [invoke, setInvoke] = useState(null);
  const [typingloading, setTypingLoading] = useState();
  const messangerRef = useRef(null);
  const { store } = useContext(storeContext);
  const { socket } = useSocket();
  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    setInvoke(socket);
  }, []);
  useEffect(() => {
    if (switcher === true) {
      if (
        (typingMsg?.message?.length % 10 === 0 &&
          typingMsg?.message?.length > 0) ||
        typingMsg?.message?.length === 1
      ) {
        new Audio("/notification-soun/oneplus_allay.mp3").play();
        setTypingLoading(true);

        setTimeout(() => {
          setTypingLoading(false);
        }, 8000);
      }
    }
  }, [typingMsg]);
  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [leftHide, storeMessage, currentMessage, typingMsg]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    async function fetchMessage() {
      try {
        const { data } = await axios.get(`${baseurl}/messanger/get/${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setMyAndFriendMessage(data);
      } catch (error) {}
    }
    switcher && new Audio("/notification-soun/som_da_kiwify.mp3").play();
    fetchMessage();
  }, [storeMessage]);
  const fetchSocketData = async (socket) => {
    if (switcher) {
      await socket?.on("get-message-from-my-friend", (data) => {
        setStoreMessage(data);
        setOnlineUser(true);
      });
      socket?.emit("typingMsg", {
        senderId: store.userInfo.id,
        receiverId: id,
        message,
      });

      socket?.on("getTypingMsg", (data) => {
        setTypingMsg(data);
        console.log(data);
      });
    }
    switcher
      ? socket?.emit("openMessageWindow", { receiverId: id, status: true })
      : socket?.emit("openMessageWindow", { receiverId: id, status: false });
    socket && socket.on("getOpenMessageWindow", (data) => {
      console.log(isOpenMyFriendMessangerWindow);
      setIsOpenMyFriendMessangerWindow(data);
    });
    return ()=>{
      socket && socket.off('getOpenMessageWindow')
    }
  };
  useEffect(() => {
    invoke?.emit("myUserInfo", {
      id: store.userInfo.id,
      name: store.userInfo.name,
    });
    fetchSocketData(invoke);
  }, [message, switcher]);
  useEffect(() => {
    function handleBeforeUnload(event) {
      // event.preventDefault()
      // event.returnValue = '';
      setSwitcher(false);
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [hideImoji, setHideImoji] = useState(false);
  let imoji = [
    "😀",
    "😌",
    "🤐",
    "👺",
    "🤢",
    "🙄",
    "🤩",
    "😍",
    "🤑",
    "😧",
    "😀",
    "😌",
    "🤐",
    "👺",
    "🤢",
    "🙄",
    "🤩",
    "😍",
    "🤑",
    "😧",
    "😀",
    "😌",
    "🤐",
    "👺",
    "🤢",
    "🙄",
    "🤩",
    "😍",
    "🤑",
    "😧",
    "😀",
    "😌",
    "🤐",
    "👺",
    "🤢",
    "🙄",
    "🤩",
    "😍",
    "🤑",
    "😧",
    "😀",
    "😌",
    "🤐",
    "👺",
    "🤢",
    "🙄",
    "🤩",
    "😍",
    "🤑",
    "😧",
  ];
  const handleImuji = () => {
    setHideImoji(!hideImoji);
  };

  if (isOpenMyFriendMessangerWindow) {
    if (currentMessage?.length > 0) {
      currentMessage[currentMessage.length - 1].hasSeen = true;
      if (currentMessage.length > 1) {
        for (let i = 0; i < currentMessage?.length - 1; i++) {
          currentMessage[i].hasSeen = false;
        }
      }
    }
  }
  useEffect(() => {
    if (switcher) {
      if (isOpenMyFriendMessangerWindow) {
        switcher &&
          new Audio("/notification-soun/google_notification.mp3").play();
      }
    }
  }, [switcher]);

  return (
    <div>
      {!switcher && (
        <button className="bg-violet-700 px-4 flex items-center gap-2 rounded-md text-white" onClick={() => setSwitcher(true)}>
        <BiMessageRoundedDots />  Messaging
        </button>
      )}
      <div
        className={`${
          switcher ? "scale-1" : "scale-0"
        } fixed duration-200 -left-0 md:left-1/3 md:h-auto pb-4 bg-white origin-bottom-left bottom-0 md:bottom-10 w-full md:w-4/12 z-50 md:ml-6 border rounded-md`}
      >
        <div className="py-3 bg-violet-700 rounded-t-md flex justify-between items-center px-4">
          <div className="flex gap-2">
            <img
              className="w-8 h-8 border border-white rounded-full"
              src={profile}
              alt={name}
            />
            <div>
              <h2 className="text-white font-semibold text-sm">{name}</h2>
              <p className="text-[9px] text-white">{status}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-white">
            <EntryPoint
              user={{
                myId: store.userInfo.id,
                fdId: id,
                name,
                profile,
                title,
                type: "Audio",
              }}
            />
            <EntryPoint
              user={{
                myId: store.userInfo.id,
                fdId: id,
                name,
                profile,
                title,
                type: "Video",
              }}
            />
            <RxCross1
              onClick={() => setSwitcher(false)}
              className="cursor-pointer"
              size={22}
              color="white"
            />
          </div>
        </div>
        <div className="body-footer-box overflow-auto md:h-[74vh] hidden_scroll">
          <div className="message flex flex-col justify-between px-4 overflow-auto h-[83vh] md:h-[68vh] hidden_scroll">
            <div className="mt-4 flex justify-center w-full">
              <div>
                <img
                  className="w-32 h-32 mx-auto rounded-full border-4"
                  src={profile}
                  alt={name}
                />
                <h3 className="text-gray-500 text-center font-semibold text-2xl bg-v">
                  {name}
                </h3>
                {title?.length > 0 && title !== "Untitled User" && (
                  <h2 className="text-gray-400 text-center text-lg">{title}</h2>
                )}
                {desc?.length > 0 && (
                  <h2 className="text-gray-300 text-center text-sm">{desc}</h2>
                )}
              </div>
            </div>

            {myAndFriendMessage && myAndFriendMessage?.length > 0 && (
              <div>
                {myAndFriendMessage.map((m, i) => {
                  return m.senderId === store.userInfo.id ? (
                    <div key={i} className="my-message py-2 flex justify-end">
                     <div className="w-full flex flex-col items-end">
                     <div
                        style={{ borderRadius: "20px 20px 0px 20px" }}
                        className="max-w-[80%] w-fit bg-slate-100"
                      >
                        <p
                          ref={bottomRef}
                          className="text-right overflow-hidden px-4 py-2"
                        >
                          {HTMLReactParser(m.message)}
                        </p>
                      </div>
                      <p className="text-[9px]">
                         {formatetime(m?.createdAt)}
                         </p>
                     </div>
                    </div>
                  ) : (
                    <div key={i}>
                      <div className="friend-message py-2 relative mb-6">
                        <div className="image-box absolute -bottom-6">
                          <img
                            className="w-8 h-8 rounded-full border border-violet-700"
                            src={profile}
                            alt={name}
                          />
                        </div>
                        <div
                          style={{ borderRadius: "20px 20px 20px 0px" }}
                          className="px-2 ml-6 bg-violet-700 max-w-[80%] w-fit text-white text-left"
                        >
                          <p
                            ref={bottomRef}
                            className="px-4 py-1 overflow-hidden"
                          >
                            {HTMLReactParser(m.message)}
                          </p>
                        </div>
                        <p className="text-[9px] ml-6">
                         {formatetime(m?.createdAt)}
                         </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {currentMessage && currentMessage.length > 0 && (
              <div>
                {currentMessage?.map((m, i) => {
                  return (
                    <MyCurrentMessage
                      key={i}
                      id={id}
                      currentMessage={currentMessage}
                      switcher={switcher}
                      onlineUser={onlineUser}
                      receiverId={id}
                      receiverName={name}
                      profile={profile}
                      title={title}
                      status={status}
                      desc={desc}
                      msg={m}
                    />
                  );
                })}
              </div>
            )}

            {typingMsg &&
              typingMsg.senderId === id &&
              typingMsg.receiverId === store.userInfo.id &&
              typingMsg.message !== "" && (
                <div className="friend-message py-2 relative mb-6 flex items-end mt-4">
                  <div className="image-box absolute bottom-5">
                    <img
                      className="w-8 h-8 rounded-full border border-violet-700"
                      src={profile}
                      alt={name}
                    />
                    {typingloading && (
                      <Image
                        className="w-10 absolute right-0 -bottom-5"
                        src={messageader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div
                    style={{ borderRadius: "20px 20px 20px 0px" }}
                    className="px-2 ml-6 bg-gray-100 text-gray-300 max-w-[80%] w-fit text-left"
                  >
                    <p ref={bottomRef} className="px-4 py-1 blur-[2px]">
                      {typingMsg.message}
                    </p>
                  </div>
                </div>
              )}
          </div>
          <div className="px-4 w-full rounded-b-md gap-3 flex justify-between items-center">
            <div
              className={`items-center gap-3 duration-200 ${
                leftHide ? "hidden" : "flex"
              }`}
            >
              <label htmlFor="file">
                <IoImageOutline size={25} />
              </label>
              <div className="cursor-pointer" onClick={handleImuji}>
                <HiOutlineFaceFrown size={25} />
              </div>
            </div>
            <div className="media hidden">
              <input className="" id="file" type="file" />
            </div>
            <div className="flex items-end gap-2 w-full">
              <textarea
                ref={messangerRef}
                value={message}
                onMouseUp={() => setLeftHide(true)}
                onChange={(e) => handleMessage(e)}
                rows={1}
                style={{
                  width: "100%",
                  resize: "none",
                  overflow: "hidden",
                  padding: "6px 14px",
                  boxSizing: "border-box",
                  outline: "none",
                  border: "none",
                  borderRadius: "20px",
                  background: "#ededed",
                }}
              />
              {message ? (
                <span>
                  <RiSendPlaneLine
                    className="cursor-pointer"
                    onClick={() => {
                      // sendMessageToMyFriend();
                      setCurrentMessage((prev) => [
                        ...prev,
                        { message, hasSeen: false },
                      ]);
                      setLeftHide(false);
                      setMessage("");
                      setOnlineUser(false);
                    }}
                    size={25}
                    color="violet"
                  />
                </span>
              ) : (
                <span
                  onClick={() => {
                    // sendMessageToMyFriend();
                  }}
                  className="mb-1 cursor-pointer"
                >
                  {
                    <IoHeartSharp
                      onClick={() => {
                        setCurrentMessage((prev) => [
                          ...prev,
                          { message: "😍", hasSeen: false },
                        ]);
                      }}
                      color="violet"
                      size={25}
                    />
                  }
                </span>
              )}
            </div>
          </div>
          <div
            className={`${
              hideImoji ? "scale-1" : "scale-0"
            } duration-150 origin-bottom-left absolute w-[340px] px-4 py-2 left-12 bottom-20 bg-gray-100 shadow-md rounded-md grid grid-cols-7`}
          >
            {imoji.map((imo, i) => {
              return (
                <h4
                  key={i}
                  onClick={(e) => {
                    setMessage(message + imo);
                  }}
                  className="cursor-pointer hover:bg-white rounded-md hover:shadow-md duration-150 m-1 flex justify-center items-center"
                >
                  {imo}
                </h4>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messanger;
