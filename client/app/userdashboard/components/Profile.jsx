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
        <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border bottom-0 md:bottom-2 -right-0 md:-right-[1px] border-white">
          <div className="w-full h-full bg-green-500 border-[1px] md:border-[2px] border-white animate-pulse rounded-full"></div>
        </div>
      )}
      <div className="md:w-[70px] md:h-[70px] w-[50px] h-[50px]">
        <img
          className="md:w-[70px] md:h-[70px] w-[50px] h-[50px] rounded-full border-[3px]"
          src={profile}
          alt="profile-pic"
        />
      </div>
    </div>
  );
};

export default Profile;
