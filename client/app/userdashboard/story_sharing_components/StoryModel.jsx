'use client'
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function StoryModal({ user, onClose, onNextUser }) {
  const duration = 3000;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

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

  const story = user.stories[currentStoryIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
      <div className="absolute top-4 left-4 text-sm cursor-pointer" onClick={onClose}>✕ Close</div>
      
      <div className="w-full max-w-xl px-4 mt-8 space-x-1 flex">
        {user?.stories.map((_, i) => (
          <ProgressBar
            key={i}
            duration={duration}
            isActive={i === currentStoryIndex}
            onFinish={nextStory}
          />
        ))}
      </div>

      <div className="mt-10 text-center px-4 max-w-xl">
        {story?.image && (
          <img
            src={story.image}
            alt="story"
            className="max-h-[500px] mx-auto rounded"
          />
        )}
        {story?.text && <p className="mt-4 text-lg">{story.text}</p>}
      </div>
    </div>
  );
}