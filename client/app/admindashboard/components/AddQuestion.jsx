"Use client"
import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import JoditEditor from "jodit-react";
import "react-toastify/dist/ReactToastify.css";
const AddQuestion = ({ addquestion }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [questionSchema, setQuestionSchema] = useState({
    subject: "",
    unit: "",
    exam: "",
    question: "",
    option_01: "",
    option_02: "",
    option_03: "",
    option_04: "",
    ans: "",
    exp: "",
  });
  const [loader, setLoader] = useState(false);
  const inputHandler = (e) => {
    setQuestionSchema({
      ...questionSchema,
      [e.target.name]: e.target.value,
    });
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `https://bank-server-nu.vercel.app/question/create`,
        questionSchema
      );
      toast(data.message);
      setLoader(false);
      setQuestionSchema({
        ...questionSchema,
        question: "",
        option_01: "",
        option_02: "",
        option_03: "",
        option_04: "",
        ans: "",
        exp: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  //
  console.log(content)
  return (
    <div className="">
      <div className="form">
        <h2 className="text-center mb-4 font-medium md:text-3xl text-2xl text-gray-700">
          Question Insert Form
        </h2>
        <div className="form">
          <div
            className={`text-center ${
              alert === "This question already exist, please add new one"
                ? "text-rose-500"
                : "text-green-500"
            }`}>
            {alert}
          </div>

          <form onSubmit={createPost}>
            <div className="md:flex gap-10">
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Subject</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.subject}
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="subject"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Unit</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.unit}
                  type="text"
                  name="unit"
                  id="unit"
                  placeholder="unit"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:flex gap-10 mt-2">
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Exam</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.exam}
                  type="text"
                  name="exam"
                  id="exam"
                  placeholder="exam"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Question</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.question}
                  type="text"
                  name="question"
                  id="question"
                  placeholder="question"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:flex gap-10 mt-2">
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Qusetion Option value 01</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.option_01}
                  type="text"
                  name="option_01"
                  id="option_01"
                  placeholder="option_01"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Qusetion Option value 02</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.option_02}
                  type="text"
                  name="option_02"
                  id="option_02"
                  placeholder="option_02"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:flex gap-10 mt-2">
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Qusetion Option value 03</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.option_03}
                  type="text"
                  name="option_03"
                  id="option_03"
                  placeholder="option_03"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="title">Qusetion Option value 02</label>
                <input
                  onChange={inputHandler}
                  value={questionSchema.option_04}
                  type="text"
                  name="option_04"
                  id="option_04"
                  placeholder="option_04"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:w-3/1">
              <input
                onChange={inputHandler}
                value={questionSchema.ans}
                type="number"
                name="ans"
                id="ans"
                placeholder="answer"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col w-full mb-2">
              <label htmlFor="description">Description</label>
              {/* <textarea
                    rows="5"
                    onChange={inputHandler}
                    value={questionSchema.exp}
                    name="exp"
                    id="exp"
                    placeholder="description"
                    // required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea> */}
              {/* <JoditEditor
                ref={editor}
                value={content}
                tabIndex = {1}
                onBlur={value => setContent(value)}
                onChange={() => {}}
              /> */}
            </div>
            <button
              disabled={loader}
              type="submit"
              className="btn w-fit px-10 py-2 text-center bg-sky-500 rounded-md mt-2 cursor-pointer text-white">
              {loader ? "Loading..." : "Create"}
            </button>
          </form>
        </div>
      </div>
      <h2>{content}</h2>
      <ToastContainer />
    </div>
  );
};

export default AddQuestion;
