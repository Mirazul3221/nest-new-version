"use client";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useStore } from "@/app/global/DataProvider";
import { commonLogout } from "../components/common";
import { baseurl } from "@/app/config";
import axios from "axios";
import { VscEye } from "react-icons/vsc";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import {motion, AnimatePresence } from "framer-motion";

export default function StoryModal({activeUserIndex, user, startingIndex = 0, onClose,onPrevUser, onNextUser }) {
  const { store, dispatch } = useStore();
  const duration = 3000;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(startingIndex);
  const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
    setCurrentStoryIndex(startingIndex); // ✅ reset when user changes
  }, [user, startingIndex]);

  const prevStory = () => {
    if (currentStoryIndex !== 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      setCurrentStoryIndex(20)
      if (onPrevUser) {onPrevUser()};
    }
  };
  const nextStory = () => {
    if (currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0); // Optional reset
      if (onNextUser) onNextUser();
    }
  };
  
  if (!user) return null;

  const story = user.stories[currentStoryIndex].story;
  const id = user.stories[currentStoryIndex]._id;
  const counter = user.stories[currentStoryIndex].visitorCount;

  const visited = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/usermemory/add-visitor-id`,
        { storyId: id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  useEffect(() => {
    if (user?.user?._id == store.userInfo.id) return;
    visited();
  }, [currentStoryIndex]);
  console.log(currentStoryIndex)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
      <div
        className="absolute top-4 md:block hidden left-4 text-sm cursor-pointer"
        onClick={onClose}
      >
        ✕ Close
      </div>
      <div className="flex items-center gap-4 justify-center">
        {(currentStoryIndex == 0 && activeUserIndex == 0) && <div className="left text-gray-700 Arrey hidden md:block cursor-pointer"><IoIosArrowDropleft size={30} /></div>}
        {!(currentStoryIndex == 0 && activeUserIndex == 0) &&  <div onClick={()=>prevStory()} className="left Arrey hidden md:block cursor-pointer"><IoIosArrowDropleft size={30} /></div>}
        <div className="md:mt-10 mt-2 text-center relative overflow-hidden rounded-md bg-violet-400/10">
          <div className="absolute -top-1 p-3 left-0 w-full bg-gradient-to-b from-black to-transparent z-20">
            <div className="w-full my-2 max-w-xl space-x-1 flex">
              {user?.stories.map((_, i) => (
                <ProgressBar
                  key={i}
                  isPaused={isPaused} // ✅ pass pause state
                  duration={duration}
                  isActive={i === currentStoryIndex}
                  onFinish={nextStory}
                />
              ))}
            </div>
            {/* Your content here */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={user?.user?.profile}
                  alt={user?.user?.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className="text-white">{user.user.name}</p>
              </div>
              <div className="flex items-center gap-4 justify-end">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsPaused((prev) => !prev)}
                >
                  {isPaused ? "▶" : "⏸"}
                </div>
                <div className="cursor-pointer md:hidden" onClick={onClose}>
                  ✕
                </div>
              </div>
            </div>
          </div>

          {story && (
            <div className="md:h-[80vh] w-[300px] h-[100vh] -z-10 mx-auto rounded-md">
               {!(currentStoryIndex == 0 && activeUserIndex == 0) && <div onClick={()=>prevStory()} className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] left-2"><IoIosArrowDropleft size={30} /></div>}
               <div onClick={()=>nextStory?.()} className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] right-2"><IoIosArrowDropright size={30} /></div>
<AnimatePresence mode="wait">
  <motion.img
    key={story} // important for animation to trigger on story change
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full rounded-md"
    src={story}
    alt="story"
  />
</AnimatePresence>
            </div>
          )}
          {user?.user?._id == store.userInfo.id && counter !== 0 && (
            <div className="absolute flex items-center p-2 text-white bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent z-20">
              <VscEye size={20} />
              <span className="text-sm">Visitors : {counter} </span>
            </div>
          )}
        </div>
        <div onClick={()=>nextStory?.()} className="left hidden md:block Arrey cursor-pointer"><IoIosArrowDropright size={30} /></div>
      </div>
    </div>
  );
}
