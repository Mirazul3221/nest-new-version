'use client'
import React, { useContext, useReducer } from 'react'
import globalDataStore from './globalDataStore'
import { globalDataReducer } from './globalDataReducer'


const GlobalDataProvider = ({children}) => {
    const [appData,dispatch] = useReducer(globalDataReducer,{message:[],notifications:[],user:[],userMemories:[]})
  return (
     <globalDataStore.Provider value ={{appData,dispatch}}>
         {children}
     </globalDataStore.Provider>
  )
}

export default GlobalDataProvider

export const useGlobalData = () =>{
   const getData = useContext(globalDataStore)
   return getData && getData
}