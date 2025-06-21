'use client'
import React, { useContext, useReducer } from 'react'
import globalDataStore from './globalDataStore'
import { globalDataReducer } from './globalDataReducer'


const MessageProvider = ({children}) => {
    const [appData,dispatch] = useReducer(globalDataReducer,{message:[],user:[],userMemories:[]})
  return (
     <globalDataStore.Provider value ={{appData,dispatch}}>
         {children}
     </globalDataStore.Provider>
  )
}

export default MessageProvider

export const useGlobalData = () =>{
   const getData = useContext(globalDataStore)
   return getData && getData
}