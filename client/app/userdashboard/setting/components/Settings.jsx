import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiWorld } from "react-icons/bi";
import { BsAndroid2 } from "react-icons/bs";
import { FaApple, FaChrome, FaEdge } from "react-icons/fa";
import { FaLocationDot, FaMobileScreen } from "react-icons/fa6";
import { GrFirefox } from "react-icons/gr";
import { IoGitNetworkSharp, IoLogoWindows } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import FabricExample from "./Test";

const Settings = () => {
  const { store, dispatch } = useStore();
  const [settingData, setSettingData] = useState(null);
  const fetchSettingData = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/login-status/all`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setSettingData(data);
      // Do something with `data` here (e.g., update state)
    } catch (error) {
      console.error("Error fetching data:", error);
      commonLogout(dispatch,error);
    }
  };

  useEffect(() => {
    fetchSettingData();
  }, []);
  const deleteSession = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/login-status/${id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      const filterData = settingData.filter((data) => data._id !== id);
      setSettingData(filterData);
      toast(data);
    } catch (error) {
      commonLogout(dispatch,error);
    }
  };

  console.log(store.userInfo.sessionId);
  return (
    <div className="w-full h-full">
      {settingData &&
        settingData?.reverse().map((item, i) => {
          return (
            <div key={i} className="bg-white border px-6 py-3 mb-2">
              <div className="md:flex gap-4 flex-wrap">
                <div className="flex gap-1 items-center">
                  {item.os == "Windows" ? (
                    <IoLogoWindows size={20} />
                  ) : item.os == "Android" ? (
                    <BsAndroid2 size={18} />
                  ) : item.os == "iOS" ? (
                    <FaApple size={18} />
                  ) : (
                    <FaMobileScreen size={18} />
                  )}
                  <h6>
                    <span className="font-bold">Os:</span>
                    {item.os}
                  </h6>
                </div>
                <div className="flex gap-1 items-center">
                  {item.browser == "Chrome" ||
                  item.browser == "Mobile Chrome" ? (
                    <FaChrome size={20} />
                  ) : item.browser == "Firefox" ||
                    item.browser == "Mobile Firefox" ? (
                    <GrFirefox size="18" />
                  ) : item.browser == "Edge" ? (
                    <FaEdge size={18} />
                  ) : (
                    <BiWorld size={18} />
                  )}
                  <h6>
                    <span className="font-bold">Browser:</span>
                    {item.browser}
                  </h6>
                </div>
                <div className="flex gap-1 items-center">
                  <FaLocationDot size={18} />
                  <h6>
                    <span className="font-bold">Location:</span>
                    {item.location}
                  </h6>
                </div>
                <div className="flex gap-1 items-center">
                  <IoGitNetworkSharp size={18} />
                  <h6>
                    <span className="font-bold">IP:</span>
                    {item.ipAddress}
                  </h6>
                </div>
              </div>
              <h6>
                <span className="font-bold">Agent:</span>
                {item.userAgent}
              </h6>
              <div className="flex items-center gap-1">
                {item.sessionId == store.userInfo.sessionId && (
                  <div
                    onClick={() => deleteSession(item._id)}
                    className="text-green-500 cursor-pointer py-1 px-2 mt-1 border border-green-500 w-fit rounded-md"
                  >
                    THIS DEVICE
                  </div>
                )}
                <div
                  onClick={() => deleteSession(item._id)}
                  className="text-rose-500 cursor-pointer py-1 px-2 mt-1 border border-rose-500 w-fit rounded-md"
                >
                  DELETE THIS SESSION
                </div>
              </div>
            </div>
          );
        })}

      {settingData && settingData.length == 0 && (
        <p className="text-center mt-5">Data Not Found!</p>
      )}
      <ToastContainer />
      <FabricExample/>
    </div>
  );
};

export default Settings;
