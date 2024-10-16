"Use Client"
import React, { useEffect, useRef, useState } from "react";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import JustifyQuestion from "./JustifyQuestion";
const data = [];

const ControllerForExam = ({ getRobot, questionsData }) => {
 //==================
  //=========================
  //==================================
  //============================================
  //=========================================================
  //========AUDIO EFFECT===================================================
  //=====================================================================================
  //======================================================================================================
  // const volumeSound = localStorage.getItem("volume");
//   const buttonEffect = new Audio(button_sound);
//   const popup = new Audio(popup_sound);
  //=======================================================================
  //===========ALL STATEMENT HERE=============================
  //============================================
  const timeRef = useRef();
  //====================================================================
  const [startExam, setStartExam] = useState(true);
  const [selectAll, setSelectAll] = useState(0);
  //Here is the statement about correct and inCorrect ans
  const [correctMcq, setCorrectMcq] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  //====================================================
  const [getCorrectMcq, setGetCorrectMcq] = useState(0);
  const [getWrongMcq, setGetWrongMcq] = useState(0);
  //Here is thatement about negitive and positive marks
  const [negitiveMarks, setNegitiveMarks] = useState(0);
  const [getNegitiveMarks, setGetNegitiveMarks] = useState(0);
  localStorage.setItem("setJustifyBtn", "");
  const [getBtn, setGetBtn] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const [disable, setDisable] = useState("");
  // const heyRobot = getRobot;
  // const question_data = data;

  //===============================================
  //=============================================
  let dataForPieChart = {
    correct: 0,
    inCorrect: 0,
    unselectedQuestion: data.length - (getCorrectMcq + getWrongMcq),
    correctMarks: getCorrectMcq,
    incorrectMarks: 0,
  };

  if (switcher) {
    dataForPieChart = {
      correct: getCorrectMcq,
      inCorrect: getWrongMcq,
      unselectedQuestion: questionsData.length - (getCorrectMcq + getWrongMcq),
      correctMarks: getCorrectMcq,
      incorrectMarks: getNegitiveMarks,
    };
  }

  //============
  //======================
  //================================
  //==========================================
  //====================================================
  //===============ALL ROBOTIC WORK START FROM HERE=============
  //========================================================================
  //============================================================================================================
  const checkAns = (e, ans, index) => {
    let selectedData = questionsData[index].rightAns;
    const currentTerget = e.target;
    // const tergetBox = e.target.parentElement.parentElement.children; // This tergetbox refers to the childer elements
    //=============================================================
    const parentBox = e.target.parentElement.parentElement;
    const getAttribute = parentBox.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAttribute);
    setTimeout(() => {
      parentBox.setAttribute("data-select", getAttribute + 1);
    }, 100);

    //Congratulation Greate Robots
      if (getAtterIntoNumber === selectedData) {
        if (questionsData[index].rightAns === ans) {
        //   if (volumeSound === "on") {
        //     buttonEffect.play();
        //   }
          // currentTerget.parentElement.children[0].classList.add("");
          currentTerget.parentElement.children[0].classList.add("text-white");
          currentTerget.parentElement.children[0].classList.add("bg-gray-700")
          setCorrectMcq(correctMcq + 1);
          setSelectAll(selectAll + 1);
          // localStorage.setItem("crossBtn", "true");
        } else {
          // currentTerget.parentElement.children[0].classList.add("bg-black");
          currentTerget.parentElement.children[0].classList.add("text-white");
          currentTerget.parentElement.children[0].classList.add("bg-gray-700")
        //   if (volumeSound === "on") {
        //     buttonEffect.play();
        //   }

          setWrongAns(wrongAns + 1);
          setSelectAll(selectAll + 1);
          setNegitiveMarks(negitiveMarks + 0.25);
        }
      }
  };

  //shuffle the exam question
  //====================================
  //================================================
  //=========================================================
  //======LOGIC FOR EXAM CONTROLLING======================================
  //==================================================================================
  //==============================================================================================
  //======LOCAL STORAGE DATA========
  //========================
  //=======

  //==========================================
  //=======01// Justify With Timing Function===================
  //==========================================
  useEffect(() => {
    const timingFunc = () => {
      const timeForPerQuestion = 30;
      let allTime = questionsData?.length * timeForPerQuestion;
      const x = setInterval(() => {
        allTime--;

        const s = 1;
        const m = 60 * s;
        const h = m * 60;
        const getHour = Math.floor(allTime / h);
        const getMinute = Math.floor((allTime % h) / m);
        const getSecond = Math.floor(allTime % m);
        timeRef.current.innerText = `${getHour} : ${getMinute} : ${getSecond}`;
        if (allTime <= 0) {
          clearInterval(x);
          setGetBtn(true);
          setStartExam(false);
          setTimeout(() => {
            setSwitcher(true);
            // popup.play();
            setDisable("hidden");
          }, 1000);
        }
      }, 1000);
    };
    if (startExam) {
      timingFunc();
    }
  }, [questionsData?.length, startExam]);
  //()----------------------------------------()
  useEffect(() => {
    setGetCorrectMcq(correctMcq);
    setGetWrongMcq(wrongAns);
    setGetNegitiveMarks(negitiveMarks);
  }, [correctMcq, wrongAns, negitiveMarks]);

  //========================================================
  //=======02// Justify When Fill All the Ans=================================
  //=========================================================

  const submitButton = () => {
    setGetBtn(true);
    setStartExam(false);
    setDisable("hidden");
    setTimeout(() => {
      setSwitcher(true);
    }, 1000);
  };

  if (!startExam) {
    // if (volumeSound === "on") {
    //   popup.play();
    // }
  }

  if (questionsData?.length === selectAll) {
    setTimeout(() => {
      setGetBtn(true);
      setStartExam(false);
      setDisable("hidden");
      setSwitcher(true);
    }, 100);
  }

  //==========================================
  //=============FACE TWO=====================
  //==========================================

  //====================================================================================================
  //===================================================================================
  //===================================================================
  //====================================================
  //======================================
  //======================

  const backButton = () => {
    alert("Hello");
  };

  //Here I have created an object for exam exprement

  const getJustifyBtn = localStorage.getItem("setJustifyBtn");
  //============================
  //========================================
  //=======================================================
  //==============GET FOR INSURTING QUESTION=================================
  //=======================================================
  //=========================================
  //============================
  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="mail flex justify-center mb-6">
          <div className="sub flex justify-center items-center gap-2 w-fit px-4 py-2 bg-gray-200 rounded-full">
            <p className="text-[12px] md:text-[18px] font-medium">Back</p>
            <div
              onClick={backButton}
              className={`w-6 cursor-pointer h-6 ${
                backButton ? "bg-white" : "bg-green-300"
              } rounded-full`}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`mail ${
              selectAll >= 5 ? "flex" : "hidden"
            } justify-center mb-6`}
          >
            <div
              className={`sub ${
                selectAll >= 5
                  ? "bg-rose/50 fixed right-[2px] bottom-[8px] z-50"
                  : ""
              } ${disable} flex justify-center items-center gap-2 w-fit px-4 py-2 bg-gray-200 rounded-full`}
            >
              <p className="text-[12px] md:text-[18px] font-medium">
                Submit Answer
              </p>
              <div
                onClick={submitButton}
                className={`w-4 cursor-pointer h-4 animate-ping bg-green-500 rounded-full`}
              ></div>
            </div>
          </div>
          <div className="mail flex justify-center mb-6">
            <div
              className={`sub duration-1000 ${disable} ${
                selectAll > 0
                  ? "bg-green-300/50 fixed w-32 right-[2px] top-[8px] z-50"
                  : "bg-gray-200"
              } flex justify-center items-center gap-2 w-fit px-4 py-2 rounded-full`}
            >
              <p
                ref={timeRef}
                className={`text-[12px] duration-500 ${
                  selectAll > 0 ? "text-[20px] text-rose-500" : ""
                } md:text-[18px] font-medium`}
              >
                Timing...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`grid md:grid-cols-3 gap-4 ${switcher ? "fixed" : ""}`}>
        {/* =============================================
          ==================Justify Answer=============
          ============================================= */}
        <JustifyQuestion
          finalInfoForTheExam={dataForPieChart}
          valueForCrossBtn={getJustifyBtn}
          valueForCrossBtn01={getBtn}
        />

        {questionsData?.map((value, index) => {
          return (
            <>
              <div className="question_box bg-gray-100 mx-4 px-4 py-8 md:mx-0 md:p-6 rounded-md shadow-md">
                <div className="flex gap-4">
                  <div className="">
                    <div className="rounded-full w-fit p-[3px] flex justify-center items-center border-2 relative">
                      <div className="absolute -top-[6px] -right-[9px] shadow-md bg-gray-500 text-white text-[10px] h-5 w-5 flex justify-center items-center rounded-full">
                        {index + 1}
                      </div>
                      <FaPersonCircleQuestion color="gray" size={25} />
                    </div>
                  </div>
                  <h2>{value.question}</h2>
                </div>
                <div
                  data-select={value.rightAns}
                  className="option_box space-y-2 mt-2"
                >
                  <div className="relative hover:bg-white border border-[#F3F4F6] hover:border-gray-300 duration-500 rounded-full">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      A
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 1, index);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5"
                    >
                      {value.option_01}
                    </p>
                  </div>
                  <div className="relative hover:bg-white border border-[#F3F4F6] hover:border-gray-300 duration-500 rounded-full">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      B
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 2, index);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5"
                    >
                      {value.option_02}
                    </p>
                  </div>
                  <div className="relative hover:bg-white border-[#F3F4F6] border hover:border-gray-300 duration-500 rounded-full">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      C
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 3, index);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5"
                    >
                      {value.option_03}
                    </p>
                  </div>
                  <div className="relative border-[#F3F4F6] hover:bg-white border hover:border-gray-300 duration-500 rounded-full">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      D
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 4, index);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5"
                    >
                      {value.option_04}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ControllerForExam
