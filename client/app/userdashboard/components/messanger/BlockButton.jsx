import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { TbRuler3 } from "react-icons/tb";

const BlockButton = ({ blockedUserId, name,status }) => {
  const { store } = useStore();
  const [isBlocked, setIsBlocked] = useState(status);
  const [loading,setLoading] = useState(false);
  
  const blockunbloUser = async () => {
    try {
        setLoading(TbRuler3)
      await axios.post(`${baseurl}/auth/user/${isBlocked ?'unblock':'block'}/${blockedUserId}`,"", {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setIsBlocked(!isBlocked);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
console.log(isBlocked)
  return (
    <div>
      <button disabled={loading} onClick={blockunbloUser}>
        {
            loading ? "Loading..." : <span>{isBlocked ? "Unblock" : "Block"} {name.split(" ")[0]}</span>
        }
      </button>
    </div>
  );
};

export default BlockButton;
