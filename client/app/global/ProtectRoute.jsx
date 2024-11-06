"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import storeContext from "./createContex";
import { useSocket } from "../userdashboard/global/SocketProvider";
import CallReceiverRoom from "../userdashboard/components/messanger/video-audio-callcenter/CallReceiverRoom";
export const MYONLINEFRIEND = []
const ProtectRoute = ({children}) => {
  const [isMounted,setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, []);

  if(!isMounted) return 'mounted';
  const { store } = useContext(storeContext)
  const router = useRouter()
  const {socket} = useSocket()
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
