'use client'
import React, { useContext, useReducer } from 'react'
import globalDataStore from './globalDataStore'
import { globalDataReducer } from './globalDataReducer'
import { commonLogout } from '../components/common'
import { useStore } from '@/app/global/DataProvider'
import { useEffect } from 'react'
import { baseurl } from '@/app/config'
import axios from 'axios'


const GlobalDataProvider = ({children}) => {
   const {store, dispatch:storeDispatch} = useStore()
    const [appData,dispatch] = useReducer(globalDataReducer,{message:[],notifications:[],user:[],userMemories:[]})

     const fetchIds = async () => {
       try {
         const { data } = await axios.get(`${baseurl}/auth/asked-for-short-link-generator`, {
           headers: {
             Authorization: `Bearer ${store.token}`,
           },
         });
         localStorage.setItem('sortLink',JSON.stringify(data));
         return data
       } catch (error) {
         commonLogout(storeDispatch, error);
       }
     };

     useEffect(() => {
      const link = localStorage.getItem('sortLink');
      if(!link) fetchIds();
     }, []);

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