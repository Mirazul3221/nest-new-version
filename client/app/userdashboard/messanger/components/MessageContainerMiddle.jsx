import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { groupMessagesBysender } from "./group-message";

const Middle = ({ id }) => {
  const { store } = useContext(storeContext);
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    async function fetchMessage() {
      try {
        const { data } = await axios.get(`${baseurl}/messanger/get/${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setMessages(data);
      } catch (error) {}
    }
    fetchMessage();
  }, [id]);
  const groupMessages = groupMessagesBysender(messages);

  return (
    <div className="w-full">
      {groupMessages?.map((messageBlog, i) => {
        return (
          <div key={i}>
            {messageBlog.map((msg, i) => {
              return (
                <div
                  className={`flex ${
                    msg.senderId === store.userInfo.id ? "justify-end" : ""
                  }`}
                >
                  <div className="max-w-[60%] mb-[1px]">
                    <h1
                      key={i}
                      className={`w-full 
                          ${messageBlog.length === 1 ? "rounded-[30px]" : ""}
                        ${
                        msg.senderId === store.userInfo.id
                          ? "rounded-l-[30px]"
                          : "rounded-r-[30px]"
                      } px-5 py-2
                    ${
                      msg.senderId === store.userInfo.id
                        ? "bg-gray-100 text-right text-gray-700"
                        : "bg-violet-500 text-white"
                    } ${
                        messageBlog.indexOf(msg) === 0 &&
                        messageBlog.length !== 1 &&
                        msg.senderId !== store.userInfo.id
                          ? "rounded-tl-[30px]"
                          : messageBlog.indexOf(msg) ===
                              messageBlog.length - 1 &&
                            messageBlog.length !==1 &&
                            msg.senderId !== store.userInfo.id
                          ? "rounded-bl-[30px]"
                          : ""
                      } 
                     ${
                       messageBlog.indexOf(msg) === 0 &&
                       messageBlog.length !== 1 &&
                       msg.senderId === store.userInfo.id
                         ? "rounded-tr-[30px]"
                         : messageBlog.indexOf(msg) ===
                             messageBlog.length - 1 &&
                           messageBlog.length !== 1 &&
                           msg.senderId === store.userInfo.id
                         ? "rounded-br-[30px]"
                         : ""
                     }
                    `}
                    >
                      {msg.message}
                    </h1>
                    {messageBlog.indexOf(msg) === messageBlog.length - 1 &&
                      messageBlog.length > 0 && msg.senderId !== store.userInfo.id && <div><img src=""/></div>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Middle;
