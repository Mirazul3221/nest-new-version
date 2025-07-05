import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { commonLogout } from "../components/common";
import AddAndDeleteFriendRequestButton from "../components/messanger/components/AddAndDeleteFriendRequestButton";
import { LiaTimesSolid } from "react-icons/lia";

const FriendProfileCard = ({user,questionsAfterDelete}) => {
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
          } catch (error) {
              console.log(error)
            commonLogout(dispatch, error);
          }
        };

const redirect = (id) => {
  window.location.href = `${viewurl}/userdashboard/searchusers/${id}`;
};
  return (
<div className="border md:w-[15vw] bg-white relative rounded-b-md shadow-sm">
  <div onClick={()=>{questionsAfterDelete(user)}} className="absolute w-fit top-1 cursor-pointer border right-1 text-gray-600 bg-white rounded-full p-[1px]"><LiaTimesSolid size={20} /></div>
  <img
    className="w-full h-40 mx-auto rounded-t-md object-cover"
    src={user.profile}
    alt={user.name}
  />
  <div className="p-2">
  <h2 onClick={()=>redirect(user._id)} className="mt-1 cursor-pointer text-gray-700 break-words text-lg font-semibold">{user.name.split(' ')[0]} {user.name.split(' ')[1]}</h2>
  {profiles.length > 0 && (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-3">
        {profiles.slice(0, 3).map((profile, idx) => (
          <img
            key={idx}
            className="w-5 h-5 rounded-full border-1 border-white"
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
<div className="mt-3">
  <AddAndDeleteFriendRequestButton  className='mt-1' id={user._id} reForm={questionsAfterDelete} user={user} />
</div>
  </div>
</div>
  );
};

export default FriendProfileCard;
