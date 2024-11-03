"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { dataReducer } from "./dataReducer";
import storeContext from "./createContex";
import { decode_token } from "./extract_jwt";
import axios from "axios";
import { baseurl } from "../config";

const DataProvider = ({ children }) => {
  const localstoreToken = {};
  if (typeof window !== "undefined") {
    // now access your localStorage
    localstoreToken.token = localStorage.getItem("token");
  }
  const [store, dispatch] = useReducer(dataReducer, {
    userInfo: decode_token(localstoreToken.token || ""),
    token: localstoreToken.token,
    searchReasultFromGeneralUser: "",
    searchReasultFromAuthenticUser: "",
    incomingMessage: [],
  });

  /////////////////////////////collect all my friend ids///////////////////////////////////
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
