import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import { useSocket } from "@/app/userdashboard/global/SocketProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsPersonUp } from "react-icons/bs";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";
import { commonLogout } from "../../common";

const AddAndDeleteFriendRequestButton = ({ id }) => {
  const { store,dispatch } = useStore();
  const { socket } = useSocket();
  const [requestStatus, setRequestStatus] = useState();
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
    } catch (error) {commonLogout(dispatch)}
  };

  const checkFriendRequestStatus = async () => {
    try {
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
    } catch (error) {
      console.log(error);
      commonLogout(dispatch)
    }
  };

  useEffect(() => {
    checkFriendRequestStatus();
  }, []);
  const addAndDeleteFriendRequest = async () => {
    setLoading(true);
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
    } catch (error) {
      setLoading(false);
      commonLogout(dispatch)
    }
  };
  return (
    <div>
      <button onClick={addAndDeleteFriendRequest} className={`${(requestStatus == "accepted") ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer rounded-md w-fit px-4 flex gap-[3px] items-center`}>
        {loading && "Loading..."}
         
        {!loading && (
          <>
            {requestStatus == "pending"
              ? <span className="flex gap-1 items-center"><BsPersonUp />  Connecting</span>
              : requestStatus == "accepted"
              ? <span className="flex gap-1 items-center"><IoPersonRemoveOutline />  Disconnect</span>
              : <span className="flex gap-1 items-center"><IoPersonAddOutline /> Connect</span>}
          </>
        )}
      </button>
    </div>
  );
};

export default AddAndDeleteFriendRequestButton;
