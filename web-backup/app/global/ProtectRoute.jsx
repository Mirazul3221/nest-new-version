"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import storeContext from "./createContex";
import { useSocket } from "../userdashboard/global/SocketProvider";
import CallReceiverRoom from "../userdashboard/components/messanger/video-audio-callcenter/CallReceiverRoom";
import loading from '@/public/background-loading.gif'
import Image from "next/image";
export const MYONLINEFRIEND = []
const ProtectRoute = ({children}) => {
  const [isMounted,setIsMounted] = useState(false)
  const { store } = useContext(storeContext)
  const router = useRouter()
  const {socket} = useSocket()
  useEffect(() => {
    setIsMounted(true)
  }, []);

  if(!isMounted) return <div className="flex justify-center fixed top-0 left-0 items-center w-screen h-screen"><Image src={loading} alt="Loading image" /></div>;
  const protectRouter = ()=>{
    router.push("/login")
  }
    if (store?.userInfo?.id) {
      return <div>
          <CallReceiverRoom />
           <div className="">
           {children}
           </div>
        </div>  
    } else {
      protectRouter()
    }
}

export default ProtectRoute
//
