"use state";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";

const SendLike = ({ emj, story }) => {
  const { store, dispatch } = useStore();
  const [putLike, setPutLike] = useState(false);
  const handlePutLike = async () => {
    new Audio("/like-justify-sound/pick-92276.mp3").play();
    setPutLike(true);
    setTimeout(() => {
      setPutLike(false);
    }, 1000);
console.log(story)
    try {
      const { data } = await axios.post(
        `${baseurl}/usermemory/add-visitor-action`,
        { storyId: story._id, reaction: emj },
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
  return (
    <div>
      <div
        onClick={handlePutLike}
        className={`
    ${putLike ? "likeButtonAnimation" : ""}
    text-2xl
    scale-100
    hover:scale-150
    hover:-mt-2
    transform
    transition-transform
    duration-300
    cursor-pointer
  `}
      >
        {emj}
      </div>
    </div>
  );
};

export default SendLike;
