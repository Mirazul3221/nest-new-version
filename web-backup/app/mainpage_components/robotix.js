"use client"
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Roboticx = () => {
  //===============================================================
  //=================Correct and incorrect number==================
  //===============================================================
  const [correct, setCorrect] = useState(10);
  const [inCorrect, setInCorrect] = useState(10);
  const [unselectedQuestion, setUnselectedQuestion] = useState(10);

  useEffect(() => {
    setInterval(() => {
      setCorrect(Math.floor(Math.random() * 100));
      setInCorrect(Math.floor(Math.random() * 100));
      setUnselectedQuestion(Math.floor(Math.random() * 100));
    }, 5000);
  }, []);
  const allQuestion = correct + inCorrect;
  const successRate = Math.floor((correct / allQuestion) * 100);
  const unSuccessScore = Math.floor((inCorrect / allQuestion) * 100);
  //===============================================================
  //============================End================================
  //===============================================================

  //===============================================================
  //==================Correct and incorrect marks distrubution=====
  //===============================================================
  var cutMarks = correct - inCorrect;
  if (cutMarks < 0) {
    cutMarks = 0;
  }
  //===============================================================
  //============================End================================
  //===============================================================
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Correct", "Incurrect", "Diselected"],
    datasets: [
      {
        label: "Your Score Here",
        data: [correct, inCorrect, unselectedQuestion],
        backgroundColor: ["#59ff62", "yellow", "#ff1900"],
        hoverOffset: 4,
      },
    ],
  };
  const dataForSuccessMarkRate = {
    labels: ["Total Question", "Total Marks", "Cut Marks", "Incurrect Mark"],
    datasets: [
      {
        label: "Your Score Here",
        data: [allQuestion, correct + inCorrect, cutMarks, unselectedQuestion],
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
  return (
    <div className=" md:py-10 md:mt-0 pb-20">
      <div className="md:flex md:px-20 justify-center items-center gap-4">
        <div
          className={` md:w-[320px] md:h-[320px] flex justify-center items-center`}
        >
          <Doughnut data={data} />
        </div>

        <div
          className={` md:w-[200px] hidden md:block md:h-[200px] w-40 h-40 flex justify-center items-center`}
        >
          <Doughnut data={dataForSuccessRate} />
        </div>
        <div
          className={` md:w-[200px] hidden md:block w-40 h-40 md:h-[200px]  flex justify-center items-center`}
        >
          <Doughnut data={dataForSuccessMarkRate} />
        </div>
      </div>
    </div>
  );
};

export default Roboticx;
