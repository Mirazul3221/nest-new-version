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
const Middle = ({ id, userDetails }) => {
  const { messages, dispatch } = useMessage();
  const [message, setMessage] = useState("");
  const messangerRef = useRef(null);
  const scrollRef = useRef();
  const { store } = useContext(storeContext);
  const [shallowMessage, setShallowMessage] = useState([]);
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
  console.log(messages);

  if (shallowMessage.length > 0 && shallowMessage[0].receiverId !== id) {
    setShallowMessage([]);
  }
  return (
    <div className="">
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
                    <div className="">
                      {messageBlog.indexOf(msg) === 0 && (
                        <p className="text-center text-sm text-gray-400 mt-4">
                          {formatetime(msg?.createdAt)}
                        </p>
                      )}
                      <div className="flex justify-end">
                        <h2
                          className={`text-right max-w-[60%] w-fit bg-violet-500 mb-[1px] text-indigo-50 py-2 px-6 ${
                            messageBlog.length === 1
                              ? "rounded-full"
                              : "rounded-l-[30px]"
                          } ${
                            messageBlog.indexOf(msg) === 0 &&
                            messageBlog.length > 1
                              ? "rounded-tr-[30px]"
                              : messageBlog.indexOf(msg) ===
                                  messageBlog.length - 1 &&
                                messageBlog.length > 1
                              ? "rounded-br-[30px]"
                              : ""
                          }`}
                        >
                          {msg?.message}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      {messageBlog.indexOf(msg) === 0 && (
                        <p className="text-center text-sm text-gray-400 mt-4">
                          {formatetime(msg?.createdAt)}
                        </p>
                      )}
                      <div className="flex justify-start">
                        <h2
                          className={`text-right max-w-[60%] w-fit bg-gray-200 mb-[1px] text-gray-700 py-2 px-6 ${
                            messageBlog.length === 1
                              ? "rounded-full"
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
                    </div>
                  );
                })}
              </div>
            );
          })}

          {shallowMessage.length > 0 && shallowMessage[0].receiverId === id && (
            <div ref={scrollRef}>
              {shallowMessage.map((msg, i) => {
                return (
                  <CurrentMessage key={i} allMsg={shallowMessage} msg={msg} />
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
              className="flex h-full items-start"
            >
              <RiSendPlaneLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
