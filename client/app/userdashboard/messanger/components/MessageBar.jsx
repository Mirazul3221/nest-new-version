import React, { useEffect, useState } from 'react'
import { useSocket } from '../../global/SocketProvider';
import { useStore } from '@/app/global/DataProvider';
import { baseurl, viewurl } from '@/app/config';
import { formatetime } from '../../components/messanger/components/time';
import axios from 'axios';
import { commonLogout } from '../../components/common';

const MessageBar = ({setId,setUserDetails,friend}) => {
    const {socket, myActiveFriends} = useSocket();   
      const { store,dispatch:dps } = useStore();
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


const handleUrl = () => {
    window.history.pushState(null, '', `${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`);
    setId(friend.userId)
    setUserDetails(friend)
   // 
  }
  const [hasSeen,setHasSeen] = useState(false);

  const updateUnseenMessage =async () => {
    try {
        await axios.get(`${baseurl}/messanger/update-message-seen-status?senderId=${friend.userId}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
      } catch (error) {
        console.log(error);
        commonLogout(dps)
      }
  }
  const checkMessageStatus =async ()=>{
    socket && await socket.emit('check-message-unseen-status',{senderId:friend.userId,receiverId:store.userInfo.id,message:'status check'})
  }
  return (
    <div onClick={()=> {
      checkMessageStatus()
      setHasSeen(true)
      updateUnseenMessage()
        handleUrl()
      }}>
          <div className="px-6 cursor-pointer flex gap-4 relative items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
            <div className="relative">
              <img
                className="w-12 rounded-full"
                src={friend?.userProfile}
                alt={friend?.userName}
              />
              {
                myActiveFriends?.includes(friend?.userId) &&   <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full -right-[2px] bottom-1"></div>
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
           {
            !hasSeen && friend?.unseenMessageCount>0 && <div className="absolute top-[50%] -translate-y-[50%] right-5 bg-rose-100 text-gray-700 p-1 w-4 h-4 flex justify-center items-center rounded-full shadow-md text-[10px]">{friend?.unseenMessageCount}</div>
           }

           {/* {
            <div className="absolute top-[50%] -translate-y-[50%] right-5 bg-rose-100 text-gray-700 p-1 w-4 h-4 flex justify-center items-center rounded-full shadow-md text-[10px]">{friend?.unseenMessageCount}</div>
           } */}
          </div>
      </div>
  )
}

export default MessageBar