import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { commonLogout } from "../components/common";

const FriendProfileCard = ({user}) => {
    if(!user) return
      const { store, dispatch } = useStore();
        useEffect(() => {
          fetchStory();
        }, []);
        const [profiles, setProfiles] = useState([]);
        const fetchStory = async () => {
            if(user?.mutualFriendIds?.length == 0) return
          try {
          const { data } = await axios.post(`${baseurl}/auth/get-multiple-profile`,{ids:[user.mutualFriendIds[0],user.mutualFriendIds[1],user.mutualFriendIds[2]]}, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
   setProfiles(data)
      console.log(data)
          } catch (error) {
              console.log(error)
            commonLogout(dispatch, error);
          }
        };
  return (
<div className="border p-2 bg-white rounded-md shadow-sm w-48">
  <img
    className="w-28 h-28 mx-auto rounded-md object-cover"
    src={user.profile}
    alt={user.name}
  />
  <h2 className="mt-1 text-lg font-semibold">{user.name}</h2>

  {profiles.length > 0 && (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-3">
        {profiles.slice(0, 3).map((profile, idx) => (
          <img
            key={idx}
            className="w-8 h-8 rounded-full border-2 border-white"
            src={profile}
            alt={`Mutual friend ${idx + 1}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {user.mutualFriends} {user.mutualFriends > 1 ? "mutual friends" : "mutual friend"}
      </span>
    </div>
  )}
</div>
  );
};

export default FriendProfileCard;
