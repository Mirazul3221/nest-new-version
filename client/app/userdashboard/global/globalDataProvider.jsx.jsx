'use client'
import React, { useContext, useReducer, useState } from 'react'
import globalDataStore from './globalDataStore'
import { globalDataReducer } from './globalDataReducer'
import { commonLogout } from '../components/common'
import { useStore } from '@/app/global/DataProvider'
import { useEffect } from 'react'
import { baseurl } from '@/app/config'
import axios from 'axios'


const GlobalDataProvider = ({children}) => {
   const {store, dispatch:storeDispatch} = useStore();
   const [tags,setTags] = useState(false);
    const [appData,dispatch] = useReducer(globalDataReducer,{globalUserProfile:'',message:[],notifications:[],user:[],userMemories:[],rightSideBarData:tags})

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseurl}/userquestions/get-tag/subject/chapter`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setTags(data);
        // Do something with `data` here (e.g., update state)
      } catch (error) {
        console.error("Error fetching data:", error);
        commonLogout(dispatch, error);
      }
    };

    fetchData();
  }, [store.token]);


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