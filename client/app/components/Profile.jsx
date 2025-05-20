"use client";
import React, { useContext, useState } from "react";
import { ImCamera } from "react-icons/im";
import storeContext from "../global/createContex";
import axios from "axios";
import { baseurl } from "../config";
import { commonLogout } from "../userdashboard/components/common";
const Profile = ({ profile}) => {
  const [imageUrl, setImageUrl] = useState("");
  const { store,dispatch } = useContext(storeContext);
  const handleImg =async (e) => {
    if (e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const profileData = new FormData()
    profileData.append("old_profile",profile)
    profileData.append("new_profile", e.target.files[0])

try {
   await axios.patch(`${baseurl}/auth/updateProfile`,profileData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
} catch (error) {
  console.log(error)
  commonLogout(dispatch,error)
}
  }
  return (
    <div className="">
      <div className="flex flex-col items-center relative group">
        {imageUrl.length > 0 ? (
          <img
            className="md:w-[170px] md:h-[170px] w-[100px] h-[100px] border-4 rounded-full"
            src={imageUrl}
            alt="profile-image"
          />
        ) : (
          <>
            {profile?.length > 0 ? (
             <img className="md:w-[170px] md:h-[170px] w-[100px] h-[100px] rounded-full border-4 mx-auto" src={profile} alt="profile-picture" />
            ) : (
              <div
                role="status"
                class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div class="flex items-center justify-center w-40 h-40 bg-gray-300 rounded-full dark:bg-gray-700">
                  <svg
                    class="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
        <label
          htmlFor="imageUpload"
          className="absolute md:w-[170px] md:h-[170px] w-[100px] h-[100px] rounded-full bg-black/50 duration-100 cursor-pointer flex justify-center items-center scale-0 group-hover:scale-100"
        >
          <ImCamera color="white" size={50} />
        </label>
        {/* <img src={image} alt="image" /> : <img src={profile} alt="image" /> */}
        {/* <h2 className='text-[12px]'>{store.userInfo.name}</h2> */}
      </div>
      <input
        id="imageUpload"
        onChange={handleImg}
        className=" py-[5px] border-[1px] hidden w-52 px-2 rounded-md focus:border-sky-500 duration-300"
        type="file"
      />

      {/* <h2 onClick={updateUserProfile}>hgh</h2> */}
    </div>
  );
};

export default Profile;
