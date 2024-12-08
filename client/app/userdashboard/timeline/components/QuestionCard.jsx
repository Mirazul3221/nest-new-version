"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import React, { memo, useCallback, useContext, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2, RxOpenInNewWindow } from "react-icons/rx";
import CommentBox from "./CommentBox";
import { RiFileEditLine } from "react-icons/ri";
import { RiDeleteBin7Line } from "react-icons/ri";
import EditQuestion from "../create-post/components/EditQuestion";
import ProfileCard from "./ProfileCard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const QuestionCard = ({ questionsAfterDelete, myQuestion }) => {
  const { store } = useContext(storeContext);
  const [allQuestions, setAllQuestions] = useState();
  const [edit, setEdit] = useState(false);
  const [deleteQ, setDelete] = useState(false);
  const [profileContainer, setProfileContainer] = useState(false);
  const dateFormate = (createdAt) => {
    const currentYear = moment().year();
    const postYear = moment(createdAt).year();
    const format =
      currentYear === postYear ? "D MMM h:mm A" : "D MMMM h:mm A YYYY";
    const formattedDate = moment(createdAt).format(format);
    return formattedDate;
  };

  const checkAns = useCallback((e, ans, question) => {
    /////////////////////////////////////////////////////////////////////////////////////////
    // const mainTerget = questionsData[index].rightAns;
    const getAtter =
      e.target.parentElement.parentElement.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAtter);
    setTimeout(() => {
      e.target.parentElement.parentElement.setAttribute(
        "data-select",
        getAtter + 1
      );
    }, 100);

    const tergetContainer = e.target.parentElement.parentElement.children;
    const tergetContainers = [
      tergetContainer[0],
      tergetContainer[1],
      tergetContainer[2],
      tergetContainer[3],
    ];
    if (e.target.classList.contains("__target_option__")) {
      if (getAtterIntoNumber == question.rightAns) {
        if (ans === question.rightAns) {
          e.target.parentElement.classList.add("bg-green-100");
          e.target.parentElement.classList.add("border-green-500");
          e.target.parentElement.children[1].children[1].classList.remove(
            "hidden"
          );
        } else {
          const tergetDescBox =
            e.target.parentElement.parentElement.parentElement.parentElement
              .children[2];
          e.target.parentElement.classList.add("bg-rose-100");
          e.target.parentElement.classList.add("border-rose-500");
          e.target.parentElement.children[1].children[0].classList.remove(
            "hidden"
          );
          tergetContainers[question.rightAns - 1].classList.add("bg-green-100");
          tergetContainers[question.rightAns - 1].classList.add(
            "border-green-500"
          );
          tergetContainers[
            question.rightAns - 1
          ].children[1].children[1].classList.remove("hidden");
          tergetDescBox?.classList.remove("hidden");
          setTimeout(() => {
            tergetDescBox?.classList.remove("scale-0");
            tergetDescBox?.classList.add("scale-100");
            tergetDescBox?.classList.add("duration-500");
          }, 100);
        }
      }
    }
    // console.log(question)
    // console.log(ans)
  }, []);

  const handleDelete = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/delete-question/${myQuestion._id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      questionsAfterDelete(myQuestion);
      setDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-4 mb-4 relative text-gray-700 px-6 bg-white rounded-md md:border">
      {myQuestion && (
        <div>
          <div className="flex justify-between">
            <div className="top flex items-center gap-2">
              <div className="">
                <img
                  onMouseEnter={() => setProfileContainer(true)}
                  onMouseLeave={() => setProfileContainer(false)}
                  className="w-10"
                  src={myQuestion.userProfile}
                  alt={myQuestion.userName}
                />
                {profileContainer &&
                  store.userInfo.id !== myQuestion.userId && (
                    <div
                      onMouseEnter={() => setProfileContainer(true)}
                      onMouseLeave={() => setProfileContainer(false)}
                      className="absolute top-5 md:-translate-x-[50%] md:left-10"
                    >
                      <ProfileCard id={myQuestion.userId} />
                    </div>
                  )}
              </div>
              <div className="">
                <h2 className="font-semibold text-md">{myQuestion.userName}</h2>
                <p className="text-sm">{dateFormate(myQuestion.createdAt)}</p>
              </div>
            </div>
            <div>
              {myQuestion.userId === store.userInfo.id ? (
                <div className="flex gap-2 bg-slate-50 py-1 px-2 rounded-lg border">
                  <RiFileEditLine
                    onClick={() => setEdit(true)}
                    className="cursor-pointer hover:text-black duration-300"
                  />
                  <RiDeleteBin7Line
                    onClick={() => setDelete(true)}
                    className="cursor-pointer hover:text-rose-600 duration-300"
                  />
                </div>
              ) : (
                <div className="flex gap-2 justify-center items-center">
                  <div className="group relative duration-500">
                    <HiOutlineDotsHorizontal size={20} />
                    <div className="hidden absolute -right-6 group-hover:inline-block w-[200px] rounded-md text-center cursor-pointer bg-gray-100 py-1 px-4">
                      {" "}
                      <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`${viewurl}/userdashboard/timeline/${myQuestion.slug}`}
                      >
                        {" "}
                        <RxOpenInNewWindow /> <span>Open in a new tab</span>
                      </a>{" "}
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => questionsAfterDelete(myQuestion)}
                  >
                    <RxCross2 size={20} />
                  </div>
                </div>
              )}
              <div
                className={`${
                  deleteQ ? "scale-105" : "scale-0"
                } z-50 md:max-w-1/2 w-10/12 md:w-auto duration-150 px-4 md:px-10 py-6 shadow-md border-2 rounded-2xl bg-white -translate-x-[50%] -translate-y-[50%] fixed top-[50%] left-[50%]`}
              >
                <div className="flex justify-end">
                  <RxCross2
                    onClick={() => setDelete(false)}
                    className="cursor-pointer -mt-4 -mr-2 md:-mr-6"
                    size={18}
                  />
                </div>
                <h2 className="md:text-2xl text-lg mb-2">
                  Do you want to delete the question?
                </h2>
                <h4 className="text-sm md:text-md">{`"${myQuestion.question}"`}</h4>
                <div className="flex gap-2 justify-center mt-3">
                  <button
                    onClick={() => setDelete(false)}
                    className="bg-gray-100 px-2 rounded-md"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="bg-rose-200 px-2 rounded-md"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
            {/* ///////////////////////////////////////////////////////Edit Question Form//////////////////////////////////////////////// */}
            {edit && (
              <div className="fixed z-50 flex justify-center items-center bg-slate-300/70 top-0 left-0 w-screen h-screen">
                <div className="bg-white">
                  <h2 className="md:text-2xl p-4 text-center font-bold text-gray-500 mb-2">
                    Edit the question
                  </h2>
                  <div className="flex justify-end pr-10">
                    <button onClick={() => setEdit(false)}>
                      <RxCross2 size={25} />
                    </button>
                  </div>
                  <div className="h-[80vh] p-2 rounded-md overflow-auto">
                    <EditQuestion Q={myQuestion} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="middle mt-2">
            <h2 className="mb-2 border-b pb-2">
              <span className="px-2 mr-2 rounded-lg bg-gray-50 border">
                {myQuestion.subject}
              </span>
              | {myQuestion.chapter}
            </h2>
            <h2>Question: {myQuestion.question}</h2>
            {/* ////////////////////////////////////////Here Start all Question options//////////////////////////////////////////////// */}
            <div data-select={myQuestion.rightAns} className="py-2 space-y-2">
              <div
                onClick={(e) => checkAns(e, 1, myQuestion)}
                className="flex items-center gap-2 border bg-gray-50 pl-2 rounded-md cursor-pointer"
              >
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "ক"
                    : myQuestion.subject === "ইংরেজি"
                    ? "A"
                    : "ক"}
                </h2>
                <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                  {myQuestion.option_01}{" "}
                  <span className="hidden">
                    <RxCross2 color="red" size={22} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark color="green" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 2, myQuestion)}
                className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
              >
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "ক"
                    : myQuestion.subject === "ইংরেজি"
                    ? "B"
                    : "ক"}
                </h2>
                <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                  {myQuestion.option_02}{" "}
                  <span className="hidden">
                    <RxCross2 color="red" size={22} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark color="green" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 3, myQuestion)}
                className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
              >
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "ক"
                    : myQuestion.subject === "ইংরেজি"
                    ? "C"
                    : "ক"}
                </h2>
                <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                  {myQuestion.option_03}{" "}
                  <span className="hidden">
                    <RxCross2 color="red" size={22} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark color="green" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 4, myQuestion)}
                className="flex items-center gap-2 bg-gray-50 border pl-2 rounded-md cursor-pointer"
              >
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "ক"
                    : myQuestion.subject === "ইংরেজি"
                    ? "D"
                    : "ক"}
                </h2>
                <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                  {myQuestion.option_04}
                  <span className="hidden">
                    <RxCross2 color="red" size={22} />
                  </span>
                  <span className="hidden">
                    <GiCheckMark color="green" />
                  </span>
                </h3>
              </div>
            </div>
            {/* ////////////////////////////////////////Here end all Question options//////////////////////////////////////////////// */}
          </div>
          {myQuestion.content && (
            <div className="desc border-t scale-0 mt-2 pt-2 hidden duration-500 overflow-hidden">
              <h2> {HTMLReactParser(`${myQuestion.content}`)}</h2>
            </div>
          )}
        </div>
      )}

      <div className="mt-2 duration-300">
        <CommentBox question={myQuestion} />
      </div>
    </div>
  );
};

export default memo(QuestionCard); //
