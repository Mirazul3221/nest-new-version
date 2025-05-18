import { baseurl, viewurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import AddAndDeleteFriendRequestButton from "./messanger/components/AddAndDeleteFriendRequestButton";
import "./cssfiles/scrolling_bar.css";
import Link from "next/link";
import { commonLogout } from "./common";

const NearbyUserProfileCard = () => {
  const { store ,dispatch} = useStore();
  const [loading, setLoading] = useState(false);
  const [nearby, setNearby] = useState(null);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const nearbyUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseurl}/auth/user/nearby`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setLoading(false);
        console.log(data);
        setNearby(data);
      } catch (error) {
        console.log(error);
        commonLogout(dispatch)
      }
    };
    nearbyUsers();
  }, []);

  // 🖱 Handle Drag Scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto w-[90vw] mx-auto md:w-full items-center hidden_scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex gap-2 min-w-max">
        {" "}
        {/* Ensure children do not wrap */}
        {nearby?.map((u) => (
          <div
            key={u?._id}
            className="flex gap-10 items-center border rounded-xl bg-white py-1 px-3 shrink-0"
          >
            <div className="profile flex gap-2 items-center">
            <Link href={`${viewurl}/userdashboard/searchusers/${u?._id}`}>
            <img
                className="w-12 rounded-full"
                src={u?.profile}
                alt={u?.name}
              />
                </Link>
              <div className="details">
                <Link href={`${viewurl}/userdashboard/searchusers/${u?._id}`}>
                  <h2 className="font-semibold text-gray-700 mt-2">
                    {u?.name}
                  </h2>
                </Link>
                <h3 className="text-sm">{u?.status}</h3>
              </div>
            </div>
            <AddAndDeleteFriendRequestButton id={u?._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyUserProfileCard;
