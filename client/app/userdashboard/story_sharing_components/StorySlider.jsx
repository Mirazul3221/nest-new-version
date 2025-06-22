"use client";
import { useState } from "react";
import StoryModal from "./StoryModel";
import { TbPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/global/DataProvider";

export default function StorySlider({ users }) {
  const { store, dispatch } = useStore();
  const router = useRouter();
  const switchToStory = () => {
    router.push("/userdashboard/memory-create");
  };
  const [activeUserIndex, setActiveUserIndex] = useState(null);
  const [startingStoryIndex, setStartingStoryIndex] = useState(0); // ✅ NEW

  const handleStoryClick = (index) => {
    setActiveUserIndex(index);
    setStartingStoryIndex(0); // Always start from first story on click
  };

  const handleNextUser = () => {
    if (activeUserIndex < users.length - 1) {
      setActiveUserIndex((prev) => prev + 1);
      setStartingStoryIndex(0); // ✅ Start from first story for next user
    } else {
      setActiveUserIndex(null);
    }
  };

  const handlePrevUser = () => {
    if (activeUserIndex > 0) {
      const prevUserIndex = activeUserIndex - 1;
      const lastStoryIndex = users[prevUserIndex]?.stories.length - 1 || 0;
      setActiveUserIndex(prevUserIndex);
      setStartingStoryIndex(lastStoryIndex); // ✅ Start from LAST story of previous user
    }
  };
  users?.map((s) => {
    console.log(s);
  });
  return (
    <div className="w-[98vw] mx-auto md:w-full overflow-x-auto">
      <div className="flex flex-nowrap min-w-max bg-gray-100 gap-4 md:gap-2 mb-2">
        <div
          onClick={switchToStory}
          className="bg-white w-24 md:w-28 h-[25vh] md:h-[30vh] group relative border rounded-2xl overflow-hidden text-center cursor-pointer"
        >
          <img
            className="scale-100 w-full h-2/3 group-hover:scale-105 duration-500 object-cover object-center"
            src={store?.userInfo?.profile}
            alt={store?.userInfo?.name}
          />
          <div className="relative">
            <div className="absolute -top-4 left-[50%]">
              <TbPlus
                size={30}
                color="white"
                className="bg-[#8b36d6] border-2 border-white -translate-x-[50%] rounded-full"
              />
            </div>
          </div>
          <p className="mt-5 text-[12px] md:text-sm font-semibold">
            Capture a memory
          </p>
        </div>
        {users?.map((story, i) => {
          if (story.stories[0].memoryType == "image") {
            return (
              <div
                key={story.user._id}
                className="flex-shrink-0 h-[25vh] md:h-[30vh] w-24 md:w-28 group relative rounded-2xl overflow-hidden text-center cursor-pointer"
                onClick={() => handleStoryClick(i)}
              >
                <img
                  className="h-full scale-105 duration-500 rounded-2xl border shadow-md object-cover object-center"
                  src={`${story.stories[0].story}`}
                  alt=""
                />
                <img
                  src={story?.user?.profile}
                  alt={story?.user?.name}
                  className="w-10 h-10 absolute top-1 right-1 rounded-full border-2 border-white"
                />
                <div className="w-full h-1/2 absolute bottom-0 bg-black/40 blur-lg duration-300 hover:blur-0 hover:bg-transparent"></div>
                <p className="text-sm mt-1 absolute bottom-2 left-1 text-center text-white">
                  {story.user.name}
                </p>
              </div>
            );
          } else if (story.stories[0].memoryType == "text") {
            return (
              <div
                key={story.user._id}
                className="flex-shrink-0 h-[25vh] md:h-[30vh] w-24 md:w-28 group relative rounded-2xl overflow-hidden text-center cursor-pointer"
                onClick={() => handleStoryClick(i)}
              >
                                  <img
                      className="w-full h-full"
                      src={`/story-bg/${story.stories[0].story}.jpg`}
                      alt="story_image"
                    />

                    <div className="absolute top-0 left-0 flex items-center w-full h-full z-10">
                      <div className="w-full h-[80%] flex justify-center items-center overflow-y-auto">
                        <div style={{ color: story.stories[0].style.colorCode, fontSize:  story.stories[0].style.fontSize + "px" }} className="max-h-full w-full px-4 text-center break-words">
                          {story.stories[0].defaultText.slice(0,50)}
                        </div>
                      </div>
                    </div>
              </div>
            );
          }
        })}
      </div>

      {activeUserIndex !== null && (
        <StoryModal
          key={`${activeUserIndex}-${startingStoryIndex}`} // ✅ ensure re-render on user change
          activeUserIndex={activeUserIndex}
          user={users[activeUserIndex]}
          startingIndex={startingStoryIndex} // ✅ NEW PROP
          onClose={() => setActiveUserIndex(null)}
          onNextUser={handleNextUser}
          onPrevUser={handlePrevUser}
        />
      )}
    </div>
  );
}
