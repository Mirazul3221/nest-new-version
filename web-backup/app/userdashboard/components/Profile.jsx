import { MYONLINEFRIEND } from "@/app/global/ProtectRoute";
import React from "react";
import { useSocket } from "../global/SocketProvider";
const Profile = ({ profile, myId }) => {
  const { myActiveFriends } = useSocket();
  const isOnline = myActiveFriends && myActiveFriends?.some((O) => O === myId);
  return (
    <div className="relative">
      <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-green-500 blur-sm rounded-full border bottom-0 md:bottom-2 -right-0 md:-right-[1px] border-white">
      </div>
      {isOnline && (
        <div className="absolute w-3 h-3 bg-white rounded-full border bottom-0 md:bottom-2 -right-0 md:-right-[2px] border-white">
          <div className="w-full h-full bg-green-500 border-[1px] border-white animate-pulse rounded-full"></div>
        </div>
      )}
      <div className="w-[50px] h-[50px]">
        <img
          className="w-[50px] h-[50px] rounded-full border-[2px]"
          src={profile}
          alt="profile-pic"
        />
      </div>
    </div>
  );
};

export default Profile;
