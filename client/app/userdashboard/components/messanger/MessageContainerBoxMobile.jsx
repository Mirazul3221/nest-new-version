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

const MessageContainerBoxMobile = ({
  sortedMessages,
  setIsOpenMobileMessage,
  setCountUnreadMessage,
}) => {
  const { myActiveFriends } = useSocket();
  const [openWindow, setOpenWindow] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { store } = useStore();
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
  }, [userId]);
  return (
    <div className="fixed overflow-hidden pl-2 w-screen left-0 top-0 shadow-2xl right-0 bg-white h-screen z-50">
      <div
        className={`${
          openWindow ? "-translate-x-[103vw]" : "translate-x-0"
        } duration-150 w-[200vw] flex h-full`}
      >
        <div className="w-[100vw] overflow-hidden">
          <div className="flex px-4 pr-6 md:block justify-between mt-4">
            <h2 className="text-2xl">Chats</h2>
            <span
              onClick={() => setIsOpenMobileMessage(false)}
              className="md:hidden"
            >
              < LiaTimesSolid/>
            </span>
          </div>
          {sortedMessages ? (
            <div className="w-full overflow-y-scroll md:h-[70vh]">
              {sortedMessages &&
                sortedMessages.map((friend, i) => {
                  return (
                    <div
                      onClick={() => {
                        setUserId(friend.userId);
                        setOpenWindow(true);
                        // updateUnseenMessage(friend?.userId);
                        // setCountUnreadMessage(
                        //   (prev) => prev - friend.unseenMessageCount
                        // );
                      }}
                      key={i}
                      className="cursor-pointer"
                    >
                      <div className="px-6 relative flex gap-4 items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
                        <div className="relative">
                          <img
                            className="w-12 rounded-full"
                            src={friend.userProfile}
                            alt={friend.userName}
                          />
                          {myActiveFriends?.includes(friend.userId) ? (
                            <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full -right-[2px] bottom-1"></div>
                          ) : (
                            <div className="w-3 h-3 border-2 border-white bg-gray-400 absolute rounded-full -right-[2px] bottom-1"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex gap-4 items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-700">
                              {friend.userName.split(" ")[0]}
                            </h2>

                            <p className="text-[12px] text-slate-500">
                              {formatetime(friend.lastMessageTime)}
                            </p>
                          </div>
                          <h4 className="text-sm text-slate-500">
                            <span className="font-semibold text-slate-700">
                              {friend.senderId === store.userInfo.id
                                ? "You :"
                                : ""}
                              {friend.lastMessage.length > 20
                                ? friend.lastMessage.content.slice(0, 20) +
                                  "......"
                                : friend.lastMessage.content}
                            </span>
                          </h4>
                        </div>
                        {friend?.unseenMessageCount > 0 && (
                          <div className="absolute top-[50%] -translate-y-[50%] right-5 bg-rose-100 text-gray-700 p-1 w-4 h-4 flex justify-center items-center rounded-full shadow-md text-[10px]">
                            {friend?.unseenMessageCount}
                          </div>
                        )}
                      </div>
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
        <div className="w-[100vw] relative">
          {userDetails && (
            <Middle
              id={userDetails?._id}
              userDetails={userDetails}
              device="mobile"
            />
          )}

          <div className="px-6 mt-2 flex justify-between items-center">
            <div onClick={() => setIsOpenMobileMessage(false)} className="back">
              < LiaTimesSolid/>
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
    </div>
  );
};

export default MessageContainerBoxMobile;
