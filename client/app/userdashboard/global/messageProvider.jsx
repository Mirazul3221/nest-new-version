'use client'
import React, { useContext, useReducer } from 'react'
import messageStore from './messageContext'
import { messageReducer } from './messageReducer'

const MessageProvider = ({children}) => {
    const [messanger,dispatch] = useReducer(messageReducer,{message:[],user:[]})
  return (
     <messageStore.Provider value ={{messanger,dispatch}}>
         {children}
     </messageStore.Provider>
  )
}

export default MessageProvider

export const useMessage = () =>{
   const getMsg = useContext(messageStore)
   return getMsg && getMsg
}