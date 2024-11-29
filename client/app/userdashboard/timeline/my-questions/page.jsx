"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useCallback, useContext, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import { useEffect } from "react";
import { baseurl } from "@/app/config";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
import HTMLReactParser from "html-react-parser";

const Page = () => {
  const { store } = useContext(storeContext);
  const [allQuestions, setAllQuestions] = useState();
  const fetchMyData = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/userquestions/myquestions`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setAllQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyData();
  }, []);
  console.log(allQuestions);

  const dateFormate = (createdAt) => {
    const currentYear = moment().year();
    const postYear = moment(createdAt).year();
    const format =
      currentYear === postYear ? "D MMM h:mm A" : "D MMMM h:mm A YYYY";
    const formattedDate = moment(createdAt).format(format);
    return formattedDate;
  };

  const checkAns = useCallback((e, index, ans, question) => {
    // setMark.sub(singleQuestion.topic)
    // let selectedData = questionsData[index].rightAns;
    const currentTerget = e.target;
    const tergetBox = e.target.parentElement.parentElement.children; // This tergetbox refers to the childer elements
    const tergetExp =
      e.target.parentElement.parentElement.parentElement.children[2]; // This tergetbox refers to the explanation elements
    //=============================================================
    const parentBox = e.target.parentElement.parentElement;
    // const getAttribute = parentBox.getAttribute("data-select");
    // const getAtterIntoNumber = parseInt(getAttribute);
    // setTimeout(() => {
    //   parentBox.setAttribute("data-select", getAttribute + 1);
    // }, 100);
    //=============================================================
    /////////////////////////////////////////////////////////////////////////////////////////
    // const mainTerget = questionsData[index].rightAns;
    const getAtter = e.target.parentElement.parentElement.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAtter);
    setTimeout(() => {
      e.target.parentElement.parentElement.setAttribute("data-select", getAtter + 1);
    }, 100);
    
     const tergetContainer = e.target.parentElement.parentElement.children;
     const tergetContainers = [tergetContainer[0], tergetContainer[1], tergetContainer[2], tergetContainer[3]];
    if (e.target.classList.contains("__target_option__")) {
      if (getAtterIntoNumber== question.rightAns) {
        if (ans === question.rightAns) {
          e.target.parentElement.classList.add("bg-green-200");
          e.target.parentElement.classList.add("border-green-500");
          e.target.parentElement.children[1].children[1].classList.remove('hidden')
        } else {
          e.target.parentElement.classList.add("bg-rose-200");
          e.target.parentElement.classList.add("border-rose-500");
          e.target.parentElement.children[1].children[0].classList.remove('hidden')
          tergetContainers[question.rightAns-1].classList.add('bg-green-200')
          tergetContainers[question.rightAns-1].classList.add("border-green-500")
          tergetContainers[question.rightAns-1].children[1].children[1].classList.remove('hidden')
        }
      }
    }
    // if (getAtterIntoNumber === selectedData) {
    //   if (questionsData[index].rightAns === ans) {
    //     increaseBalanceByperQuestionRead()
    //     currentTerget.classList.add("true");
    //     currentTerget.children[1].classList.remove("hidden")
    //     setMark.rf(setMark.r + 1)
    //     setCorrectMcq(correctMcq + 1);
    //     setSelectAll(selectAll + 1);

    //     localStorage.setItem("crossBtn", "true");
    //     setPositiveMarks(positiveMarks + 1);
    //     if (isSaveInHistory == 'on') {
    //       allRightQuestionsCollection(singleQuestion)
    //     }
    //   } else {
    //     currentTerget.classList.add("false");
    //     currentTerget.children[0].classList.remove("hidden")
    //     allOpton[mainTerget - 1].children[1].classList.add("true");
    //     allOpton[mainTerget - 1].children[1].children[1].classList.remove("hidden");
    //     //   if (volumeSound === "on") {
    //     //     wrongVolume.play();
    //     //   }
    //     setMark.wf(setMark.w + 1)
    //     setWrongAns(wrongAns + 1);
    //     setTimeout(() => {
    //       tergetExp?.classList.add("scale-110");
    //       tergetExp?.classList.remove("scale-0");
    //     }, 100);
    //     tergetExp?.classList.remove("hidden");
    //     setSelectAll(selectAll + 1);
    //     setNegitiveMarks(negitiveMarks + 0.25);
    //     if (isSaveInHistory == 'on') {
    //       allWrongQuestionsCollection(singleQuestion)
    //     }
    //   }
    // }

    // useEffect(() => {
    //   // localStorage.stringify()
    // }, []);
    //tish function has been set for counting reading questions
    const checkReadingQuestion = () => {
      // localStorage.setItem("")
      const uniqueId = singleQuestion._id;
      const questionId = localStorage.getItem("UUID")
        ? JSON.parse(localStorage.getItem("UUID"))
        : [];
      //Find ID from localstorage =================

      questionId.push(uniqueId);

      localStorage.setItem("UUID", JSON.stringify(questionId));
    };
    // checkReadingQuestion();
  }, []);
  return (
    <div>
      <ProtectRoute>
        <div className="header px-4 md:px-10 py-3">
          <SuperHeader />
        </div>
        <div className="bg-gray-50 border-t mb-1 overflow-auto h-[76vh] flex justify-center pt-4 px-4 md:px-10">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl text-center mb-4 font-semibold text-gray-700">
              All the questions you have added
            </h2>
            <div>
              {allQuestions?.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 text-gray-700 px-6 bg-white rounded-md border"
                  >
                    <div className="top flex items-center gap-2">
                      <img
                        className="w-10"
                        src={question.userProfile}
                        alt={question.userName}
                      />
                      <div className="">
                        <h2 className="font-semibold text-md">
                          {question.userName}
                        </h2>
                        <p className="text-sm">
                          {dateFormate(question.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="middle mt-2">
                      <h2 className="mb-2 border-b pb-2">
                        <span className="px-2 mr-2 rounded-lg bg-gray-50 border">
                          {question.subject}
                        </span>
                        | {question.chapter}
                      </h2>
                      <h2>Question: {question.question}</h2>
                      {/* ////////////////////////////////////////Here Start all Question options//////////////////////////////////////////////// */}
                      <div data-select={question.rightAns} className="pb-2 space-y-2">
                      <div
                          onClick={(e) => checkAns(e, index, 1, question)}
                          className="flex items-center gap-2 border pl-2 rounded-md cursor-pointer"
                        >
                          <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                            {question.subject === "বাংলা"
                              ? "ক"
                              : question.subject === "ইংরেজি"
                              ? "A"
                              : "ক"}
                          </h2>
                          <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                            {question.option_01} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                          </h3>
                        </div>
                        <div
                          onClick={(e) => checkAns(e, index, 2, question)}
                          className="flex items-center gap-2 border pl-2 rounded-md cursor-pointer"
                        >
                          <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                            {question.subject === "বাংলা"
                              ? "ক"
                              : question.subject === "ইংরেজি"
                              ? "B"
                              : "ক"}
                          </h2>
                          <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                            {question.option_02} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                          </h3>
                        </div>
                        <div
                          onClick={(e) => checkAns(e, index, 3, question)}
                          className="flex items-center gap-2 border pl-2 rounded-md cursor-pointer"
                        >
                          <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                            {question.subject === "বাংলা"
                              ? "ক"
                              : question.subject === "ইংরেজি"
                              ? "C"
                              : "ক"}
                          </h2>
                          <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                            {question.option_03} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                          </h3>
                        </div>
                        <div
                          onClick={(e) => checkAns(e, index, 4, question)}
                          className="flex items-center gap-2 border pl-2 rounded-md cursor-pointer"
                        >
                          <h2 className="border rounded-full w-4 h-4 flex justify-center items-center">
                            {question.subject === "বাংলা"
                              ? "ক"
                              : question.subject === "ইংরেজি"
                              ? "D"
                              : "ক"}
                          </h2>
                          <h3 className="__target_option__ w-full flex justify-between items-center pr-2">
                            {question.option_04} <span className="hidden"><RxCross2 color="red" size={22}/></span> <span className="hidden"><GiCheckMark color="green" /></span>
                          </h3>
                        </div>
                      </div>
                            {/* ////////////////////////////////////////Here Start all Question options//////////////////////////////////////////////// */}
                          
                                              </div>
                    <div className="bottom border-t ">
                      <h2> {HTMLReactParser(`${question.content}`)}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </ProtectRoute>
    </div>
  );
};

export default Page;
