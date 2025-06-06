'use client'
import { useState } from "react";
import ProgressBar from "../story_sharing_components/ProgressBar";
import StorySlider from "../story_sharing_components/StorySlider";

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://i.pravatar.cc/100?img=1",
    stories: [
      {
        text: "Alice's first story",
        image: "https://picsum.photos/500/300?random=1",
      },
      { text: "Second one", image: "https://picsum.photos/500/300?random=2" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://i.pravatar.cc/100?img=2",
    stories: [
      {
        text: "Hey, it's Bob!",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
    stories: [
      {
        text: "Sunset 😍",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "More nature",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "Peace ✌️",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Charlie",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
    stories: [
      {
        text: "Sunset 😍",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "More nature",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "Peace ✌️",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
    {
    id: 5,
    name: "Alice",
    avatar: "https://i.pravatar.cc/100?img=1",
    stories: [
      {
        text: "Alice's first story",
        image: "https://picsum.photos/500/300?random=1",
      },
      { text: "Second one", image: "https://picsum.photos/500/300?random=2" },
    ],
  },
    {
    id: 6,
    name: "Charlie",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
    stories: [
      {
        text: "Sunset 😍",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "More nature",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "Peace ✌️",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
    {
    id: 2,
    name: "Bob",
    avatar: "https://i.pravatar.cc/100?img=2",
    stories: [
      {
        text: "Hey, it's Bob!",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "Hey, it's Bob!",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
    {
    id: 3,
    name: "Charlie",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
    stories: [
      {
        text: "Sunset 😍",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "More nature",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
      {
        text: "Peace ✌️",
        image:
          "https://static.vecteezy.com/system/resources/previews/013/556/932/non_2x/confident-and-successful-good-looking-young-man-in-full-suit-holding-smart-phone-and-looking-at-camera-while-standing-against-white-background-photo.jpg",
      },
    ],
  },
];

export default function HomePage() {
  const [d, setD] = useState(false);
  return (
    <main className="min-h-screen bg-white">
      <h1 onClick={() => setD(true)} className="text-2xl font-bold p-4">
        User Stories
      </h1>
      <StorySlider users={dummyUsers} />
      {d && <ProgressBar duration={5000} isActive={true} onFinish={null} />}
    </main>
  );
}
