"use client";
import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { TiDocumentText } from "react-icons/ti";
const RightSideBar = ({ me }) => {
  const { store, dispatch } = useStore();
  const [tags, setTags] = useState(null);
  const [tag, setTag] = useState(null);
  const route = useRouter();
  const logout = () => {
    dispatch({ type: "logout" });
    route.push("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseurl}/userquestions/get-tag/subject/chapter`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        );
        setTags(data);
        // Do something with `data` here (e.g., update state)
      } catch (error) {
        console.error("Error fetching data:", error);
        commonLogout(dispatch, error);
      }
    };

    fetchData();
  }, [store.token]);

  function goToQueryPage(val, type) {
    window.location.href = `/userdashboard/query?value=${val}&type=${type}`;
  }

  return (
    <div className="w-full h-full md:py-6 md:px-4 p-2">
      <div className="mx-auto border p-4 rounded-md text-center">
        <img
          className="w-28 rounded-full mx-auto border"
          src={me.profile}
          alt={me.name}
        />
        <h3 className="md:text-lg font-semibold">
          {me.name} ({me.status})
        </h3>
        <p>{me.email}</p>
      </div>

      <div className="mt-4">
        {/* Subject & Topic Filters */}
        <div className="max-h-[48vh] overflow-auto">
          <div className="px-4 py-2 bg-white border mt-2">
            <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
              <PiBookOpenTextDuotone /> Subject Based Query
            </p>
            {tags?.map((tag, i) => (
              <h3
                key={i}
                onClick={() => {
                  goToQueryPage(tag.subject, "subject");
                }}
                className="mt-2 space-y-1 hover:text-black duration-200 cursor-pointer"
              >
                {tag.subject}
              </h3>
            ))}
          </div>

          <div className="px-4 py-2 bg-white border mt-2">
            <p className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300">
              <TiDocumentText /> Topic Based Query
            </p>
            {tags?.map((tag, i) => (
              <div key={i}>
                <h3 className="mt-2 font-semibold">{tag.subject}</h3>
                {[...tag.chapter].reverse().map((chap, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      goToQueryPage(chap, "chapter");
                    }}
                    className="ml-2 space-y-1 hover:text-black duration-200 cursor-pointer"
                  >
                    {chap}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a
        href={`${viewurl}/userdashboard/setting`}
        className="flex gap-2 items-center hover:bg-gray-200/60 rounded-md duration-300 px-4 py-2"
      >
        <IoMdSettings /> Setting
      </a>
      <div
        onClick={logout}
        className="flex gap-2 mt-2 bg-rose-100 border cursor-pointer items-center hover:bg-rose-200/60 rounded-md duration-300 px-4 py-2"
      >
        <LuLogOut /> Log out
      </div>
    </div>
  );
};

export default RightSideBar;
