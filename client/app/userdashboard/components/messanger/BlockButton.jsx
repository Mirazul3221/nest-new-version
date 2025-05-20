import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { TbRuler3 } from "react-icons/tb";
import { useSocket } from "../../global/SocketProvider";
import { commonLogout } from "../common";

const BlockButton = ({ blockedUserId, name,status, globleCheckIsBlockedByMe,setIsBlockedByMe}) => {
  const { store,dispatch } = useStore();
  const {socket} = useSocket();
  const [isBlocked, setIsBlocked] = useState(status);
  const [loading,setLoading] = useState(false);
  
  const blockunbloUser = async () => {
    const wantBlock = confirm(`${isBlocked ? "You are going to unblock " + name : "Are you sure!"}`)
     if (wantBlock){
      try {
        setLoading(true)
      await axios.post(`${baseurl}/auth/user/${isBlocked ?'unblock':'block'}/${blockedUserId}`,"", {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      socket && await socket.emit('user-block-and-unblock-status',[blockedUserId, store.userInfo.id, !isBlocked])
      setIsBlocked(!isBlocked);
      setIsBlockedByMe && setIsBlockedByMe(!isBlocked)
      globleCheckIsBlockedByMe &&  globleCheckIsBlockedByMe(!isBlocked)
      
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      commonLogout(dispatch,error)
    }
     }
  };
  return (
    <div>
      <button disabled={loading} onClick={blockunbloUser}>
        {
            loading ? "Loading..." : <span>{isBlocked ? "Unblock" : "Block"} {name?.split(" ")[0]}</span>
        }
      </button>
    </div>
  );
};

export default BlockButton;//
