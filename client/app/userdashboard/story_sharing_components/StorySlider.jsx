"use client";
import { useState } from "react";
import StoryModal from "./StoryModel";

export default function StorySlider({ users}) {
  const [activeUserIndex, setActiveUserIndex] = useState(null);

  const handleStoryClick = (index) => {
    setActiveUserIndex(index);
  };

  const handleNextUser = () => {
    if (activeUserIndex < users.length - 1) {
      setActiveUserIndex((prev) => prev + 1);
    } else {
      setActiveUserIndex(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-100">
        {users?.map((story, i) => (
          <div
            key={story.user._id}
            className="flex-shrink-0 group relative rounded-2xl overflow-hidden text-center cursor-pointer"
            onClick={() => handleStoryClick(i)}
          >
            <img
              className="h-[25vh] w-28 scale-100 group-hover:scale-105 duration-500 rounded-2xl border shadow-md object-cover object-center"
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
        ))}
      </div>

      {activeUserIndex !== null && (
        <StoryModal
          key={users[activeUserIndex]?.stories[0].story} // <-- Add this line
          user={users[activeUserIndex]}
          onClose={() => setActiveUserIndex(null)}
          onNextUser={handleNextUser}
        />
      )}
    </div>
  );
}
