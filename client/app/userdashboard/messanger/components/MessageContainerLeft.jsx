"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useStore } from "@/app/global/DataProvider";
import MessageBar from "./MessageBar";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useMessage } from "../../global/messageProvider";

const MessageBox = ({ setId, setUserDetails }) => {
  const { store } = useStore();
  const [messangerFriends, setMessangerFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, messanger } = useMessage();
  const fetchAllFriendsByMessage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseurl}/messanger/my-friends-by-both-message-and-profile`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      dispatch({ type: "STORE_ALL_MESSANGER_USER", payload: data });
      setLoading(false);
    } catch (error) {
      console.error("API Fetch Error:", error.response?.data || error.message);
      setLoading(false);
      throw error; // ❗ Rethrow the error to handle it properly
    }
  };

  useEffect(() => {
    fetchAllFriendsByMessage(store.token)
  }, []);
  
  const sortedMessages = messanger?.user?.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );

  return (
    <div className="w-full bg-white">
      {loading ? (
        <div className="mt-4 h-[72vh] overflow-y-auto space-y-2">
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
          <div className="py-2 rounded-md bg-gray-300 animate-pulse px-4 flex justify-between">
            <div className="bg-white rounded-full w-12 h-12"></div>
            <div className="w-10/12 space-y-2 mt-1">
              <p className="py-1 bg-white w-11/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-10/12 ml-4 rounded-3xl"></p>
              <p className="py-1 bg-white w-9/12 ml-4 rounded-3xl"></p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {sortedMessages &&
            sortedMessages.map((friend, i) => {
              return (
                <MessageBar
                  setId={setId}
                  setUserDetails={setUserDetails}
                  key={i}
                  friend={friend}
                  setMessangerFriends={setMessangerFriends}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
