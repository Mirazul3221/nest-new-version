"use client";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMessage } from "../../global/messageProvider";
import { useSocket } from "../../global/SocketProvider";
import { commonLogout } from "../../components/common";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CurrentMessage = ({
  msg,
  setSendCurrentMsg,
  replyMsgContent,
  setReplyContent,
  toReplyerId,
  setToReplyerId,
}) => {
  const { store, dispatch: dps } = useContext(storeContext);
  const { socket } = useSocket();
  const element = useRef(null);
  const { dispatch } = useMessage();
  const [isSend, setIsSend] = useState(false);
  const sendMessage = async () => {
    try {
      setIsSend(true);
      setSendCurrentMsg(true);
      const { data } = await axios.post(
        `${baseurl}/messanger/message-create`,
        {
          receiverId: msg.receiverId,
          message: msg.message.content ? msg.message.content : "Love",
          reply: [replyMsgContent.innerText, toReplyerId],
          seenMessage: msg.seenStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      if (data == "User is blocked") {
        alert("You cannot send message to this user!");
      } else {
        setReplyContent("");
        setToReplyerId(null);
        socket &&
          socket.emit("message-to", {
            ...data,
            name: store.userInfo.name,
            profile: store.userInfo.profile,
          });
        dispatch({ type: "send-message", payload: data });
        setIsSend(false);
        setSendCurrentMsg(false);
        element.current?.remove();
      }
    } catch (error) {
      console.log(error);
      commonLogout(dps);
    }
  };
  useEffect(() => {
    sendMessage();
  }, []);
  return (
    <div>
      <div ref={element} className="flex justify-end">
        <div className="">
          <h2 className="px-6 py-2 bg-violet-400 text-gray-600 rounded-full">
            {msg.message.content}
          </h2>
          {isSend && (
            <div className="text-gray-400 flex gap-1 items-center">
              {" "}
              <AiOutlineLoading3Quarters
                className="animate-spin text-gray-400 text-center"
                size={14}
              />{" "}
              <p>Sending...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentMessage;
