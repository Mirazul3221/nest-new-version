"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "./fetchdata";
import { formatetime } from "../../components/messanger/components/time";

const MessageBox = ({setId}) => {
  const { store } = useContext(storeContext);
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
 // 
}
  return (
    <div className="w-full cursor-pointer">
      {sortedMessages &&
        sortedMessages.map((friend, i) => {
          return (
            <div onClick={()=> {
              handleUrl(friend)
            }} key={i}>
                <div className="px-6 flex gap-4 items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
                  <div>
                    <img
                      className="w-12 rounded-full"
                      src={friend.UserProfile}
                      alt={friend.userName}
                    />
                  </div>
                  <div>
                      <div className="flex gap-4 items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-700">
                      {friend.userName}
                    </h2>

                    <p className="text-[12px] text-slate-500">
                        {formatetime(friend.lastMessageTime)}
                      </p>
                      </div>
                      <h4 className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {friend.senderId === store.userInfo.id ? "You :" : ""}
                        </span>{" "}
                        {friend.lastMessage}
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
