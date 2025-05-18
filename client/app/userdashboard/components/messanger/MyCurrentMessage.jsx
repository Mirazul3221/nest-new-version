"use client";
// import a from '@/public/notification-soun/1sec.mp3'
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import { MYONLINEFRIEND } from "@/app/global/ProtectRoute";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useSocket } from "../../global/SocketProvider";
import { commonLogout } from "../common";

const MyCurrentMessage = ({
  id,
  currentMessage,
  onlineUser,
  receiverId,
  receiverName,
  profile,
  title,
  status,
  desc,
  msg,
}) => {
  const { store,dispatch } = useContext(storeContext);
  const [msgStatus, setMsgStatus] = useState('sending...');
  const [loader, setLoader] = useState(false);
  const removeMsgRef = useRef(null);
   const {socket} = useSocket()
   const msgTime = new Date().getDay()
  ////////////////////////////This Function has been created for providing levele system//////////////////////////////////////
  const setALevel = (stack, level) => {
    stack[stack.length - 1].status = level;
    for (let i = 0; i < stack.length - 1; i++) {
      stack[i].status = false;
    }
  };
  setALevel(currentMessage, true);
  const sendMessageToMyFriend = async () => {
    const audio = new Audio("/notification-soun/1sec.mp3");
    audio.play();
    try {
      const urlPattern = /(https?:\/\/[^\s]+)/g; // Regex to detect links
      // Split the message and replace links with anchor tags
      const parts = msg.message.split(urlPattern).map((part, index) => {
        if (urlPattern.test(part)) {
          const linkMsg = ` <a
              key="${index}"
              href="${part}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${part}
            </a>`;
          msg.message = linkMsg;
        }
      });

      setLoader(true);
      const { data } = await axios.post(
        `${baseurl}/messanger/message-create`,
        { receiverId, message: msg.message ? msg.message : "Love" },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      await socket?.emit("send-message-to-my-friend", {
        receiverId,
        message: msg?.message,
      });
      setMsgStatus("sent");
   
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      commonLogout(dispatch)
    }
  };

  useEffect(() => {
    sendMessageToMyFriend();
    return () => {
      sendMessageToMyFriend();
    };
  }, []);

  if (msgStatus === "sent") {
       if (msgStatus !== 'Delivered') {
        setInterval(async() => {
          await socket.emit('checkSenderOnlineStatus',id)
         await socket.on('getSenderOnlineStatus',(online)=>{
            online && setMsgStatus("Delivered")
           })
        }, 1000);
       }
    }

  const isOnline = MYONLINEFRIEND?.some((O) => O === receiverId);
  if (onlineUser) {
    removeMsgRef.current.remove();
  }

  return (
    <div ref={removeMsgRef} className={`my-message py-2`}>
      <div className="w-full">
        <div className="w-full flex justify-end relative">
          <div
            style={{ borderRadius: "20px 20px 0px 20px" }}
            className="max-w-[80%] box-border overflow-hidden bg-gray-100 border border-gray-150 py-2 px-3 text-right"
          >
            {HTMLReactParser(msg.message)}
          </div>
          {msg.hasSeen && (
            <img
              className="absolute w-4 -bottom-2 -right-1"
              src={profile}
              alt="profile"
            />
          )}
          <p>{msgTime}</p>
          {msg.hasSeen !== true && (
            <p className={`text-[8px] duration-150 absolute -bottom-3 ${msgStatus === "sending..." ? "text-rose-500" : msgStatus === "sent" ? "text-green-500" : 'text-violet-700'}`}>
              {msg?.status ? msgStatus : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
////////////////////////////////

export default MyCurrentMessage;
