import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { useSocket } from "../../global/SocketProvider";
import { useStore } from "@/app/global/DataProvider";
import { commonLogout } from "../../components/common";

const ProfileCard = ({ id }) => {
  const { dispatch, store } = useStore();
  const { socket } = useSocket();
  const [loader, setLoader] = useState(false);
  const [sendFriend, setSendFriend] = useState(false);
  const [friendLoding, setFriendLoading] = useState(false);
  const [user, setUser] = useState();
  const [requestedFriendId, setRequestedFriendId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${baseurl}/auth/publicuser/findbyid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setLoader(false);
        setUser(data);

        /////////////////////////////////////////////////////////////////////////////
        setFriendLoading(true);
        const requesID = await axios.get(
          `${baseurl}/friend-request/get-your-friend-send-req-by-me/pending`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setFriendLoading(false);
        setRequestedFriendId(requesID.data);
        setSendFriend(requesID.data.some((id) => id === data._id));
      } catch (error) {
        console.log(error);
        commonLogout(dispatch,error)
      }
    }
    fetchData();
  }, []);
  ////////////////////////friend request api////////////////////////
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
  ////////////////////////////////////////////////////////////////////
  const friendRequestApi = async (recipient) => {
    try {
      //   setLoader(true);
      setFriendLoading(true);
      const { data } = await axios.post(
        `${baseurl}/friend-request`,
        { recipient },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setSendFriend(true);
      setFriendLoading(false);
      handleNotification(recipient);
    } catch (error) {
      commonLogout(dispatch,error)
      // toast.error(error.response.data.message);
    }
  };

  //   <div>
  //   <Messanger
  //     id={item._id}
  //     name={item.name}
  //     profile={item.profile}
  //     title={item.title}
  //     status={item.status}
  //     desc={item.description}
  //     switcher={openMessangerBox1}
  //     setSwitcher={setOpenMessangerBox1}
  //   />
  // </div>
  const [myFriend, setMyFriend] = useState();
  const allFriendId = async () => {
    try {
      setLoader(true);
    const { data } = await axios.get(
      `${baseurl}/friend-request/get-friend/acceptedFriendId`,
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    setLoader(false);
    const friendExist = data?.some((f) => f === id);
    setMyFriend(friendExist);
    } catch (error) {
          commonLogout(dispatch,error)
    }
  };
  useEffect(() => {
    allFriendId();
  }, []);

  //==================================================================
  const cancleFriendRequest = async (id) => {
    setSendFriend(false);
    setFriendLoading(false);
    try {
      await axios.post(
        `${baseurl}/friend-request/cancel`,
        { ID: id },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );
    } catch (error) {
      commonLogout(dispatch,error)
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-2xl border py-4 px-2">
      {loader ? (
        "Loading..."
      ) : (
        <div className="md:max-w-[400px] p-5">
          <div className="flex justify-center items-center gap-2">
            <img className="w-[100px]" src={user?.profile} alt={user?.name} />
            <div className="">
              <h2 className="text-2xl font-semibold">
                {user?.name?.split(" ")[0]}
              </h2>
              <h2 className="">{user?.title}</h2>
              <h2 className="">{user?.description?.slice(0, 60)}...</h2>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-3 items-center">
            {myFriend === undefined ? (
              "Loading..."
            ) : myFriend === true ? (
              <div className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">
                Message
              </div>
            ) : (
              <div>
                {/* <div onClick={()=>cancleFriendRequest(user._id)} className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white" >Cancel </div> */}
                {sendFriend ? (
                  <div
                    onClick={() => cancleFriendRequest(user._id)}
                    className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white"
                  >
                    Cancel
                  </div>
                ) : (
                  <div
                    onClick={() => friendRequestApi(user._id)}
                    className="py-2 flex items-center gap-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white"
                  >
                    {" "}
                    {friendLoding ? (
                      "Loading..."
                    ) : (
                      <div className="flex items-center gap-2">
                        <IoPersonAdd size={16} /> Add friend
                      </div>
                    )}{" "}
                  </div>
                )}
              </div>
            )}

            <a
              href={`${viewurl}/userdashboard/searchusers/${id}`}
              className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white"
            >
              View details
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
