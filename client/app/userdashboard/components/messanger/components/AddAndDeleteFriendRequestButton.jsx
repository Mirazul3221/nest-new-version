import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import { useSocket } from "@/app/userdashboard/global/SocketProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsPersonUp } from "react-icons/bs";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";
import { commonLogout } from "../../common";
import { LuUserRoundCheck } from "react-icons/lu";

const AddAndDeleteFriendRequestButton = ({ id , px ='px-4', py='py-0',user=null, reForm=null }) => {
  const { store,dispatch } = useStore();
  const { socket } = useSocket();
  const [requestStatus, setRequestStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  ////////////////notification api////////////////////////
  const handleNotification = async (recipient) => {
    try {
      const { data } = await axios.post(
        `${baseurl}/notification/create`,
        { readerId: recipient, type: "friend-request" },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      socket && (await socket.emit("new-notification", recipient));
    } catch (error) {commonLogout(dispatch,error)}
  };

  const checkFriendRequestStatus = async () => {
    try {
      //  setLoading(true);
      const { data } = await axios.post(
        `${baseurl}/friend-request/status`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );
      setRequestStatus(data);
      //  setLoading(false);
    } catch (error) {
      console.log(error);
      //  setLoading(false);
      commonLogout(dispatch,error)
    }
  };

  useEffect(() => {
    checkFriendRequestStatus();
  }, []);
  const addAndDeleteFriendRequest = async () => {
    setLoading(true);
    if(requestStatus == 'empty') new Audio("/notification-soun/request-a-friend.mp3").play();
    try {
      await axios.post(
        `${baseurl}/friend-request/${
          requestStatus == "pending"
            ? "cancel"
            : requestStatus == "accepted"
            ? "cancel"
            : "add"
        }`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );

      requestStatus == "empty" && handleNotification(id);
      requestStatus == "pending"
        ? setRequestStatus("empty")
        : requestStatus == "accepted"
        ? setRequestStatus("empty")
        : setRequestStatus("pending");
      setLoading(false);
      if(reForm) reForm(user)
    } catch (error) {
      setLoading(false);
      commonLogout(dispatch,error)
    }
  };
  return (
    <div>
      <button onClick={addAndDeleteFriendRequest} className={`${(requestStatus == "accepted") ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer text-center rounded-md w-full px-3 ${px} ${py} flex gap-[3px] justify-center items-center`}>
        {loading && "Loading..."}
         
        {!loading && (
          <>
            {requestStatus == "pending"
              ? <span className="flex gap-1 items-center"><BsPersonUp />  Connecting</span>
              : requestStatus == "accepted"
              ? <span title="Click to make unfriend" className="flex gap-1 items-center"><LuUserRoundCheck />  Friend</span>
              : <span className="flex gap-1 items-center"><IoPersonAddOutline /> Connect</span>}
          </>
        )}
      </button>
    </div>
  );
};

export default AddAndDeleteFriendRequestButton;
