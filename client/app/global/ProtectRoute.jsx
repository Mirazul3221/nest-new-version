"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import storeContext from "./createContex";
import { useSocket } from "../userdashboard/global/SocketProvider";
import CallReceiverRoom from "../userdashboard/components/messanger/video-audio-callcenter/CallReceiverRoom";
export const MYONLINEFRIEND = []
const ProtectRoute = ({children}) => {
  const { store } = useContext(storeContext)
  const router = useRouter()
  const {socket} = useSocket()
  useEffect(() => {
   socket && socket.emit("myUserInfo",{id:store.userInfo.id,name:store.userInfo.name})
    return () => {
      socket?.disconnect()
    };
  }, []);
  const protectRouter = ()=>{
    router.push("/login")
  }
    if (store?.userInfo?.id) {
      return <div>
          <CallReceiverRoom />
        {children}
        </div>  
    } else {
      protectRouter()
    }
}

export default ProtectRoute
//
