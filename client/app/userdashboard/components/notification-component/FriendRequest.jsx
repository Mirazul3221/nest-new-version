import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useSocket } from "../../global/SocketProvider";
import { commonLogout } from "../common";

const FriendRequest = ({item}) => {
    const [closeContainer,setCloseContainer] = useState(false)
    const { store, dispatch } = useContext(storeContext);
    const {socket} = useSocket()
    const handleAcceptRequest = async (item) => {
        try {
          await axios.get(`${baseurl}/friend-request/${item.message[0].requesterId}/respond`, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          socket && await socket.emit('new-notification',item.message[0].requesterId)
         handleNotification(item);
         setCloseContainer(true)
        } catch (error) {
          console.log(error);
          commonLogout(dispatch,error)
        }
      };

   //================================================
  //================================================
  const handleNotification = async (user) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: user.message[0].requesterId, type: "accept-request" },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );
      await axios.get(`${baseurl}/notification/delete-one/${user.message[0].requesterName}`, {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      });
    } catch (error) {commonLogout(dispatch,error)}
  };
  ///////////////////////////////////////////////Cancel friend request//////////////////////////////////////////
  const cancleFriendRequest = async (item) => {
       try {
        await axios.post(
            `${baseurl}/friend-request/cancel`,
            { id: item.message[0].requesterId },
            {
              headers: {
                Authorization: `Bearer ${store?.token}`,
              },
            }
          );
         ////////////////////////////////////////////////////////////////////////////////////////////////////
         await axios.get(`${baseurl}/notification/delete-one/${item.message[0].requesterName}`, {
            headers: {
              Authorization: `Bearer ${store?.token}`,
            },
          });
          setCloseContainer(true) 
       } catch (error) {
        console.log(error)
        commonLogout(dispatch,error)
       }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={`${closeContainer ? "hidden" : ""}`}>
      <p>{moment(item.createdAt).fromNow()}</p>
      <div className="flex gap-4 items-center">
        <img
          className="w-20 h-20 rounded-full border-2 border-gray-500"
          src={item.message[0].requesterProfie}
          alt={item.message[0].requesterName}
        />
        <div className="">
          <p>
            A new friend request from{" "}
            <span className="text-violet-700">
              {item.message[0].requesterName}
            </span>{" "}
          </p>
          <div className="flex gap-3 mt-2">
            <div onClick={()=>cancleFriendRequest(item)} className="px-4 cursor-pointer py-[3px] bg-gray-200 text-gray-700 w-fit rounded-md">
              <h2>Delete</h2>
            </div>
            <div onClick={()=>handleAcceptRequest(item)} className="px-4 cursor-pointer py-[3px] bg-[#3e19fa] text-white w-fit rounded-md">
              <h2>Confirm</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
