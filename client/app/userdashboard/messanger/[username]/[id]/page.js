"use client";
import SuperHeader from "@/app/userdashboard/components/SuperHeader";
import React, { useRef, useState } from "react";
import MessageBox from "../../components/MessageContainerLeft";
import { useParams } from "next/navigation";
import Middle from "../../components/MessageContainerMiddle";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "@/app/config";
import EntryPoint from "@/app/userdashboard/components/messanger/video-audio-callcenter/EntryPoint";
import { useContext } from "react";
import storeContext from "@/app/global/createContex";
import "@/app/userdashboard/components/cssfiles/scrolling_bar.css";
const Page = () => {
  const { store } = useContext(storeContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [message, setMessage] = useState("");
  const messangerRef = useRef(null);
  const path = useParams();
  const [id, setId] = useState(path.id);
  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-profile/${id}`);
      setUserProfile(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    // messangerRef.current.addEventListener("keyUp",()=>alert("helo"))
    if (messangerRef.current) {
      messangerRef.current.style.height = "auto";
      messangerRef.current.style.height = `${messangerRef.current.scrollHeight}px`;
    }
  }, [message]);
  return (
    <div className=" w-screen h-screen fixed top-0 left-0">
      <div className="border-b bg-white px-8 py-2">
        <SuperHeader />
      </div>
      <div className="messanger-container px-8 flex gap-2 justify-between mt-4">
        <div className="left w-3/12 bg-white">
          <div className="head pl-4 pt-4 flex gap-2 items-center">
            <div>
              <h2 className="w-full">All message</h2>
            </div>
            <input
              className="border px-2 outline-none rounded-md"
              type="text"
              placeholder="Search user"
            />
          </div>
          <div>
            <MessageBox setId={setId} setUserDetails={setUserDetails} />
          </div>
        </div>
        <div className="middle w-6/12 border rounded-2xl overflow-y-scroll  hidden_scroll h-[81vh]">
          <div className="top-bar px-4 rounded-t-2xl py-2 bg-violet-500 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full w-12"
                src={userProfile?.profile}
                alt={userProfile?.name}
              />
              <div className="text-white">
                <h2>{userProfile?.name}</h2>
                <p className="text-[12px]">{userProfile?.status}</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-white">
              <EntryPoint
                user={{
                  myId: store.userInfo.id,
                  fdId: userProfile?._id,
                  name: userProfile?.name,
                  profile: userProfile?.profile,
                  title: userProfile?.title,
                  type: "Audio",
                  size: 35,
                }}
              />
              <EntryPoint
                user={{
                  myId: store.userInfo.id,
                  fdId: userProfile?._id,
                  name: userProfile?.name,
                  profile: userProfile?.profile,
                  title: userProfile?.title,
                  type: "Video",
                  size: 35,
                }}
              />
            </div>
          </div>
          <div>
            <div className=" bg-white border-gray-300">
              <Middle id={id} userDetails={userProfile} />
            </div>
            <div className={"bottom"}>
               <div className="p-4 flex justify-between items-center gap-2">
               <textarea
                  ref={messangerRef}
                  value={message}
                  onMouseUp={() => setLeftHide(true)}
                  onChange={(e) => handleMessage(e)}
                  rows={1}
                  style={{
                    width: "100%",
                    resize: "none",
                    overflow: "hidden",
                    padding: "6px 14px",
                    boxSizing: "border-box",
                    outline: "none",
                    border: "none",
                    borderRadius: "20px",
                    background: "#ededed",
                  }}
                />

                <div>
                  dgdsgs
                </div>
               </div>
              </div>
          </div>
        </div>
        <div className="write w-3/12 bg-white">
        <div className="overflow-y-auto h-20">
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
          gsdrrrrrrrrrrr dtttttttttttttt jttttttttttttt jtttttttttttttttttttt
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default Page;
