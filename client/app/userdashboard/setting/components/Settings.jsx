import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const { store } = useStore();
  const [settingData, setSettingData] = useState(null);
  const fetchSettingData = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/login-status/all`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setSettingData(data);
      console.log(data);
      // Do something with `data` here (e.g., update state)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSettingData();
  }, []);

  return (
    <div className="w-full h-full">
      {settingData &&
        settingData?.map((item, i) => {
          return (
            <div key={i} className="bg-white border px-6 py-3">
              <div className="md:flex gap-4 flex-wrap">
                <h6>
                  <span className="font-bold">Browser:</span>
                  {item.browser}
                </h6>
                <h6>
                  <span className="font-bold">Os:</span>
                  {item.os}
                </h6>
                <h6>
                  <span className="font-bold">Device:</span>
                  {item.device}
                </h6>
                <h6>
                  <span className="font-bold">Location:</span>
                  {item.location}
                </h6>
              </div>
              <h6>
                <span className="font-bold">Agent:</span>
                {item.userAgent}
              </h6>
              <div className="text-rose-500 cursor-pointer py-1 px-2 mt-1 border border-rose-500 w-fit rounded-md">DELETE THIS SESSION</div>
            </div>
          );
        })}
    </div>
  );
};

export default Settings;
