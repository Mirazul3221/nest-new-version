"use client"
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import { commonLogout } from "@/app/userdashboard/components/common";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserList = () => {
  const { store,dispatch} = useContext(storeContext);
  const [generalusrs, setGeneralusrs] = useState();
  const [registeredUsers, setRegisteredUsers] = useState();
  const [switcher, setSwitcher] = useState("assistant");
  // console.log(store.token)
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/auth/registered-user`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        const generalusrs = data?.filter((user) => {
          return user.role == "user";
        });
        const registeredUsers = data?.filter((user) => {
          return user.role == "assistant";
        });
        setGeneralusrs(generalusrs);
        setRegisteredUsers(registeredUsers);
      } catch (error) {
        commonLogout(dispatch)
        console.log(error);
      }
    }
    fetchData();
  }, [generalusrs, registeredUsers,store.token]);
  return (
    <div>
      <div className="flex gap-2 items-center mt-4">
        <h2
          onClick={() => setSwitcher("others")}
          className="py-2 px-6 bg-green-500 text-white cursor-pointer">
          Assistant user
        </h2>
        <h2
          onClick={() => setSwitcher("user")}
          className="py-2 px-6 bg-rose-500 text-white cursor-pointer">
          General user
        </h2>
      </div>

      <div className="mt-4">
        {switcher == "user" ? <GeneralUser users={generalusrs} /> : <AssistantUsers users={registeredUsers} />}
      </div>
    </div>
  );
};

export default UserList;

const GeneralUser = ({ users }) => {
  return (
    <div>
      {users?.map((user,index) => {
        return (
            <div key={index} className="flex gap-2 py-2 bg-gray-100 mt-2 px-4">
            <h2 className="border-r-4 pr-4 text-rose-500 border-white">{user.name}</h2>
            <h2 className="text-sm">{user.email}</h2>
          </div>
        );
      })}
    </div>
  );
};

const AssistantUsers = ({ users }) => {
    return (
        <div>
          {users?.map((user,i) => {
        return (
            <div key={i} className="flex gap-2 py-2 bg-gray-100 text-amber-500 mt-2 px-4">
            <h2 className="border-r-4 pr-4 text-green-500 border-white">{user.name}</h2>
            <h2 className="text-sm"> {user.email}</h2>
          </div>
        );
          })}
        </div>
      );
}
