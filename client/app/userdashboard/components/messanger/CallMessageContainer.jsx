"use client";
import React, { useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import FloatingMessageContainer from "./MessageContainer";
import { useSocket } from "../../global/SocketProvider";
import { useStore } from "@/app/global/DataProvider";

const CallMessageContainer = ({ id, userDetails }) => {
  const {socket} = useSocket()
  const {store} = useStore()
  const [switcher, setSwitcher] = useState(false);
  const check_my_friend_window =async () => {
    socket && socket.emit('check-my-friend-window',{from:store.userInfo.id,to:id,status:true})
  }
  return (
    <div>
      {!switcher && (
        <button
          className="bg-violet-700 px-4 flex items-center gap-2 rounded-md text-white"
          onClick={() => {setSwitcher(true); check_my_friend_window()}}
          
        >
          <BiMessageRoundedDots /> Messaging
        </button>
      )}

      <div
        className={`${
          switcher ? "scale-1" : "scale-0"
        } fixed duration-200 -left-0 md:left-1/3 md:h-auto pb-4 bg-white origin-bottom-left bottom-0 md:bottom-10 w-screen md:w-4/12 z-50 md:ml-6 border rounded-md`}
      >
       {
        switcher &&  <FloatingMessageContainer id={id} userDetails={userDetails} setSwitcher={setSwitcher}/>
       }
      </div>
    </div>
  );
};

export default CallMessageContainer;
////
