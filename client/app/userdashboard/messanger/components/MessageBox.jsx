"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useEffect } from "react";

const MessageBox = ({}) => {
  const { store } = useContext(storeContext);
  const [messangerFriends, setMessangerFriends] = useState(null);
  const fetchAllFriendsByMessage = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/messanger/my-friends-by-message`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setMessangerFriends(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllFriendsByMessage();
  }, []);

  const onlyMyfriends =   messangerFriends?.filter(friend => {
      return friend._id !== store.userInfo.id
    })

  return (
    <div className="w-full">
      {onlyMyfriends &&
        onlyMyfriends.map((friend, i) => {
          return (
            <div key={i}>

               <Link  href={`${viewurl}/userdashboard/messanger/${friend.name}/${friend._id}`}>
               <div className="px-6 flex gap-2 items-center rounded-2xl py-2 border-b hover:bg-white duration-100">
                  <div className="">
                    <img className="w-16 rounded-full" src={friend.profile} alt={friend.name} />
                  </div>
                  <h2 className="mt-2 text-lg text-slate-700">
                    {friend.name}
                  </h2>
                </div>
               </Link>
            </div>
          );
        })}
    </div>
  );
};

export default MessageBox;
