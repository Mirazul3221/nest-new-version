"use client";
import { useState } from "react";
import ProgressBar from "../story_sharing_components/ProgressBar";
import StorySlider from "../story_sharing_components/StorySlider";
import { useEffect } from "react";
import { commonLogout } from "../components/common";
import { useStore } from "@/app/global/DataProvider";
import { baseurl } from "@/app/config";
import axios from "axios";
export default function HomePage() {
  //usermemory/all-users-memory
  const {store,dispatch} = useStore()
  const [stories,setStories] = useState(null)
  useEffect(() => {fetchStory()}, []);
  
  const fetchStory = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/usermemory/all-users-memory`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setStories(data)
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold p-4">User Stories</h1>
      <StorySlider users={stories} />
    </main>
  );
}
