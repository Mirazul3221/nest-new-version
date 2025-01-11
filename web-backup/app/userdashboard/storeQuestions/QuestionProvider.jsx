"use client"
import React, { useReducer, useState } from "react";
import questionsContext from "./questionsContex";
import axios from "axios";
import { useEffect } from "react";
import { reducer } from "./questionReducer";
//

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);
  //==========================================
  //========Use the reducer function ===============
  //==========================================
  const initialState = [];
  //==========================
  //======dispatch create=========
  //==========================
  const [questionsState, dispatch] = useReducer(reducer, initialState);
  const getQuestionsFromApi = async () => {
    try {
      const { data } = await axios.get(
        "https://bank-server-nu.vercel.app/question/all"
      );
      setQuestions(data);
      const reverseQue = data.reverse();
      dispatch({ type: "ALL", payload: reverseQue });
    } catch (error) {}
  };
  useEffect(() => {
    getQuestionsFromApi();
  }, []);
  return (
    <div>
      <questionsContext.Provider
        value={{ questionsState, dispatch, questions }}
      >
        {children}
      </questionsContext.Provider>
    </div>
  );
};

export default QuestionProvider;
