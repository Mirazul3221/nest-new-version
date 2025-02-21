"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useState } from "react";
import { fetchAllFriendsByMessage } from "../../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import Image from "next/image";
import loader from '@/public/loading-buffer.gif'
import MessageBar from "./MessageBar";
import { useMessage } from "../../global/messageProvider";

const MessageBox = ({sortedMessages,setCountUnreadMessage,messageContainerRef,toggleMessage}) => {
    const {store} = useStore()
        const { dispatch } = useMessage();
      const [hiddenNumber, setHiddenNumber] = useState(false);
      const handleUrl = (friend) => {
      window.open(`${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`)
   // 
  }

  const updateUnseenMessage =async (id) => {
    try {
        await axios.get(`${baseurl}/messanger/update-message-seen-status?senderId=${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
  }

  const reRenderUserProfiles = async() => {
    const data = await fetchAllFriendsByMessage(store.token);
    dispatch({type:'STORE_ALL_MESSANGER_USER',payload:data})
  }
  return (
    <div ref={messageContainerRef} className="choda md:absolute fixed pl-2 top-0 md:top-20 shadow-2xl py-4 right-0 md:right-20 w-full md:w-3/12 bg-white h-screen md:h-[80vh] border rounded-2xl z-50">
      <div className="flex px-4 md:block justify-between items-center">
      <h2 className="text-2xl">Chats</h2> <span className="md:hidden">closs</span>
      </div>
      {sortedMessages ? (
        <div className="w-full overflow-y-scroll md:h-[70vh]">
      {sortedMessages &&
        sortedMessages.map((friend, i) => {
          return (
            <div onClick={()=> {
              reRenderUserProfiles()
              setHiddenNumber(true)
              updateUnseenMessage(friend?.userId)
              setCountUnreadMessage(prev=> prev - friend.unseenMessageCount)
              setTimeout(() => {
                toggleMessage()
              }, 200);
               handleUrl(friend)
            }} key={i} className="cursor-pointer">
                <MessageBar friend={friend} hiddenNumber={hiddenNumber} /> 
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
