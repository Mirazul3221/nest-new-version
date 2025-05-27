"use client";
import { useStore } from "@/app/global/DataProvider";
import React, { useState } from "react";
import { useEffect } from "react";
import { profileApi } from "../../components/common";
import ProfileCard from "../../components/ProfileCard";

const CommentProfile01 = ({ id,name, Handler=null, pfl=null}) => {
  const { store } = useStore();
  const [profile, setProfile] = useState(pfl);
  const fetChProfile = async () => {
    const res = await profileApi(store.token, id);
    setProfile(res);
  };

  useEffect(() => {
    fetChProfile();
  }, [name,pfl]);
  const randomCount = Math.floor(Math.random() * 360 + 1)
  return (
    <div>
      {profile !== "" ? (
         <div> <ProfileCard id={id} Handler={Handler}><img className="rounded-full w-6 cursor-pointer" src={profile} alt="profile image" /></ProfileCard></div>
      ) : (
        <div
          style={{ background: `hsl(${randomCount}, 65%, 40%)` }}
          className="w-6 h-6 text-white flex justify-center items-center uppercase text-lg rounded-full"
        >
          {name?.split("")[0]}
        </div>
      )}
    </div>
  );
};

export default CommentProfile01;
