import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";

const FriendRequest = ({item}) => {
    const [closeContainer,setCloseContainer] = useState(false)
    const { store  } = useContext(storeContext);
    const handleAcceptRequest = async (item) => {
        try {
          await axios.get(`${baseurl}/friend-request/${item.message[0].requesterId}/respond`, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
         handleNotification(item);
         setCloseContainer(true)
        } catch (error) {
          console.log(error);
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
    } catch (error) {}
  };
  ///////////////////////////////////////////////Cancel friend request//////////////////////////////////////////
  const cancleFriendRequest = async (item) => {
       try {
        await axios.post(
            `${baseurl}/friend-request/cancel`,
            { ID: item.message[0].requesterId },
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
          <div className="flex gap-4 mt-2">
            <div onClick={()=>cancleFriendRequest(item)} className="px-6 py-[5px] bg-gray-200 text-gray-700 w-fit rounded-md">
              <h2>Delete</h2>
            </div>
            <div onClick={()=>handleAcceptRequest(item)} className="px-6 py-[5px] bg-violet-700 text-white w-fit rounded-md">
              <h2>Confirm</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
