"use client";
import { useState } from "react";
import ProgressBar from "../story_sharing_components/ProgressBar";
import StorySlider from "../story_sharing_components/StorySlider";
import { useEffect } from "react";
import { commonLogout } from "../components/common";
import { useStore } from "@/app/global/DataProvider";
import { baseurl } from "@/app/config";
import axios from "axios";
import FriendProfileCard from "./FriendProfileCard";
export default function FrindSuggestedCard() {
  //usermemory/all-users-memory
  const { store, dispatch } = useStore();
  const [stories, setStories] = useState(null);
  useEffect(() => {
    fetchStory();
  }, []);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const fetchStory = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/suggested-friends`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      console.log(data);
      setSuggestedFriends(data);
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  return (
    <main className="w-full bg-gray-200">
        <div className="overflow-x-auto w-full mt-1">
          <div className="flex gap-2 mt-2 w-max">
            {suggestedFriends.map((user, i) => {
              return (
                   <FriendProfileCard key={i} user={user}/>
              );
            })}
          </div>
      </div>
    </main>
  );
}
