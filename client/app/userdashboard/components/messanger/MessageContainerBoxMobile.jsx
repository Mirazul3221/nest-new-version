"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "../../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import { useSocket } from "../../global/SocketProvider";
import { formatetime } from "./components/time";
import Image from "next/image";
import loader from "@/public/loading-buffer.gif";
import Middle from "../../messanger/components/MessageContainerMiddle";
import { GrRotateRight } from "react-icons/gr";
import { LiaTimesSolid } from "react-icons/lia";
import MessageBar from "./MessageBar";
import { useMessage } from "../../global/messageProvider";
import { commonLogout } from "../common";

const MessageContainerBoxMobile = ({
  sortedMessages,
  setIsOpenMobileMessage,
  setCountUnreadMessage,
}) => {
  const { myActiveFriends, socket } = useSocket();
  const [openWindow, setOpenWindow] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hiddenNumber, setHiddenNumber] = useState(false);
  const { store,dispatch:storeDispatch } = useStore();
    const { dispatch } = useMessage();
  const updateUnseenMessage = async (id) => {
    try {
      setLoading(true);
      await axios.get(
        `${baseurl}/messanger/update-message-seen-status?senderId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      commonLogout(storeDispatch)
    }
  };

  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-profile/${id}`);
      setUserDetails(data);
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser(userId);
  }, [userId, openWindow]);

  const reRenderUserProfiles = async() => {
    const data = await fetchAllFriendsByMessage(store.token);
    dispatch({type:'STORE_ALL_MESSANGER_USER',payload:data})
  }

  return (
    <div className="fixed overflow-hidden w-screen left-0 top-0 shadow-2xl right-0 bg-white h-screen z-50">
      {!openWindow && (
        <div className="w-[100vw] overflow-hidden">
          <div className="flex px-4 pr-6 md:block justify-between mt-4">
            <h2 className="text-2xl">Chats</h2>
            <span
              onClick={() => {
                setIsOpenMobileMessage(false);
              }}
              className="md:hidden"
            >
              <LiaTimesSolid />
            </span>
          </div>
          {sortedMessages ? (
            <div className="w-full overflow-y-scroll">
              {sortedMessages &&
                sortedMessages.map((friend, i) => {
                  return (
                    <div
                      onClick={() => {
                        setUserDetails(null);
                        setUserId(friend.userId);
                        setOpenWindow(true);
                        updateUnseenMessage(friend?.userId);
                        setCountUnreadMessage(
                          (prev) => prev - friend.unseenMessageCount
                        );
                        setHiddenNumber(true);
                        reRenderUserProfiles()
                      }}
                      key={i}
                      className="cursor-pointer overflow-hidden"
                    >
                      <MessageBar friend={friend} hiddenNumber={hiddenNumber} />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <Image className="-mt-20" src={loader} alt="Loading" />
            </div>
          )}
        </div>
      )}
      <div
        className={`w-[100vw] ${
          openWindow ? "scale-1 w-full h-full" : "scale-0 w-0 h-0"
        } relative overflow-hidden`}
      >
        {openWindow && (
          <Middle
            id={userId}
            userDetails={userDetails}
            device="mobile"
            setOpenWindow={setOpenWindow}
          />
        )}

        <div className="px-6 mt-2 flex justify-between items-center">
          <div
            onClick={() => {
              setIsOpenMobileMessage(false), setOpenWindow(false);
            }}
            className="back"
          >
            <LiaTimesSolid />
          </div>
          <div onClick={() => setOpenWindow(false)} className="back">
            <GrRotateRight />
          </div>
        </div>
        {loading && (
          <div className="absolute flex justify-center items-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContainerBoxMobile;
