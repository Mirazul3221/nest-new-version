import React, { useEffect } from "react";
import { useGlobalData } from "../../global/globalDataProvider.jsx";
import { useStore } from "@/app/global/DataProvider.jsx";
import { commonLogout } from "../../components/common.js";
import axios from "axios";
import { baseurl } from "@/app/config.js";
import StorySlider from "../../story_sharing_components/StorySlider.jsx";

const DisplayMemoryCard = () => {
  const { appData, dispatch:dataDispatch } = useGlobalData();
  console.log(appData)
  const { store,dispatch } = useStore();
  useEffect(() => {
    fetchStory();
  }, []);
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
      dataDispatch({ type: "ADD_ALL_MEMORY",payload:data});
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  return (
    <div className="flex space-x-4 overflow-x-auto ml-2 md:ml-0">
       <StorySlider users={appData.userMemories}/>
    </div>
  );
};

export default DisplayMemoryCard;
