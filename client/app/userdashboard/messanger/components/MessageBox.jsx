"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "./fetchdata";
import { formatetime } from "../../components/messanger/components/time";

const MessageBox = ({}) => {
  const { store } = useContext(storeContext);
  const [messangerFriends, setMessangerFriends] = useState(null);
  useEffect(() => {
    async function loadmessage(params) {
      const data = await fetchAllFriendsByMessage(store.token);
      setMessangerFriends(data);
      console.log(data);
    }
    loadmessage();
  }, []);

  const onlyMyfriends = messangerFriends?.filter((friend) => {
    return friend._id !== store.userInfo.id;
  });

  return (
    <div className="w-full">
      {onlyMyfriends &&
        onlyMyfriends.map((friend, i) => {
          return (
            <div key={i}>
              <Link
                href={`${viewurl}/userdashboard/messanger/${friend.userName}/${friend.userId}`}
              >
                <div className="px-6 flex gap-4 items-center rounded-2xl py-2 border-b hover:bg-gray-200 duration-100">
                  <div className="">
                    <img
                      className="w-12 rounded-full"
                      src={friend.UserProfile}
                      alt={friend.userName}
                    />
                  </div>
                  <div className="">
                    <h2 className="text-lg font-semibold text-slate-700">
                      {friend.userName}
                    </h2>
                    <div className="flex items-end gap-2">
                      <h4 className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {friend.senderId === store.userInfo.id ? "You :" : ""}
                        </span>{" "}
                        {friend.lastMessage}
                      </h4>
                      <p className="text-[12px] text-slate-500">
                        {formatetime(friend.lastMessageTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default MessageBox;
