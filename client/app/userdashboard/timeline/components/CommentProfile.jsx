"use client";
import { useStore } from "@/app/global/DataProvider";
import React, { useState } from "react";
import { useEffect } from "react";
import { profileApi } from "../../components/common";

const CommentProfile = ({ id,name }) => {
  const { store } = useStore();
  const [profile, setProfile] = useState("");
  const fetChProfile = async () => {
    const res = await profileApi(store.token, id);
    setProfile(res);
  };

  useEffect(() => {
    fetChProfile();
  }, []);
  const randomCount = Math.floor(Math.random() * 360 + 1)
  return (
    <div>
      {profile !== "" ? (
        <img className="rounded-full w-6" src={profile} alt="profile image" />
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

export default CommentProfile;
