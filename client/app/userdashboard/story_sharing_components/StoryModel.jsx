"use client";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useStore } from "@/app/global/DataProvider";
import { commonLogout } from "../components/common";
import { baseurl } from "@/app/config";
import axios from "axios";
import { VscEye } from "react-icons/vsc";

export default function StoryModal({ user, onClose, onNextUser }) {
  const { store, dispatch } = useStore();
  const [count, setCount] = useState(0);
  const duration = 3000;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextStory = () => {
    if (currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0); // Optional reset
      if (onNextUser) onNextUser();
    }
  };

  useEffect(() => {
    setCurrentStoryIndex(0);
  }, [user]);

  if (!user) return null;

  const story = user.stories[currentStoryIndex].story;
  const id = user.stories[currentStoryIndex]._id;

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
  const CountVisitors = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/usermemory/count-visitors`,
        { storyId: id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setCount(data)
    } catch (error) {
      console.log(error)
      commonLogout(dispatch, error);
    }
  };
  useEffect(() => {
    if (user?.user?._id == store.userInfo.id) {CountVisitors()};
    if (user?.user?._id == store.userInfo.id) return;
    visited();
  }, [currentStoryIndex]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
      <div
        className="absolute top-4 left-4 text-sm cursor-pointer"
        onClick={onClose}
      >
        ✕ Close
      </div>
      <div className="mt-10 text-center relative overflow-hidden rounded-md">
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
            <div
              className="cursor-pointer"
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isPaused ? "▶" : "⏸"}
            </div>
          </div>
        </div>

        {story && (
          <div className="max-h-[500px] -z-10 mx-auto rounded-md">
            <img className="w-full h-full rounded-md" src={story} alt="story" />
          </div>
        )}
        {user?.user?._id == store.userInfo.id && count !== 0 && (
       <div className="absolute flex items-center p-2 text-white bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent z-20">
            <VscEye size={20} /><span className="text-sm">Visitors : {count}</span>
          </div>
        )}
      </div>
    </div>
  );
}
