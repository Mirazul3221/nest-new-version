import React, { useEffect, useState } from "react";
import { useGlobalData } from "../../global/globalDataProvider.jsx";
import { TbPlus } from "react-icons/tb";
import { useStore } from "@/app/global/DataProvider.jsx";
import { commonLogout } from "../../components/common.js";
import axios from "axios";
import { baseurl } from "@/app/config.js";
import StorySlider from "../../story_sharing_components/StorySlider.jsx";
import { useRouter } from "next/navigation.js";

const DisplayMemoryCard = () => {
  const router = useRouter()
  const { appData, dispatch:dataDispatch } = useGlobalData();
  console.log(appData)
  const { store,dispatch } = useStore();
  useEffect(() => {
    fetchStory();
  }, []);
  const switchToStory = () => {
    router.push("/userdashboard/memory-create");
  };
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
       <StorySlider users={appData.userMemories}/>
    </div>
  );
};

export default DisplayMemoryCard;
