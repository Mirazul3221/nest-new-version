"use client";
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { dataReducer } from "./dataReducer";
import storeContext from "./createContex";
import { decode_token } from "./extract_jwt";
import axios from "axios";
import { baseurl } from "../config";

const DataProvider = ({ children }) => {
  const localstore = {};
  if (typeof window !== "undefined") {
    // now access your localStorage
    localstore.token = localStorage.getItem("token");
    localstore.allAcceptedFriend = JSON.parse(localStorage.getItem("allAcceptedFriend"));
    localstore.getAllPendingFriend = JSON.parse(localStorage.getItem("PendingFriend"));
  }
  const [store, dispatch] = useReducer(dataReducer, {
    userInfo: decode_token(localstore.token || ""),
    token: localstore.token,
    searchReasultFromGeneralUser: "",
    searchReasultFromAuthenticUser: "",
    incomingMessage: [],
    getAllPendingFriend:[],
    getAllAcceptedFriend:localstore.allAcceptedFriend,
    requestedFriendId : ''
  });

  /////////////////////////////collect all my friend ids/////////////////////////////////////
  async function getAllMyFriendsId() {
   try {
    const { data } = await axios.get(
      `${baseurl}/friend-request/get-friend/accepted`,
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
   } catch (error) {
    
   }
  }
  useEffect(() => {
    getAllMyFriendsId();
  }, []);
  return (
    <div>
      <storeContext.Provider value={{ store, dispatch }}>
        {children}
      </storeContext.Provider>
    </div>
  );
};

export default DataProvider;///////

export const useStore = ()=>{
  const store = useContext(storeContext)
  return store
}


// console.log(useStore())

