"use client";
import { baseurl } from "@/app/config";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { useMessage } from "../../global/messageProvider";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import { RiSendPlaneLine } from "react-icons/ri";
import EntryPoint from "../../components/messanger/video-audio-callcenter/EntryPoint";
import { formatetime } from "../../components/messanger/components/time";
import "./css/message-animation.css";
import { useSocket } from "../../global/SocketProvider";
import messageloader from "@/public/notification-soun/f35a1c_d8d5997a805a452ba9d3f5cbb48ce87cmv2-ezgif.com-crop.gif";
import Image from "next/image";
import { BsReply, BsThreeDotsVertical } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import moment from "moment";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { useStore } from "@/app/global/DataProvider";
import { IoArrowRedoOutline } from "react-icons/io5";
import { groupMessagesBysender } from "../../messanger/components/group-message";
import CurrentMessage from "../../messanger/components/CurrentMessage";
import VoiceRecorder from "../../messanger/components/VoiceRecorder";
import MessagePlayer from "../../messanger/components/MessagePlayer";
const FloatingMessageContainer = ({ id, userDetails, setSwitcher }) => {
  const { messanger, dispatch } = useMessage();
  const [message, setMessage] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [toReplyerId, setToReplyerId] = useState(null);
  const [sendCurrentMsg, setSendCurrentMsg] = useState(false);
  const messangerRef = useRef(null);
  const scrollRef = useRef();
  const messageRef = useRef(message); // Store `message` in a ref
  const { store } = useStore();
  const { socket } = useSocket();
  const currentMessages = useRef([]);
  const groupMessages = groupMessagesBysender(messanger.message);
  const [seenMessage,setSeenMessage] = useState(false);
  const [checkMyWindow,setCheckMyWindow] = useState(false)
  const check_my_friend_window = async () => {
    socket && socket.emit('check-my-friend-window',{from:store.userInfo.id,to:id,status:false})
  }
  useEffect(() => {
    socket && socket.on('check-my-friend-window',(data)=>{
      console.log(data)
      if(data.status == false) setSeenMsg(false);
      if (data.status == true) {
        setCheckMyWindow(true)
      } else if (data.status == false){
        setCheckMyWindow(false)
      }
      if(!checkMyWindow){
        socket && socket.emit('check-my-friend-window',{from:store.userInfo.id,to:id,status:true})
      }
      setSeenMessage(data.status)
    })
    return () => {
       socket && socket.off('check-my-friend-window')
    };
  }, [socket,checkMyWindow]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = useCallback(() => {
    messageRef.current = message;
    currentMessages.current = [
      ...currentMessages.current,
      {
        message: { content: message, media: "", voice: "" },
        receiverId: userDetails?._id,
        seenStatus: seenMessage,
      },
    ];

    setTimeout(() => setMessage(""), 200); // Delay resetting to prevent issues
    scrollToBottom();

    if (showReply) {
      setShowReply(false);
      setReplyContent(document.getElementById("replying_content"));
    }

    // setSeenMsg(false)
  }, [message, socket, store.userInfo.id, userDetails?._id,seenMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [sendCurrentMsg]);

  if (
    currentMessages.current.length > 0 &&
    currentMessages.current[0].receiverId !== id
  ) {
    console.log(currentMessages.current.length);
    console.log(currentMessages.current[0].receiverId);
    currentMessages.current = [];
  }

  useEffect(() => {
    socket?.emit("typingMsg", {
      senderId: store.userInfo.id,
      receiverId: id,
      message,
    });
  }, [message, socket]);
  useEffect(() => {
    socket?.emit("typingalert", {
      senderId: store.userInfo.id,
      receiverId: id,
      message,
    });
  }, [message, socket]);
  ////////////////////////////////////////////////////////////////////////////////
  const [typing, setTyping] = useState("");
  console.log(typing.message)
  const [typingloading, setTypingLoading] = useState();
  useEffect(() => {
    socket &&
      socket.on("getTypingMsg", (data) => {
        scrollToBottom();
        setTyping(data);
        setSeenMsg(false);
      });
    return () => {
      socket && socket.off("getTypingMsg");
    };
  }, [socket]);

  useEffect(() => {
    if (id == typing.senderId) {
      if (
        (typing?.message?.length % 10 === 0 && typing?.message?.length > 0) ||
        typing?.message?.length === 1
      ) {
        new Audio("/notification-soun/oneplus_allay.mp3").play();
        setTypingLoading(true);

        setTimeout(() => {
          setTypingLoading(false);
        }, 8000);
      }
    }
  }, [typing]);

  //////////////////////////////Here is the logic for getting message and add in store from sender//////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("message-from", (data) => {
        console.log('aita call hoy')
        setSeenMsg(false);
        id == data.senderId &&
          dispatch({ type: "receive-message", payload: data });
        setTimeout(() => {
          scrollToBottom();
        }, 1000);
      });
    return () => {
      socket && socket.off("message-from");
    };
  }, [socket]);
  //////////////////////////////Here is the logic for getting alert and update message status//////////////////////////////
  const [seenMsg, setSeenMsg] = useState(false);
  useEffect(() => {
    socket &&
      socket.on("check-message-unseen-status", (data) => {
        console.log(data);
        if (id == data.receiverId && store.userInfo.id == data.senderId) {
          setSeenMsg(true);
        }
      });
    return () => {
      socket && socket.off("check-message-unseen-status");
    };
  }, [socket]);

  const controllEmoji = (e, ctl, identifire) => {
    if (identifire === "me") {
      e.target.parentElement.children[2].classList.add("-left-[150px]");
    }
    if (identifire === "friend") {
      e.target.parentElement.children[2].classList.add("-left-[90px]");
    }

    if (ctl == "add") {
      e.target.parentElement.children[0].classList.add("hidden");
      e.target.parentElement.children[1].classList.remove("hidden");
      e.target.parentElement.children[2].classList.remove("hidden");
    }
    if (ctl == "remove") {
      e.target.parentElement.children[0].classList.remove("hidden");
      e.target.parentElement.children[1].classList.add("hidden");
      e.target.parentElement.children[2].classList.add("hidden");
    }
    //  e.target.parentElement.children[1].classList.remove('hidden')
  };
  const emojies = ["❤️", "😍", "😭", "😮", "😡"];

  const sendEmoji = async (e, msg, identifire) => {
    const emojiElements = {
      messageId: msg._id,
      senderId: store.userInfo.id,
      receiverId: msg?.senderId,
      senderName: store.userInfo.name,
      senderProfile: store.userInfo.profile,
      emoji: e.target.innerText,
    };
    dispatch({ type: "concate-emoji", payload: emojiElements });
    try {
      await axios.post(
        `${baseurl}/messanger/update-emoji-in-message`,
        {
          questionId: msg._id,
          senderId: store.userInfo.id,
          senderName: store.userInfo.name,
          senderProfile: store.userInfo.profile,
          emoji: e.target.innerText,
        },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    if (store.userInfo.id !== msg.senderId) {
      socket && socket.emit("sendEmojiInMessage", emojiElements);
    } else {
      socket &&
        socket.emit("sendEmojiInMessage", {
          messageId: msg._id,
          senderId: store.userInfo.id,
          receiverId: msg?.receiverId,
          senderName: store.userInfo.name,
          senderProfile: store.userInfo.profile,
          emoji: e.target.innerText,
        });
    }
    e.target.parentElement.parentElement.children[0].classList.remove("hidden");
    e.target.parentElement.parentElement.children[1].classList.add("hidden");
    e.target.parentElement.parentElement.children[2].classList.add("hidden");
  };

  useEffect(() => {
    socket &&
      socket.on("sendEmojiInMessage", (data) => {
        dispatch({ type: "concate-emoji", payload: data });
      });
    return () => {
      socket && socket.off("sendEmojiInMessage");
    };
  }, [socket]);

  useEffect(() => {
    const allContainer = document.querySelectorAll(".emoji_container");
    allContainer.length > 0 && allContainer?.forEach((cont) => cont.remove());
  }, [id]);

  const handleEmojiSenderIdentity = (e) => {
    e.target.parentElement.children[
      e.target.parentElement.children.length - 1
    ].classList.remove("hidden");
    setTimeout(() => {
      e.target.parentElement.children[
        e.target.parentElement.children.length - 1
      ].classList.add("hidden");
    }, 1000);
  };

  ///////////////////////replying logic///////////////////
  const handleReply = (msg) => {
    setToReplyerId(msg.senderId);
    setShowReply(true);
    const replyingTo = document.getElementById("replying_to");
    const replyingText = document.getElementById("replying_content");
    replyingText.innerText = msg.message.content;
    if (msg.senderId == store.userInfo.id) {
      replyingTo.innerText = "Replying to yourself";
    } else {
      replyingTo.innerText = `Replying to ${userDetails?.name}`;
    }
  };

  ////////////////////////////////////////////////////////////////////////
  const [hiddenTarget, setHiddenTarget] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("hiddenTarget")) {
        setHiddenTarget(true);
      } else {
        setHiddenTarget(false);
      }
    });
  }, []);

  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const handle_media_file = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImgUri(URL.createObjectURL(e.target.files[0]));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    if (file) {
      const media = new FormData(); // Create a FormData object
      media.append("receiverId", userDetails?._id); // Add receiverId
      media.append("image", file); // Append the file
      media.append(
        "reply",
        JSON.stringify([replyContent.innerText, toReplyerId])
      ); // Add reply as a string if it's an array or object

      try {
        setLoadingImage(true);
        const { data } = await axios.post(
          `${baseurl}/messanger/image-create`,
          media, // Pass FormData as the body
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
              "Content-Type": "multipart/form-data", // Ensure Content-Type is set correctly
            },
          }
        );

        socket && socket.emit("message-to", data);
        dispatch({ type: "send-message", payload: data });
        setTimeout(() => {
          scrollToBottom();
        }, 1000);
        setLoadingImage(false);
      } catch (error) {
        setLoadingImage(false);
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
      }
    } else {
      console.log("No file selected.");
    }
  };

  const [isStartRecord, setIsStartRecord] = useState(false);

  ////////////////////Here the logic for calling message from api when scroll in a container////////////////////////////////
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [previousScroll, setPreviousScroll] = useState(0);
  // Fetch messages from the API
  //////////////////render message first time////////////////////////////
  useEffect(() => {
    fetchMessages(page, "static");
  }, []);

  const fetchMessages = async (page, status) => {
    if (loading) return;
    setLoading(true);
    if (status === "static") {
      dispatch({ type: "empty-message" });
    }
    try {
      if (status === "static") {
        const { data } = await axios.get(
          `${baseurl}/messanger/get/${id}/${1}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );

        if (data?.length) {
          setPage(2);
          setHasMore(true);
          dispatch({ type: "fetch-message", payload: data });
          setTimeout(() => {
            scrollToBottom();
          }, 200);
        } else {
          setHasMore(false); // No more messages to fetch
        }
      } else {
        const { data } = await axios.get(
          `${baseurl}/messanger/get/${id}/${page}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );

        if (data?.length) {
          dispatch({ type: "fetch-scroll-message", payload: data });
          setPage((prev) => prev + 1);
          const container = containerRef.current;
          const previousHeight = container.scrollHeight;
          setPreviousScroll(previousHeight);
        } else {
          setHasMore(false); // No more messages to fetch
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll event to detect when user scrolls to the top
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && hasMore && !loading) {
      fetchMessages(page, "dynamic");
    }
  };
  useEffect(() => {
    if (!loading && hasMore) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight - previousScroll;
    }
  }, [loading]);

  const lastMessage = messanger.message[messanger.message.length - 1];
  console.log(lastMessage)
  return (
    <div>
      <div className="top-bar px-4 rounded-t-sm py-2 bg-gray-300 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            className="rounded-full w-8"
            src={userDetails?.profile}
            alt={userDetails?.name}
          />
          <div className="text-black">
            <h2 className="text-[18px]">{userDetails?.name}</h2>
            {/* <p className="text-[10px]">{userDetails?.status}</p> */}
          </div>
        </div>
        <div className="flex justify-center gap-6 text-white">
          <EntryPoint
            user={{
              myId: store.userInfo.id,
              fdId: userDetails?._id,
              name: userDetails?.name,
              profile: userDetails?.profile,
              title: userDetails?.title,
              type: "Audio",
              size: 30,
              color: "#8840f5",
            }}
          />
          <EntryPoint
            user={{
              myId: store.userInfo.id,
              fdId: userDetails?._id,
              name: userDetails?.name,
              profile: userDetails?.profile,
              title: userDetails?.title,
              type: "Video",
              size: 30,
              color: "#8840f5",
            }}
          />

          <div onClick={() =>{check_my_friend_window(); setSwitcher(false)}} className="cursor-pointer">
            <RxCross1 color="#8840f5" size="30" />
          </div>
        </div>
      </div>
      <div className=" overflow-y-scroll flex flex-col justify-between hidden_scroll h-[74vh]">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="w-full overflow-y-auto relative h-[64vh] py-6 px-2 bg-white"
        >
          <div className="flex justify-center">
            <div>
              <img
                className="rounded-full w-28 mx-auto"
                src={userDetails?.profile}
                alt={userDetails?.name}
              />
              <h4 className="text-center text-gray-700 text-2xl font-semibold">
                {userDetails?.name}
              </h4>
            </div>
          </div>
          {loading && (
            <div className="loading flex justify-center">
              <img src={"/loading-buffer.gif"} alt="loading" />
            </div>
          )}
          {groupMessages?.map((messageBlog, i) => {
            return (
              <div key={i} className="mt-10">
                {messageBlog.map((msg, i) => {
                  return msg ? (
                    msg?.senderId === store.userInfo.id ? (
                      <div key={i}>
                        {messageBlog.indexOf(msg) === 0 && (
                          <p className="text-center text-sm text-gray-400 mt-4">
                            {formatetime(msg?.createdAt)}
                          </p>
                        )}
                        <div className="flex relative justify-end items-center gap-3 group">
                          <div className="hidden relative group-hover:block text-gray-700">
                            <div className="flex gap-4 items-center">
                              <BsThreeDotsVertical size={18} />
                              <label
                                className="cursor-pointer"
                                onClick={() => handleReply(msg)}
                                htmlFor="message_text"
                              >
                                <IoArrowRedoOutline size={18} />
                              </label>

                              <div className="group relative">
                                <span
                                  onClick={(e) => {
                                    controllEmoji(e, "add", "me");
                                  }}
                                  className="GrEmoji cursor-pointer"
                                >
                                  ☹
                                </span>
                                <img
                                  onClick={(e) => {
                                    controllEmoji(e, "remove");
                                  }}
                                  className="w-6 RxCross2 cursor-pointer hidden"
                                  src="/crossed.png"
                                  alt="cross"
                                />
                                <div className="absolute z-20 bg-white border hidden w-[260px] text-2xl py-2 px-6 rounded-full shadow-xl">
                                  {emojies.map((em, i) => {
                                    return (
                                      <span
                                        onClick={(e) => {
                                          sendEmoji(e, msg, "me");
                                        }}
                                        key={i}
                                        className="px-1 cursor-pointer"
                                      >
                                        {em}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <h4 className="text-[10px] bg-gray-50 px-2 rounded-full w-fit border block">
                                {moment(msg?.createdAt).format(
                                  "MM/DD/YY, HH:mm"
                                )}
                              </h4>
                            </div>
                          </div>
                          <div className="max-w-[60%] w-fit">
                            {msg?.reply[1] === store.userInfo.id && (
                              <h2 className="px-4 text-[10px] ml-auto flex gap-2 items-center">
                                {" "}
                                <IoArrowRedoOutline size={10} />
                                You reply to yourself
                              </h2>
                            )}
                            {msg?.reply[1] === id && (
                              <h2 className="px-4 text-[10px] ml-auto flex gap-2 items-center">
                                {" "}
                                <IoArrowRedoOutline size={10} />
                                You reply to {userDetails?.name}
                              </h2>
                            )}
                            {msg?.reply?.length > 0 &&
                              msg?.reply[0] !== null && (
                                <h2 className="w-fit text-gray-400 py-2 px-4 ml-auto rounded-l-[30px] rounded-tr-[30px] bg-gray-100 text-[12px]">
                                  {msg?.reply[0]}
                                </h2>
                              )}
                            {msg?.message?.content !== "" && (
                              <h2
                                ref={scrollRef}
                                className={`${
                                  i === messageBlog.length - 1 &&
                                  messageBlog.length > 1
                                    ? "msg_anim "
                                    : ""
                                } text-right duration-500 w-fit ml-auto bg-violet-500 mb-[1px] text-indigo-50 py-2 px-6 ${
                                  messageBlog.length === 1
                                    ? "rounded-[30px]"
                                    : "rounded-l-[30px]"
                                } ${
                                  messageBlog.indexOf(msg) === 0 &&
                                  messageBlog.length > 1
                                    ? "rounded-tr-[30px]"
                                    : messageBlog.indexOf(msg) ===
                                        messageBlog.length - 1 &&
                                      messageBlog.length > 1
                                    ? "rounded-br-[30px] duration-500"
                                    : ""
                                }
                                                        ${
                                                          (msg?.reply?.length >
                                                            0 &&
                                                            msg?.reply[0] !==
                                                              null) ||
                                                          msg?.emoji?.length > 0
                                                            ? "rounded-br-[30px]"
                                                            : ""
                                                        }
                                                        `}
                              >
                                {msg?.message.content}
                              </h2>
                            )}

                            {msg?.message.media !== "" && (
                              <div className="mb-2">
                                <img
                                  className="rounded-2xl"
                                  src={msg?.message.media}
                                  alt="message_image"
                                />
                                <p ref={scrollRef}></p>
                              </div>
                            )}
                            {msg?.message.voice !== "" && (
                              <div className="mb-2">
                                <MessagePlayer
                                  url={msg?.message.voice}
                                  userType="me"
                                />
                                <p ref={scrollRef}></p>
                              </div>
                            )}

                            {msg?.emoji?.length > 0 && (
                              <div
                                onClick={(e) => handleEmojiSenderIdentity(e)}
                                className={`flex ${
                                  msg?.emoji?.length > 1 ? "px-2" : "p-[1px]"
                                } relative cursor-pointer group items-center -translate-x-[10px] ml-5 -mt-3 bg-white rounded-full border gap-1 w-fit`}
                              >
                                {msg?.emoji?.map((emj, i) => {
                                  return (
                                    <span key={i} className="text-[10px]">
                                      {emj.emoji}
                                    </span>
                                  );
                                })}
                                {msg?.emoji?.length > 1 && (
                                  <span className="text-gray-500 text-sm">
                                    {msg?.emoji?.length}
                                  </span>
                                )}

                                <div className="absolute space-y-2 rounded-lg rounded-tr-none shadow-lg hidden -top-[140%] -left-[120px] bg-white z-50 w-[100px] p-2 border">
                                  {msg?.emoji?.map((em, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2"
                                      >
                                        <img
                                          className="w-5 h-5"
                                          src={em.senderProfile}
                                          alt="em.senderName"
                                        />
                                        <div className="text-sm">
                                          {em.senderName.split(" ")[0]}
                                        </div>
                                        <span className="text-[10px]">
                                          {em.emoji}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={i}>
                        {messageBlog.indexOf(msg) === 0 && (
                          <p className="text-center text-sm text-gray-400 mt-4">
                            {formatetime(msg?.createdAt)}
                          </p>
                        )}
                        <div className="flex justify-start items-center gap-3 group">
                          <div className="max-w-[60%] w-fit">
                            {msg?.reply[1] === store.userInfo.id && (
                              <h2 className="px-4 text-[10px] flex items-center gap-2">
                                {" "}
                                <BsReply size={10} /> {userDetails?.name} reply
                                to you
                              </h2>
                            )}
                            {msg?.reply[1] === id && (
                              <h2 className="px-4 text-[10px] flex items-center gap-2">
                                {" "}
                                <BsReply size={10} />
                                {userDetails?.name} reply to himself/herself
                              </h2>
                            )}
                            {msg?.reply?.length > 0 &&
                              msg?.reply[0] !== null && (
                                <h2 className="w-fit text-gray-400 py-2 px-4 rounded-r-[30px] rounded-tl-[30px] bg-gray-100 text-[12px]">
                                  {msg?.reply[0]}
                                </h2>
                              )}
                            {msg?.message?.content && (
                              <h2
                                className={`text-left w-fit bg-gray-200 mb-[1px] text-gray-700 py-2 px-6 ${
                                  messageBlog.length === 1
                                    ? "rounded-[30px]"
                                    : "rounded-r-[30px]"
                                } ${
                                  messageBlog.indexOf(msg) === 0 &&
                                  messageBlog.length > 1
                                    ? "rounded-tl-[30px]"
                                    : messageBlog.indexOf(msg) ===
                                        messageBlog.length - 1 &&
                                      messageBlog.length > 1
                                    ? "rounded-bl-[30px]"
                                    : ""
                                }
                                                          ${
                                                            (msg?.reply
                                                              ?.length > 0 &&
                                                              msg?.reply[0] !==
                                                                null) ||
                                                            msg?.emoji?.length >
                                                              0
                                                              ? "rounded-bl-[30px]"
                                                              : ""
                                                          }`}
                              >
                                {msg?.message.content}
                              </h2>
                            )}

                            {msg?.message.media !== "" && (
                              <div className="mb-2">
                                <img
                                  className="rounded-2xl"
                                  src={msg?.message.media}
                                  alt="message_image"
                                />
                              </div>
                            )}

                            {msg?.message.voice !== "" && (
                              <div className="mb-2">
                                <MessagePlayer
                                  url={msg?.message.voice}
                                  userType="he"
                                />
                                <p ref={scrollRef}></p>
                              </div>
                            )}
                            {msg?.emoji?.length > 0 && (
                              <div
                                onClick={(e) => handleEmojiSenderIdentity(e)}
                                className={`flex ${
                                  msg?.emoji?.length > 1 ? "px-2" : "p-[1px]"
                                } relative cursor-pointer group items-center -translate-x-[10px] ml-auto -mt-3 bg-white rounded-full border gap-1 w-fit`}
                              >
                                {msg?.emoji?.map((emj, i) => {
                                  return (
                                    <span key={i} className="text-[10px]">
                                      {emj.emoji}
                                    </span>
                                  );
                                })}
                                {msg?.emoji?.length > 1 && (
                                  <span className="text-gray-500 text-sm">
                                    {msg?.emoji?.length}
                                  </span>
                                )}
                                <div className="absolute space-y-2 rounded-lg rounded-tr-none shadow-lg hidden -top-[100%] -right-[120px] bg-white z-50 w-[100px] p-2 border">
                                  {msg?.emoji?.map((em, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2"
                                      >
                                        <img
                                          className="w-5 h-5"
                                          src={em.senderProfile}
                                          alt="em.senderName"
                                        />
                                        <div className="text-sm">
                                          {em.senderName.split(" ")[0]}
                                        </div>
                                        <span className="text-[10px]">
                                          {em.emoji}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="hidden group-hover:block text-gray-700">
                            <div className="flex gap-4 -z-10 items-center">
                              <div className="relative z-10">
                                <span
                                  className="GrEmoji cursor-pointer"
                                  onClick={(e) => {
                                    controllEmoji(e, "add", "friend");
                                  }}
                                >
                                  ☹
                                </span>
                                <img
                                  onClick={(e) => {
                                    controllEmoji(e, "remove");
                                  }}
                                  className="w-6 RxCross2 cursor-pointer hidden"
                                  src="/crossed.png"
                                  alt="cross"
                                />
                                <div className="absolute z-30 bg-white border hidden w-[260px] -left-[150px] text-2xl py-2 px-6 rounded-full shadow-xl">
                                  {emojies.map((em, i) => {
                                    return (
                                      <span
                                        onClick={(e) => {
                                          sendEmoji(e, msg, "friend");
                                        }}
                                        key={i}
                                        className="px-1 cursor-pointer"
                                      >
                                        {em}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                              <label
                                className="cursor-pointer"
                                onClick={() => handleReply(msg)}
                                htmlFor="message_text"
                              >
                                <BsReply size={18} />
                              </label>
                              <BsThreeDotsVertical size={18} />
                            </div>
                            <div className="flex justify-end">
                              <h4 className="text-[10px] bg-gray-50 px-2 rounded-full w-fit border block">
                                {moment(msg?.createdAt).format(
                                  "MM/DD/YY, HH:mm"
                                )}
                              </h4>
                            </div>
                          </div>
                        </div>
                        {messageBlog.indexOf(msg) ===
                          messageBlog.length - 1 && (
                          <div className="profile w-10 ">
                            <img
                              className="w-full bg-white p-[2px] z-40 rounded-full"
                              src={userDetails?.profile}
                              alt={userDetails?.name}
                            />
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    ""
                  );
                })}
              </div>
            );
          })}
          {typing &&
            typing.senderId === id &&
            typing.receiverId === store.userInfo.id &&
            typing.message !== "" && (
              <div className="friend-message py-2 relative mb-6 flex items-end mt-4">
                <div className="image-box absolute bottom-5">
                  <img
                    className="w-8 h-8 rounded-full border border-violet-700"
                    src={userDetails?.profile}
                    alt={userDetails?.name}
                  />
                  {typingloading && (
                    <Image
                      className="w-10 absolute right-0 -bottom-5"
                      src={messageloader}
                      alt="loader"
                    />
                  )}
                </div>
                <div
                  style={{ borderRadius: "20px 20px 20px 0px" }}
                  className="px-2 ml-6 bg-gray-100 text-gray-300 max-w-[80%] w-fit text-left"
                >
                  <p ref={scrollRef} className="px-4 py-1 blur-[2px]">
                    {typing.message}
                  </p>
                </div>
              </div>
            )}
          {currentMessages.current &&
            currentMessages.current.length > 0 &&
            currentMessages.current[0].receiverId === id && (
              <div ref={scrollRef}>
                {currentMessages.current.map((msg, i) => {
                  return (
                    <CurrentMessage
                      key={i}
                      allMsg={currentMessages.current}
                      msg={msg}
                      setSendCurrentMsg={setSendCurrentMsg}
                      replyMsgContent={replyContent}
                      setReplyContent={setReplyContent}
                      replyMsgStatus={showReply}
                      toReplyerId={toReplyerId}
                      setToReplyerId={setToReplyerId}
                    />
                  );
                })}
              </div>
            )}
{!seenMsg && (
            <div>
              {lastMessage?.senderId == store.userInfo.id &&
                lastMessage?.seenMessage == true && (
                  <div className="duration-500 flex justify-end">
                    {(typing.message == "" || typing == "") && (
                      <div className="">
                        <img
                          className="rounded-full duration-500 w-5"
                          src={userDetails?.profile}
                          alt="message_image"
                        />
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
          {seenMsg && (
            <div className="duration-500 flex justify-end">
              <div className=""></div>
              <img
                className="rounded-full duration-500 w-5"
                src={userDetails?.profile}
                alt="message_image"
              />
            </div>
          )}

          {loadingImage && (
            <div>
              <div className="w-full flex justify-end">
                <div className="w-[60%] relative">
                  <div className="w-full h-full absolute bg-black/30 top-0 left-0 flex justify-center items-center">
                    Loading...
                  </div>
                  <img
                    className="max-w-full max-h-[350px]"
                    src={imgUri}
                    alt="loading"
                  />
                </div>
              </div>
              <div ref={scrollRef} className="scroll_point"></div>
            </div>
          )}
        </div>
        {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className={"bottom"}>
          <div
            className={`${
              showReply ? "flex" : "hidden"
            } mt-4 bg-white w-full justify-between py-2 border-t px-6`}
          >
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <IoArrowRedoOutline size={18} />
                  <h4 id="replying_to"></h4>
                </div>

                <p id="replying_content"></p>
              </div>
            </div>
            <div>
              <img
                onClick={(e) => {
                  setShowReply(false);
                  setReplyContent("");
                }}
                className="w-6 RxCross2 cursor-pointer"
                src="/crossed.png"
                alt="cross"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <VoiceRecorder
              isStartRecord={isStartRecord}
              setIsStartRecord={setIsStartRecord}
              hiddenTarget={hiddenTarget}
              receiverId={userDetails?._id}
              replyContent={replyContent}
              toReplyerId={toReplyerId}
              scrollToBottom={scrollToBottom}
            />
            {!isStartRecord && (
              <div
                className={`pr-4 ${
                  hiddenTarget ? "pl-4" : ""
                } py-4 flex w-full justify-between items-end gap-2`}
              >
                {!hiddenTarget && (
                  <label htmlFor="send_image">
                    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100">
                      <img
                        className="w-5 cursor-pointer"
                        src="/image-icon.png"
                        alt="message"
                      />
                    </div>
                  </label>
                )}
                <input
                  onChange={handle_media_file}
                  className="hidden"
                  id="send_image"
                  type="file"
                />
                <textarea
                  className="hiddenTarget"
                  id="message_text"
                  ref={messangerRef}
                  value={message}
                  onChange={(e) => {
                    handleMessage(e), scrollToBottom();
                  }}
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

                <div
                  onClick={handleSendMessage}
                  className="flex h-full items-start cursor-pointer mb-2 text-gray-700"
                >
                  <RiSendPlaneLine size={20} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMessageContainer;
