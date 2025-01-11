import React, { useContext, useState } from "react";
import QuestionAddForm from "./components/QuestionAddForm";
import Logo from "../components/Logo";
import storeContext from "../global/createContex";
import { FaPlus, FaUserPlus, FaUsers } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import QuestionEditForm from "./components/edit/QuestionEditForm";

const AssistantHome = () => {
  const { store } = useContext(storeContext);
  const [nav,setNave] = useState('home')
  return (
    <div>
      <div className="top flex justify-between items-center px-16 border-b-2 py-4">
        <div className="w-20">
          <Logo />
        </div>
        <span className="font-bold text-violet-800 text-lg">
          {store.userInfo.name}
        </span>
      </div>
      <div className="md:flex mt-2">
        <div className="py-8 border-r-2 h-screen w-48 hidden md:block">
          <p className="text-center">
          <ul>
        <li onClick={()=>setNave("home")} className={`flex cursor-pointer gap-2 items-center py-2 px-4  rounded-md font-medium text-gray-600`}><FaPlus/> Add Question</li>
        <li onClick={()=>setNave("questionList")}  className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-md font-medium text-gray-600`}><FaUserPlus/> Add User</li>
        <li className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-md font-medium text-gray-600`}><FaUsers/> User List</li>
        <li  className={`flex gap-2 cursor-pointer items-center py-2 px-4 rounded-md font-medium text-gray-600`}><RiLogoutCircleRLine/>Logout</li>
      </ul>
          </p>
        </div>
         {nav === 'home' && <QuestionAddForm /> }
         {nav === 'questionList' && <QuestionEditForm/> }
         {/* {nav === '' && <QuestionAddForm /> } */}
      </div>
    </div>
  );
};

export default AssistantHome;
