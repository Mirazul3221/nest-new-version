"use client";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { GiTireIronCross } from "react-icons/gi";
// import { useNavigate } from "react-router-dom";

const JustifyQuestion = ({
  valueForCrossBtn,
  finalInfoForTheExam,
  valueForCrossBtn01,
}) => {
  const { correct, inCorrect, unselectedQuestion, incorrectMarks } =
    finalInfoForTheExam;
    const router = useRouter()
  //===============================================================
  //=================Correct and incorrect number==================
  //===============================================================
  const allQuestion = correct + inCorrect;
  const successRate = Math.floor((correct / allQuestion) * 100);
  const unSuccessScore = Math.floor((inCorrect / allQuestion) * 100);
  console.log(successRate, unSuccessScore);
  //===============================================================
  //============================End================================
  //===============================================================

  //===============================================================
  //===============Correct and incorrect marks distrubution========
  //===============================================================
  var cutMarks = correct - incorrectMarks;
  if (cutMarks < 0) {
    cutMarks = 0;
  }
  //===============================================================
  //============================End================================
  //===============================================================
  const refDivBox = useRef(null);
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Correct", "Incorrect", "Diselected"],
    datasets: [
      {
        label: "Your Score Here",
        data: [correct, inCorrect, unselectedQuestion],
        backgroundColor: ["#59ff62", "#fc503d", "#ff1900"],
        hoverOffset: 4,
      },
    ],
  };
  const dataForSuccessMarkRate = {
    labels: ["Total Questions", "Total Marks", "Cut Marks", "Incorrect Marks"],
    datasets: [
      {
        label: "Your Score Here",
        data: [allQuestion, correct + inCorrect, cutMarks, incorrectMarks],
        backgroundColor: ["white", "red", "#4fff87", "#ff554f"],
        hoverOffset: 4,
      },
    ],
  };

  const dataForSuccessRate = {
    labels: ["Success Rate"],
    datasets: [
      {
        label: "Your Score Here",
        data: [successRate, unSuccessScore],
        backgroundColor: ["#59ff62", "white"],
        hoverOffset: 4,
      },
    ],
  };
  //Handle the cross
  //   GetValueFromPopup(setCross, setDisableSec);
  //set value in localstore
  //   localStorage.setItem("crossBtn", "true");
  localStorage.setItem("disableBox", "");
  //   console.log(localStorage.getItem("crossBtn"));
//   const navigate = useNavigate();
  const handleClick = () => {
    refDivBox.current.classList.add("transform");
    refDivBox.current.classList.add("-translate-y-[100%]");
    setTimeout(() => {
      refDivBox.current.classList.add("hidden");
    }, 200);
    // refDivBox.current.classList.add("hidden");
    router.push("/")
  };

  //   let stringValue1 = Boolean("true");
  //   console.log(typeof stringValue1);
  return (
    <div
      ref={refDivBox}
      className={`flex ${
        valueForCrossBtn === "on"
          ? "transform translate-y-0 duration-700"
          : "transform -translate-y-[500%] duration-300"
      } ${
        valueForCrossBtn01
          ? "transform translate-y-0 duration-700"
          : "transform -translate-y-[500%] duration-300"
      } justify-center bg-black/60 w-screen h-screen fixed z-50 top-0 left-0 items-center`}
    >
      <div className="md:w-1/2 py-10 pb-20 bg-white">
        <div className="cross flex justify-between mx-10">
          <h2 className="text-2xl font-medium text-center text-gray-700">
            AI Marks Distribution
          </h2>
          <div
            onClick={handleClick}
            className="p-3 cursor-pointer bg-gray-200 rounded-full"
          >
            <GiTireIronCross size={20} />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div
            className={` md:w-[400px] w-40 h-40 md:h-[400px] flex justify-center items-center`}
          >
            <Doughnut data={data} />
          </div>
          <div className="">
            <div
              className={` md:w-[200px] w-40 h-40 md:h-[200px] flex justify-center items-center`}
            >
              <Doughnut data={dataForSuccessRate} />
            </div>
            <div
              className={` md:w-[200px] w-40 h-40 md:h-[200px] flex justify-center items-center`}
            >
              <Doughnut data={dataForSuccessMarkRate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustifyQuestion;
