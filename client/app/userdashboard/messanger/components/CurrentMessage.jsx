'use client'
import { baseurl } from '@/app/config'
import storeContext from '@/app/global/createContex'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMessage } from '../../global/messageProvider'
import { useSocket } from '../../global/SocketProvider'

const CurrentMessage = ({allMsg, msg,setSendCurrentMsg,replyMsgContent,setReplyContent,replyMsgStatus,toReplyerId,setToReplyerId}) => {
    const { store } = useContext(storeContext);
    const {socket} = useSocket()
    const element = useRef(null)
    const { dispatch } = useMessage();
    const [isSend,setIsSend] = useState(false)
    const replyText = replyMsgContent.innerText;
    const sendMessage = async () => {
      try {
        setIsSend(true)
        setSendCurrentMsg(true)
        const { data } = await axios.post(
          `${baseurl}/messanger/message-create`,
          { receiverId:msg.receiverId, message: msg.message.content ? msg.message.content : "Love", reply: [replyText,toReplyerId]},
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setReplyContent('')
        setToReplyerId(null)
        const reformData = {_id:data._id, senderId : data.senderId._id,receiverId:data.receiverId,message:data.message,reply:data.reply,seenMessage:data.seenMessage,createdAt:data.createdAt}
        socket && socket.emit('message-to',reformData)
        dispatch({type:'send-message',payload:reformData})
        setIsSend(false)
        setSendCurrentMsg(false)
        allMsg = allMsg.filter(m => m.content !== msg)
        element.current.remove()
       } catch (error) {
        console.log(error)
       }
    }
    useEffect(() => {
      sendMessage()
    }, [msg]);
  return (
    <div ref={element} className="flex justify-end">
   <div className="">
   <h2 className='px-6 py-2 bg-violet-400 text-gray-600 rounded-full'>{msg.message.content}</h2>
    {
      isSend && <p>Sending...</p>
    }
   </div>
  </div>
  )
}

export default CurrentMessage

