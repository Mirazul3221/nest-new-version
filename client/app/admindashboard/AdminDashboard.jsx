"use client";
import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import AddUser from "./components/AddUser";
import AddQuestion from "./components/AddQuestion";
import UserList from "./components/UserList";

const AdminDashboard = () => {
  const [nav, setNav] = useState("addQuestion");
  return (
    <div className="bg-gray-100 pt-4">
      <TopBar />
      <div className="md:flex justify-between gap-4 px-10 mt-4">
        <SideBar nav={nav} setNav={setNav} />
        <div className="bg-white w-full px-8 py-6">
          {nav === "addQuestion" ? (
            <AddQuestion/>
          ) : nav === "addUser" ? (
            <AddUser />
          ) : nav === "userList" ? (
            <UserList/>
          ) : (
            <AddUser />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
