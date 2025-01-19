"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "./fetchdata";
import { formatetime } from "../../components/messanger/components/time";
import { useSocket } from "../../global/SocketProvider";

const MessageBox = ({setId,setUserDetails}) => {
  const { store } = useContext(storeContext);
  const {socket, myActiveFriends} = useSocket();
  const [messangerFriends, setMessangerFriends] = useState(null);
  useEffect(() => {
    async function loadmessage() {
      const data = await fetchAllFriendsByMessage(store.token);
      setMessangerFriends(data);
    }
    loadmessage();
  }, []);


  const sortedMessages = messangerFriends?.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
const handleUrl = (friend) => {
  window.history.pushState(null, '', `${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`);
  setId(friend.userId)
  setUserDetails(friend)
 // 
}
//////////////////////////////typing effect///////////////////////////////////
const [typing, setTyping] = useState("");
useEffect(() => {
  socket &&
    socket.on("typingalert", (data) => {
      setTyping(data);
    });
  return () => {
    socket && socket.off("getTypingMsg");
  };
}, [socket]);
/////////////////////////////////re-render users//////////////////////////////////
useEffect(() => {
  socket &&
    socket.on("message-from", () => {
      async function loadmessage() {
        const data = await fetchAllFriendsByMessage(store.token);
        setMessangerFriends(data);
      }
      loadmessage();    
    });
  return () => {
    socket && socket.off("message-from");
  };
}, [socket]);
  return (
    <div className="w-full cursor-pointer">
      {sortedMessages &&
        sortedMessages.map((friend, i) => {
          return (
            <div onClick={()=> {
              handleUrl(friend)
            }} key={i}>
                <div className="px-6 flex gap-4 items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
                  <div className="relative">
                    <img
                      className="w-12 rounded-full"
                      src={friend.UserProfile}
                      alt={friend.userName}
                    />
                    {
                      myActiveFriends?.includes(friend.userId) &&   <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full -right-[2px] bottom-1"></div>
                    }
                  </div>
                  <div>
                      <div className="flex gap-4 items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-700">
                      {friend.userName.split(' ')[0]}
                    </h2>

                    <p className="text-[12px] text-slate-500">
                        {formatetime(friend.lastMessageTime)}
                      </p>
                      </div>
                      <h4 className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {friend.senderId === store.userInfo.id ? "You :" : ""}
                        </span>
                       {
                        typing.message && typing.senderId === friend.userId ? "Typing..." : friend.lastMessage.length > 20 ? friend.lastMessage.content.slice(0,20) + '......' : friend.lastMessage.content
                       }
                      </h4>
                  </div>
                </div>
            </div>
          );
        })}
    </div>
  );
};

export default MessageBox;
