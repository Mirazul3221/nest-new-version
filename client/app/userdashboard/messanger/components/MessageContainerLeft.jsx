"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "./fetchdata";
import { useStore } from "@/app/global/DataProvider";
import MessageBar from "./MessageBar";

const MessageBox = ({setId,setUserDetails}) => {
  const { store } = useStore();
  const [messangerFriends, setMessangerFriends] = useState(null);
  useEffect(() => {
    async function loadmessage() {
      const data = await fetchAllFriendsByMessage(store.token);
      setMessangerFriends(data);
    }
    loadmessage();
  }, []);


  const sortedMessages = messangerFriends?.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
  return (
    <div className="w-full bg-white cursor-pointer">
      {sortedMessages &&
        sortedMessages.map((friend, i) => {
          return (
             <MessageBar setId={setId} setUserDetails={setUserDetails} key={i} friend={friend}/>
          );
        })}
    </div>
  );
};

export default MessageBox;
