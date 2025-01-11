'use client'
import React, { useContext, useReducer } from 'react'
import messageStore from './messageContext'
import { messageReducer } from './messageReducer'

const MessageProvider = ({children}) => {
    const [messages,dispatch] = useReducer(messageReducer,[])
  return (
     <messageStore.Provider value ={{messages,dispatch}}>
         {children}
     </messageStore.Provider>
  )
}

export default MessageProvider

export const useMessage = () =>{
   const getMsg = useContext(messageStore)
   return getMsg && getMsg
}