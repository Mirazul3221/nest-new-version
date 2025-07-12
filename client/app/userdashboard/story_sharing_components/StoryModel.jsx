"use client";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useStore } from "@/app/global/DataProvider";
import { commonLogout } from "../components/common";
import { baseurl } from "@/app/config";
import axios from "axios";
import { VscEye, VscSend } from "react-icons/vsc";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import SendLike from "./SendLike";
import { useSocket } from "../global/SocketProvider";

export default function StoryModal({
  activeUserIndex,
  user,
  startingIndex = 0,
  onClose,
  onPrevUser,
  onNextUser,
}) {
  const { store, dispatch } = useStore();
  const {socket} = useSocket();
  const duration = 5000;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(startingIndex);
  const [replyMessage, setReplyMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const LONG_PRESS_DURATION = 600; // ms
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const pauseRef = useRef(null);
  const handleLongPress = () => {
    setIsLongPress(true);
  };
  const startPressTimer = () => {
    timerRef.current = setTimeout(handleLongPress, LONG_PRESS_DURATION);
  };

  const clearPressTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    setCurrentStoryIndex(startingIndex); // ✅ reset when user changes
  }, [user, startingIndex]);

  const prevStory = () => {
    if (currentStoryIndex !== 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      setCurrentStoryIndex(20);
      if (onPrevUser) {
        onPrevUser();
      }
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
  const defText = user.stories[currentStoryIndex].defaultText;
  const style = user.stories[currentStoryIndex].style;
  const type = user.stories[currentStoryIndex].memoryType;

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

  const emojies = ["👍", "❤️", "😊", "😂", "😍", "😭", "😮", "😡"];

  const ifText = {
   receiverId:user?.user?._id, message:replyMessage,storyImage:story,storyText:defText,style,
  }

  const ifImg = {
   receiverId:user?.user?._id, message:replyMessage,storyImage:story
  }

  const finalMsg = type == 'text'? ifText : ifImg

  const handleSendMesage = async () => {
      try {
      const {data} = await axios.post(
        `${baseurl}/messanger/story-create`,finalMsg,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
        if (data == "User is blocked") {
        alert("You cannot send message to this user!");
      } else {
        socket &&
          socket.emit("message-to", {
            ...data,
            name: store.userInfo.name,
            profile: store.userInfo.profile,
          });
      }
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

  useEffect(() => {
    const handleInput = (e)=> {
      if(pauseRef.current == e.target) return
       if(inputRef.current && !inputRef.current.contains(e.target)){
            setIsPaused(false),setIsFocus(false) 
       }
    }
    window.addEventListener('click',handleInput);
    return () => {
      window.removeEventListener('click',handleInput);
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
      <div
        className="absolute top-4 md:block hidden left-4 text-sm cursor-pointer"
        onClick={onClose}
      >
        ✕ Close
      </div>
      <div className="flex items-center gap-4 justify-center">
        {currentStoryIndex == 0 && activeUserIndex == 0 && (
          <div className="left mt-10 text-gray-700 Arrey hidden md:block cursor-pointer">
            <IoIosArrowDropleft size={30} />
          </div>
        )}
        {!(currentStoryIndex == 0 && activeUserIndex == 0) && (
          <div
            onClick={() => prevStory()}
            className="left mt-10 Arrey hidden md:block cursor-pointer"
          >
            <IoIosArrowDropleft size={30} />
          </div>
        )}
        <div className="md:mt-10 mt-2 text-center relative overflow-hidden rounded-md bg-violet-400/10">
          <div className="absolute h-[20vh] -top-1 p-3 left-0 w-full bg-gradient-to-b from-black to-transparent z-20">
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
                <div ref={pauseRef}
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
            <div>
              {type == "image" ? (
                <div className="md:h-[80vh] md:w-[300px] max-w-full h-[100dvh] -z-10 mx-auto rounded-md">
                  {!(currentStoryIndex == 0 && activeUserIndex == 0) && (
                    <div
                      onClick={() => prevStory()}
                      className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] left-2"
                    >
                      <IoIosArrowDropleft size={30} />
                    </div>
                  )}
                  <div
                    onClick={() => nextStory?.()}
                    className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] right-2"
                  >
                    <IoIosArrowDropright size={30} />
                  </div>
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
              ) : type == "text" ? (
                <div className="md:h-[80vh] md:w-[300px] max-w-full h-[100dvh] mx-auto rounded-md relative">
                  {!(currentStoryIndex == 0 && activeUserIndex == 0) && (
                    <div
                      onClick={() => prevStory()}
                      className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] left-2 z-20"
                    >
                      <IoIosArrowDropleft size={30} />
                    </div>
                  )}
                  <div
                    onClick={() => nextStory?.()}
                    className="left Arrey md:hidden cursor-pointer bg-white rounded-full text-gray-700 absolute -translate-y-[50%] top-[50%] right-2 z-20"
                  >
                    <IoIosArrowDropright size={30} />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={story} // important for animation to trigger on story change
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full rounded-md"
                      src={`/story-bg/${story}.jpg`}
                      alt="story"
                    />
                  </AnimatePresence>
                  <div className="absolute top-0 left-0 flex items-center w-full h-full">
                    <div className="w-full h-[80%] flex justify-center items-center overflow-y-auto">
                      <div
                        style={{
                          color: style.colorCode,
                          fontSize: style.fontSize + "px",
                        }}
                        className="max-h-full w-full px-4 text-center break-words"
                      >
                        {defText}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {user?.user?._id == store.userInfo.id && counter !== 0 && (
            <div className="absolute flex items-center px-6 py-1 ring-1 ring-black rounded-full text-white bottom-16 bg-black/50 w-fit left-2 bg-gradient-to-t from-black/50 to-transparent z-20">
              <VscEye size={20} />
              <span className="text-sm">Visitors : {counter} </span>
            </div>
          )}
        </div>
        <div
          onClick={() => nextStory?.()}
          className="mt-10 hidden md:block Arrey cursor-pointer"
        >
          <IoIosArrowDropright size={30} />
        </div>
      </div>
      {user?.user?._id !== store.userInfo.id && (
        <div className="md:static absolute bottom-0 flex justify-center items-center gap-5 mt-3 w-full p-2 bg-black/50 md:bg-black/20 z-40">
          <div ref={inputRef} onClick={()=>{setIsPaused(true),setIsFocus(true)}} className="flex gap-1 items-center">
            <input
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`${
                isFocus ? "Reply to " + user?.user?.name : "Reply..."
              }`}
              type="text"
              className={`${
                isFocus ? "md:w-[40vw] w-[90vw]" : "md:w-[20vw] w-[80vw]"
              } ${
                isLongPress ? "hidden" : ""
              } focus:outline-none transition-all duration-500 ease-in-out px-6 py-1 md:text-white rounded-full bg-transparent border-2 border-gray-400`}
            />
            {replyMessage && (
              <div onClick={handleSendMesage}>
                <VscSend size={20} />
              </div>
            )}
          </div>
          {!isPaused && !replyMessage && (
            <button
              className={`md:hidden ${isLongPress ? "hidden" : ""}`}
              onMouseDown={startPressTimer}
              onMouseUp={clearPressTimer}
              onMouseLeave={clearPressTimer}
              onTouchStart={startPressTimer}
              onTouchEnd={clearPressTimer}
            >
              <SendLike emj={"👍"} story={user.stories[currentStoryIndex]} />
            </button>
          )}
          <div
            className={`${isLongPress ? "flex items-center gap-1" : "hidden"}`}
          >
            {emojies.map((em, i) => (
              <SendLike
                key={i}
                emj={em}
                story={user.stories[currentStoryIndex]}
                setIsLongPress={setIsLongPress}
              />
            ))}
            <button
              onClick={() => setIsLongPress(false)}
              className="ml-3 text-2xl"
            >
              ✕
            </button>
          </div>
          <div
            className={`${
              isFocus ? "absolute translate-y-[10000px]" : "block duration-500"
            } hidden md:flex items-center gap-1`}
          >
            {emojies.map((em, i) => (
              <SendLike
                key={i}
                emj={em}
                story={user.stories[currentStoryIndex]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
