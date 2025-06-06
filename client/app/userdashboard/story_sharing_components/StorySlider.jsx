"use client";
import { useState } from "react";
import StoryModal from "./StoryModel";

export default function StorySlider({ users }) {
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
        <div className="flex-shrink-0 bg-white w-28 h-[25vh] group relative rounded-2xl overflow-hidden text-center cursor-pointer">
          <img
            className="scale-100 w-full h-1/2 top-0 left-0 absolute group-hover:scale-105 duration-500 object-cover object-center"
            src="https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg"
            alt=""
          />
        </div>
        {users.map((user, i) => (
          <div
            key={user.id}
            className="flex-shrink-0 group relative rounded-2xl overflow-hidden text-center cursor-pointer"
            onClick={() => handleStoryClick(i)}
          >
            <img
              className="h-[25vh] w-28 scale-100 group-hover:scale-105 duration-500 rounded-2xl border shadow-md object-cover object-center"
              src={`${user.stories[0].image}`}
              alt=""
            />

            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 absolute top-1 right-1 rounded-full border-2 border-white"
            />
            <div className="w-full h-1/2 absolute bottom-0 bg-black/40 blur-lg duration-300 hover:blur-0 hover:bg-transparent"></div>
            <p className="text-sm mt-1 absolute bottom-2 left-1 text-center text-white">
              {user.name}
            </p>
          </div>
        ))}
      </div>

      {activeUserIndex !== null && (
        <StoryModal
          key={users[activeUserIndex]?.id} // <-- Add this line
          user={users[activeUserIndex]}
          onClose={() => setActiveUserIndex(null)}
          onNextUser={handleNextUser}
        />
      )}
    </div>
  );
}
