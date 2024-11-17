'use client'
import { baseurl } from '@/app/config'
import storeContext from '@/app/global/createContex'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMessage } from '../../global/messageProvider'

const CurrentMessage = ({setMessageAnim,allMsg, msg}) => {
    const { store } = useContext(storeContext);
    const element = useRef(null)
    const { dispatch } = useMessage();
    const [isSend,setIsSend] = useState(false)
    const sendMessage = async () => {
      try {
        setIsSend(true)
        setMessageAnim(false)
        const { data } = await axios.post(
          `${baseurl}/messanger/create`,
          { receiverId:msg.receiverId, message: msg.content ? msg.content : "Love" },
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        dispatch({type:'send-message',payload:{senderId : data.senderId._id,receiverId:data.receiverId,message:data.message,seenMessage:data.seenMessage,createdAt:data.createdAt}})
        setIsSend(false)
        setMessageAnim(true)
        allMsg = allMsg.filter(m => m !== msg)
        element.current.remove()
       } catch (error) {
        console.log(error)
       }
    }
    useEffect(() => {
      sendMessage()
    }, [msg]);
  return (
    <div ref={element} className="">
    <h2>{msg.content}</h2>
    {
      isSend && <p>Sending...</p>
    }
  </div>
  )
}

export default CurrentMessage

