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
  groupMessages?.map((m) => {
    console.log(m);
    m.map((n) => {
      console.log(n);
    });
  });

  return (
    <div className="w-full">
      {groupMessages?.map((messageBlog,i) => {
        return (
          <div key={i}>
            {messageBlog.map((msg,i) => {
              return (
                <h1 key={i}
                  className={`
                    ${
                      messageBlog.length === 1 ? "rounded-full" : ""
                    }
                    ${
                    msg.senderId === store.userInfo.id
                      ? "bg-gray-400 text-right"
                      : "bg-violet-500"
                  } ${
                     messageBlog.indexOf(msg) === 0 ? "rounded-tl-full" :  messageBlog.indexOf(msg) === messageBlog.length - 1 ? "rounded-bl-full" : ""

                  }  `}
                >
                  {msg.message}
                </h1>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Middle;
