"use client";
import React, { useRef, useState } from "react";
import ProtectRoute from "@/app/global/ProtectRoute";
import SuperHeader from "../components/SuperHeader";
import { useStore } from "@/app/global/DataProvider";
import { BsFileImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import MoveableImage from "./components/MoveableImage";

const Page = () => {
  const { store } = useStore();
  const [switcher, setSwitcher] = useState("default");
  const [imgSrc, setImgSrc] = useState(null);
  const [storyText, setStoryText] = useState([]);
  const [colorCode, setColorCode] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(16);
  const [storyData,setStoryData] = useState(null);
  const [imgLoader,setImgLoader] = useState(false);
    const childRef = useRef();
      const handleClick = () => {
      setImgLoader(true)
    // Call child function via ref
    childRef.current?.handleUpload();
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
              setSwitcher("image_memory");
    }
  };
  const handleTextColor = (e, code) => {
    Array.from(e.target.parentElement.children).forEach((i) => {
      i.classList.remove("border-2");
      i.classList.remove("border-violet-500");
    });
    e.target.classList.add("border-2");
    e.target.classList.add("border-violet-500");
    setColorCode(code);
  };

  const handleChange = (e) => {
    setFontSize(e.target.value);
  }
  return (
    <div className="h-screen w-screen bg-gray-100">
      <ProtectRoute>
        {/* Top Bar */}
        <div className="px-4 h-[80px] bg-white border-b">
          <SuperHeader />
        </div>

        {/* Content Below Top Bar (fills remaining height) */}
        <div className="h-[calc(100vh-80px)] md:flex justify-between w-full">
          {/* Sidebar */}
          <div className="w-3/12 flex flex-col justify-between bg-white h-full p-4 overflow-y-auto">
            <div>
              <h2 className="md:text-2xl font-semibold text-gray-700">
                Your memory
              </h2>
              <div className="Add_a_question rounded-md border md:mb-4 mt-1 mb-2 shadow-sm hover:shadow-md cursor-pointer duration-150 bg-white flex items-center gap-4 py-2 px-6">
                <img
                  className="w-16 rounded-full"
                  src={store?.userInfo?.profile}
                  alt={store?.userInfo?.name}
                />
                <a
                  className="text-gray-700 text-lg md:font-semibold"
                  href="/userdashboard/timeline/create-post"
                >
                  {store?.userInfo?.name}
                </a>
              </div>
              {switcher !== "default" && (
                <textarea
                  onChange={(e) => setStoryText(e.target.value)}
                  className="border w-full p-2 shadow-md rounded-md"
                  placeholder="Start typing here"
                  name="story_text"
                  rows="5"
                ></textarea>
              )}
              {switcher !== "default" && storyText && (
                <div className="border w-full p-4 shadow-md rounded-md mt-4">
                  <div className="flex flex-wrap gap-2 justify-between mb-4">
                    <h2 className="md:text-lg font-semibold text-gray-700">
                      Choose Color
                    </h2>
                    <div className="flex">
                      <label title='click to change color'
                        htmlFor="colorPicker"
                        style={{background:colorCode}}
                        className="text-lg font-medium px-8 py-1 text-center text-white border"
                      >
                       {colorCode}
                      </label>

                      <input
                        type="color"
                        id="colorPicker"
                        name="colorPicker"
                        value={colorCode}
                        onChange={(e) => setColorCode(e.target.value)}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#6ef5f0");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#6ef5f0]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#2986AE");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#2986AE]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#702929");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#702929]"
                    ></div>

                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#F7724A");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#F7724A]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#5ED5FF");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#5ED5FF]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#E5BA37");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#E5BA37]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#8E939C");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#8E939C]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#88BF4B");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#88BF4B]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#CAEDF8");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#CAEDF8]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#CED0D4");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#CED0D4]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#DCD3EF");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#DCD3EF]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#EE3B98");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#EE3B98]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#B9FCCB");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#B9FCCB]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#2B457C");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#2B457C]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#F4923A");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#F4923A]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#F9CBD1");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#F9CBD1]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#941FB1");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#941FB1]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#F83D3D");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#F83D3D]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#583B9A");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#583B9A]"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#FFFFFF");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#FFFFFF] border-2 border-violet-500"
                    ></div>
                    <div
                      onClick={(e) => {
                        handleTextColor(e, "#F8E24C");
                      }}
                      className="w-[30px] h-[30px] ring-1 rounded-full bg-[#F8E24C]"
                    ></div>
                  </div>
                  <label htmlFor="textSize">Text Size: </label>
      <input className="mt-2"
        type="range"
        id="textSize"
        min="10"
        max="60"
        value={fontSize}
        onChange={handleChange}
      />
      <span>{fontSize}px</span>
                </div>
              )}
            </div>
            {switcher !== "default" && (
              <div className="flex justify-between">
                <button
                  onClick={() => setSwitcher("default")}
                  className="py-1 px-8 rounded-md bg-gray-300"
                >
                  Discard
                </button>
                <button disabled={imgLoader} onClick={handleClick} className="py-1 px-10 rounded-md bg-violet-500 text-white">
                  {!imgLoader ? "Click to capture" : 'Loading...'}
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="w-9/12 h-full flex justify-center gap-4 items-center">
            {switcher == "default" && (
              <>
                <div className="flex gap-2 w-fit h-fit">
                  <label htmlFor="memory_create">
                    <div className="flex justify-center cursor-pointer scale-95 hover:scale-100 duration-300 items-center w-[20vw] h-[60vh] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#981ce6]/50 via-[#3458cf]/60 to-[#1146f5]/70 p-6 text-white rounded-xl shadow">
                      <div>
                        <div className="bg-white p-3 rounded-full w-fit mx-auto mb-4">
                          {" "}
                          <BsFileImage color="gray" size={30} />
                        </div>

                        <h4 className="text-center text-white font-semibold">
                          Capture an image memory
                        </h4>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex gap-2 w-fit h-fit">
                  <div className="flex justify-center cursor-pointer scale-95 hover:scale-100 duration-300 items-center w-[20vw] h-[60vh] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-500/40 via-pink-600/60 to-pink-700/70 p-6 text-white rounded-xl shadow">
                    <div>
                      <div className="bg-white p-3 rounded-full w-fit mx-auto mb-4">
                        {" "}
                        <MdTextFields color="gray" size={30} />
                      </div>

                      <h4 className="text-center text-white font-semibold">
                        Capture a text memory
                      </h4>
                    </div>
                  </div>
                </div>
              </>
            )}

            {switcher == "image_memory" && (
              <MoveableImage ref={childRef}
                imgSrc={imgSrc}
                storyText={storyText}
                colorCode={colorCode}
                font={fontSize}
              />
            )}
          </div>
        </div>
        <input
          onChange={handleFileChange}
          className="hidden"
          id="memory_create"
          type="file"
        />
      </ProtectRoute>
    </div>
  );
};

export default Page;
