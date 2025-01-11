"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "../../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import { useSocket } from "../../global/SocketProvider";
import { formatetime } from "./components/time";
import Image from "next/image";
import loader from '@/public/loading-buffer.gif'

const MessageBox = ({}) => {
  const { store } = useStore();
    const {socket, myActiveFriends} = useSocket();
  const [messangerFriends, setMessangerFriends] = useState(null);
  // const fetchAllFriendsByMessage = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${baseurl}/messanger/my-friends-by-message`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${store.token}`,
  //         },
  //       }
  //     );

  //     setMessangerFriends(data);
  //   } catch (error) {}
  // };

  const sortedMessages = messangerFriends?.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );
  const handleUrl = (friend) => {
      window.open(`${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`)
   // 
  }

  useEffect(() => {
    async function loadmessage() {
      const data = await fetchAllFriendsByMessage(store.token);
      setMessangerFriends(data);
    }
    loadmessage();
  }, []);
  return (
    <div className="absolute pl-2 top-20 shadow-2xl py-4 right-20 bg-white md:w-3/12 md:h-[80vh] border rounded-2xl z-50">
       <h2 className="text-2xl pl-4 mb-2">Chats</h2>
      {sortedMessages ? (
        <div className="w-full overflow-y-scroll md:h-[70vh]">
      {sortedMessages &&
        sortedMessages.map((friend, i) => {
          return (
            <div onClick={()=> {
              handleUrl(friend)
            }} key={i} className="cursor-pointer">
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
                          { friend.lastMessage.length > 20 ? friend.lastMessage.slice(0,20) + '......' : friend.lastMessage}
                        </span>
                      </h4>
                  </div>
                </div>
            </div>
          );
        })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
           <Image className="-mt-20" src={loader} alt="Loading"/>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
