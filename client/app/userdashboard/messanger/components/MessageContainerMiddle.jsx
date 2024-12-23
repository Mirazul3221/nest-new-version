"use client";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { groupMessagesBysender } from "./group-message";
import { useMessage } from "../../global/messageProvider";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
import { RiSendPlaneLine } from "react-icons/ri";
import EntryPoint from "../../components/messanger/video-audio-callcenter/EntryPoint";
import CurrentMessage from "./CurrentMessage";
import { formatetime } from "../../components/messanger/components/time";
import "./css/message-animation.css";
import { useSocket } from "../../global/SocketProvider";
import messageloader from "@/public/notification-soun/f35a1c_d8d5997a805a452ba9d3f5cbb48ce87cmv2-ezgif.com-crop.gif";
import Image from "next/image";
import { BsReply, BsThreeDotsVertical } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
const Middle = ({ id, userDetails }) => {
  const { messages, dispatch } = useMessage();
  const [message, setMessage] = useState("");
  const [sendCurrentMsg, setSendCurrentMsg] = useState(false);
  const messangerRef = useRef(null);
  const scrollRef = useRef();
  const { store } = useContext(storeContext);
  const [shallowMessage, setShallowMessage] = useState([]);
  const { socket } = useSocket();
  useEffect(() => {
    async function fetchMessage() {
      try {
        const { data } = await axios.get(`${baseurl}/messanger/get/${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        dispatch({ type: "fetch-message", payload: data });
      } catch (error) {}
    }
    fetchMessage();
  }, [id]);
  const groupMessages = groupMessagesBysender(messages);

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

  const handleSendMessage = () => {
    if (message !== "") {
      setShallowMessage((prev) => [
        ...prev,
        { content: message, receiverId: userDetails._id },
      ]);
    }
    setMessage("");
    scrollToBottom();
  };
  useEffect(() => {
    scrollToBottom();
  }, [sendCurrentMsg]);

  if (shallowMessage.length > 0 && shallowMessage[0].receiverId !== id) {
    setShallowMessage([]);
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
  const [typingloading, setTypingLoading] = useState();
  useEffect(() => {
    socket &&
      socket.on("getTypingMsg", (data) => {
        scrollToBottom();
        setTyping(data);
      });
    return () => {
      socket && socket.off("getTypingMsg");
    };
  }, [socket]);

  useEffect(() => {
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
  }, [typing]);

  //////////////////////////////Here is the logic for getting message and add in store from sender//////////////////////////////
  useEffect(() => {
    socket &&
      socket.on("message-from", (data) => {
        dispatch({ type: "receive-message", payload: data });
        scrollToBottom();
      });
    return () => {
      socket && socket.off("message-from");
    };
  }, [socket]);
  const controllEmoji = (e,ctl,identifire) => {
   if (identifire === 'me') {
     e.target.parentElement.children[2].classList.add('-left-[150px]')
   }
   if (identifire === 'friend') {
     e.target.parentElement.children[2].classList.add('-left-[90px]')
   }

    if(ctl == "add"){
      e.target.parentElement.children[0].classList.add('hidden')
      e.target.parentElement.children[1].classList.remove('hidden')
      e.target.parentElement.children[2].classList.remove('hidden')
    }
    if(ctl == "remove"){
      e.target.parentElement.children[0].classList.remove('hidden')
      e.target.parentElement.children[1].classList.add('hidden')
      e.target.parentElement.children[2].classList.add('hidden')
    }
    //  e.target.parentElement.children[1].classList.remove('hidden')
  }
  const emojies = ['❤️','😍','😭','😮','😡'];
  const sendEmoji = async (e,msg,identifire)=>{
    const emj = document.createElement('p');
    e.target.parentElement.parentElement.children[2].classList.add('hidden')
    emj.classList.add('emoji_container')
    emj.classList.add('-mt-5')
    emj.classList.add('text-[12px]')
    emj.classList.add('bg-white')
    emj.classList.add('p-[1px]')
    emj.classList.add('w-fit')
    emj.classList.add('rounded-full')
    emj.classList.add('border')
    emj.classList.add('border-gray-400')
   
    if(identifire === 'me'){
      if (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.length <= 1) {
        emj.textContent=  e.target.innerText
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].appendChild(emj); 
       } else {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent = e.target.innerText
      }
    } else {
      emj.classList.add('ml-auto')
      if (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children.length <= 1) {
        emj.textContent=  e.target.innerText
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].appendChild(emj); 
       } else {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].textContent = e.target.innerText
      }
    }

  }

  useEffect(() => {
  const allContainer = document.querySelectorAll('.emoji_container');
     allContainer.length > 0 &&  allContainer?.forEach(cont => cont.remove())
  const GrEmoji = document.querySelectorAll('.GrEmoji');
  const RxCross2 = document.querySelectorAll('.RxCross2');
  RxCross2 && RxCross2.forEach(c => c.classList.add('hidden'))
  GrEmoji && GrEmoji.forEach(c => c.classList.remove('hidden'))
  }, [id]);
  return (
    <div>
      <div className="top-bar px-4 rounded-t-2xl py-2 bg-violet-500 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            className="rounded-full w-12"
            src={userDetails?.profile}
            alt={userDetails?.name}
          />
          <div className="text-white">
            <h2>{userDetails?.name}</h2>
            <p className="text-[12px]">{userDetails?.status}</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 text-white">
          <EntryPoint
            user={{
              myId: store.userInfo.id,
              fdId: userDetails?._id,
              name: userDetails?.name,
              profile: userDetails?.profile,
              title: userDetails?.title,
              type: "Audio",
              size: 35,
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
              size: 35,
            }}
          />
        </div>
      </div>
      <div className=" overflow-y-scroll  hidden_scroll h-[71vh]">
        <div className="w-full overflow-y-auto hidden_scroll h-[60vh] py-6 px-4 bg-white">
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
          {groupMessages?.map((messageBlog, i) => {
            return (
              <div key={i} className="mt-10">
                {messageBlog.map((msg, i) => {
                  return msg?.senderId === store.userInfo.id ? (
                    <div key={i}>
                      {messageBlog.indexOf(msg) === 0 && (
                        <p className="text-center text-sm text-gray-400 mt-4">
                          {formatetime(msg?.createdAt)}
                        </p>
                      )}
                      <div className="flex relative justify-end items-center gap-3 group">
                        <div className="hidden relative group-hover:block text-gray-700">
                          <div className="flex gap-4 items-center">
                            <BsThreeDotsVertical size={20} />
                            <BsReply size={20} />
                            <div className="group relative">
                            <GrEmoji onClick={(e)=>{controllEmoji(e,'add','me')}} size={20} className="GrEmoji cursor-pointer" />
                            <RxCross2  onClick={(e)=>{controllEmoji(e,'remove')}} size={20} className="RxCross2 cursor-pointer hidden" />
                            <div className="absolute z-50 bg-white border hidden w-[260px] text-2xl py-2 px-6 rounded-full shadow-xl">
                              {
                                emojies.map((em,i)=>{
                                   return <span onClick={(e)=>{sendEmoji(e,msg,'me')}} key={i} className="px-1 cursor-pointer">{em}</span>
                                })
                              }
                            </div>
                            </div>
                           
                          </div>
                          <div className="flex justify-end">
                            <h4 className="text-[12px] bg-gray-50 px-2 rounded-full w-fit border block">
                              {moment(msg?.createdAt).format("MM/DD/YY, HH:mm")}
                            </h4>
                          </div>
                        </div>
                        <div className="max-w-[60%] w-fit">
                        <h2
                          ref={scrollRef}
                          className={`${
                            i === messageBlog.length - 1 &&
                            messageBlog.length > 1
                              ? "msg_anim "
                              : ""
                          } text-right duration-500 w-fit bg-violet-500 mb-[1px] text-indigo-50 py-2 px-6 ${
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
                          }`}
                        >
                          {msg?.message}
                        </h2>
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
                          }`}
                        >
                          {msg?.message}
                        </h2>
                        </div>
                        <div className="hidden group-hover:block text-gray-700">
                          <div className="flex gap-4 items-center">
                          <div className="group relative">
                            <GrEmoji onClick={(e)=>{controllEmoji(e,'add','friend')}} size={20} className="GrEmoji cursor-pointer" />
                            <RxCross2  onClick={(e)=>{controllEmoji(e,'remove')}} size={20} className="RxCross2 cursor-pointer hidden" />
                            <div className="absolute z-50 bg-white border hidden w-[260px] -left-[150px] text-2xl py-2 px-6 rounded-full shadow-xl">
                              {
                                emojies.map((em,i)=>{
                                   return <span onClick={(e)=>{sendEmoji(e,msg,'friend')}} key={i} className="px-1 cursor-pointer">{em}</span>
                                })
                              }
                            </div>
                            </div>
                            <BsReply size={18} />
                            <BsThreeDotsVertical size={18} />
                          </div>
                          <div className="flex justify-end">
                            <h4 className="text-[12px] bg-gray-50 px-2 rounded-full w-fit border block">
                              {moment(msg?.createdAt).format("MM/DD/YY, HH:mm")}
                            </h4>
                          </div>
                        </div>
                      </div>
                      {messageBlog.indexOf(msg) === messageBlog.length - 1 && (
                        <div className="profile w-10 ">
                          <img
                            ref={scrollRef}
                            className="w-full bg-white p-[2px] z-50 rounded-full"
                            src={userDetails?.profile}
                            alt={userDetails?.name}
                          />
                        </div>
                      )}
                    </div>
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
          {shallowMessage.length > 0 && shallowMessage[0].receiverId === id && (
            <div ref={scrollRef}>
              {shallowMessage.map((msg, i) => {
                return (
                  <CurrentMessage
                    key={i}
                    allMsg={shallowMessage}
                    msg={msg}
                    setSendCurrentMsg={setSendCurrentMsg}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className={"bottom"}>
          <div className="p-4 flex justify-between items-end gap-2">
            <textarea
              ref={messangerRef}
              value={message}
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

            <div
              onClick={handleSendMessage}
              className="flex h-full items-start cursor-pointer mb-2 text-gray-700"
            >
              <RiSendPlaneLine size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
