"use client";
import React, { useRef, useState } from "react";
import ProtectRoute from "@/app/global/ProtectRoute";
import SuperHeader from "../components/SuperHeader";
import { useStore } from "@/app/global/DataProvider";
import { BsFileImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import MoveableImage from "./components/MoveableImage";
import { useGlobalData } from "../global/globalDataProvider.jsx";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { baseurl } from "@/app/config";

const Page = () => {
  const router = useRouter();
  const { store } = useStore();
  const { dispatch } = useGlobalData();
  const [switcher, setSwitcher] = useState("default");
  const [imgSrc, setImgSrc] = useState(null);
  const [storyText, setStoryText] = useState("");
  const [colorCode, setColorCode] = useState("#FFFFFF");
  const [textBg, setTextBg] = useState("A");
  const [fontSize, setFontSize] = useState(16);
  const [imgLoader, setImgLoader] = useState(false);
  const childRef = useRef();
  const handleClick = () => {
    setImgLoader(true);
    // Call child function via ref
    childRef.current?.handleUpload();
  };

  const handleTextMemory = async () => {
    try {
      setImgLoader(true);
      const { data } = await axios.post(
        `${baseurl}/usermemory/text-memory-build`,
        {
          type: "text",
          text: storyText,
          bg: textBg,
          style: { colorCode, fontSize },
        },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      router.push("/userdashboard/timeline/friends-question");
    } catch (error) {}
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

  const handleTextBg = (e, t) => {
    Array.from(e.currentTarget.parentElement.children).forEach((i) => {
      i.classList.remove("border-2");
      i.classList.remove("border-violet-500");
    });
    e.currentTarget.classList.add("border-2");
    e.currentTarget.classList.add("border-violet-500");
    setTextBg(t);
  };

  const handleChange = (e) => {
    setFontSize(e.target.value);
  };

  const colorCodes = [
    "#6ef5f0",
    "#2986AE",
    "#702929",
    "#F7724A",
    "#5ED5FF",
    "#E5BA37",
    "#8E939C",
    "#88BF4B",
    "#CAEDF8",
    "#CED0D4",
    "#DCD3EF",
    "#EE3B98",
    "#B9FCCB",
    "#2B457C",
    "#F4923A",
    "#F9CBD1",
    "#941FB1",
    "#F83D3D",
    "#583B9A",
    "#FFFFFF",
    "#F8E24C",
  ];

  const text_bg = [
    "AA",
    "BB",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
  ];

  return (
    <div>
      <ProtectRoute>
        {/* Top Bar */}
        <div className="px-4 h-[80px] bg-white border-b">
          <SuperHeader />
        </div>

        {/* Content Below Top Bar (fills remaining height) */}
        <div className="h-[calc(100vh-80px)] md:flex justify-between w-full">
          {/* Sidebar */}
          <div className="hidden w-3/12 md:flex flex-col justify-between bg-white h-full p-4 overflow-y-auto">
            <div>
              <h2 className="md:text-2xl font-semibold text-gray-700">
                Your memory
              </h2>
              <div className="Add_a_question rounded-md border md:mb-4 mt-1 mb-2 shadow-sm hover:shadow-md cursor-pointer duration-150 bg-white flex items-center gap-4 py-1 px-6">
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
                  rows="4"
                ></textarea>
              )}
              {switcher !== "default" && storyText && (
                <div className="border w-full p-4 shadow-md rounded-md mt-4">
                  <div className="flex flex-wrap gap-2 justify-between mb-4">
                    <h2 className="md:text-lg font-semibold text-gray-700">
                      Choose Color
                    </h2>
                    <div className="flex">
                      <label
                        title="click to change color"
                        htmlFor="colorPicker"
                        style={{ background: colorCode }}
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
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    {colorCodes.map((color, i) => (
                      <div
                        key={i}
                        onClick={(e) => handleTextColor(e, color)}
                        className={`w-[20px] h-[20px] ring-1 rounded-full shrink-0 ${
                          color === "#FFFFFF"
                            ? "border-2 border-violet-500"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <label htmlFor="textSize">Text Size: </label>
                  <input
                    className="mt-2"
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
            {switcher == "text_memory" && (
              <div className="flex justify-center gap-1 flex-wrap px-4 py-2 border rounded-md shadow-md my-4">
                {text_bg.map((t) => (
                  <div
                    key={t}
                    onClick={(e) => handleTextBg(e, t)}
                    className={`w-5 h-5 cursor-pointer rounded-full overflow-hidden ${
                      t == "A" ? "border-2 border-violet-500" : ""
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={`/story-bg/${t}.jpg`}
                    />
                  </div>
                ))}
              </div>
            )}
            {switcher !== "default" && (
              <div className="flex justify-between">
                <button
                  onClick={() => setSwitcher("default")}
                  className="py-1 px-8 rounded-md bg-gray-300"
                >
                  Discard
                </button>
                {switcher == "image_memory" && (
                  <button
                    disabled={imgLoader}
                    onClick={handleClick}
                    className="py-1 px-10 rounded-md bg-violet-500 text-white"
                  >
                    {!imgLoader ? (
                      "Click to capture"
                    ) : (
                      <div className="flex justify-center items-center gap-1">
                        <span>
                          <AiOutlineLoading3Quarters
                            className="animate-spin"
                            size={25}
                          />
                        </span>{" "}
                        Loading...
                      </div>
                    )}
                  </button>
                )}
                {switcher == "text_memory" && (
                  <button
                    disabled={imgLoader}
                    onClick={handleTextMemory}
                    className="py-1 px-10 rounded-md bg-violet-500 text-white"
                  >
                    {!imgLoader ? (
                      "Click to capture"
                    ) : (
                      <div className="flex items-center gap-1">
                        <AiOutlineLoading3Quarters
                          className="animate-spin"
                          size={25}
                        />
                        Loading...
                      </div>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
          {/* Main Content */}
          <div className="md:w-9/12 w-full h-full flex flex-col md:flex-row bg-gray-200 justify-center gap-4 items-center">
            {switcher == "default" && (
              <>
                <div className="flex gap-2 w-fit h-fit">
                  <label htmlFor="memory_create">
                    <div className="flex justify-center cursor-pointer scale-95 hover:scale-100 duration-300 items-center md:w-[20vw] md:h-[60vh] w-[60vw] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#981ce6]/50 via-[#3458cf]/60 to-[#1146f5]/70 p-6 text-white rounded-xl shadow">
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
                <div
                  onClick={() => setSwitcher("text_memory")}
                  className="flex gap-2 w-fit h-fit"
                >
                  <div className="flex justify-center cursor-pointer scale-95 hover:scale-100 duration-300 items-center w-[60vw] md:w-[20vw] md:h-[60vh] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-500/40 via-pink-600/60 to-pink-700/70 p-6 text-white rounded-xl shadow">
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
              <div className="bg-black/80 w-screen h-screen md:w-full md:h-full md:static fixed top-0 left-0">
                {switcher !== "default" && (
                  <div className="mx-auto w-full flex gap-1 items-center p-1 md:hidden">
                    <button
                      className="bg-white rounded-r-md rounded-l-full p-2"
                      onClick={() => setSwitcher("default")}
                    >
                      <RxCross2 size={26} color={"gray"} />
                    </button>
                    <input
                      type="text"
                      onChange={(e) => setStoryText(e.target.value)}
                      className="border focus:outline-none p-2 shadow-md rounded-md w-full"
                      placeholder="Start typing here"
                      name="story_text"
                      rows="2"
                    ></input>
                    <button
                      disabled={imgLoader}
                      onClick={handleClick}
                      className="py-2 px-3 rounded-l-md rounded-r-full bg-violet-500 text-white"
                    >
                      {!imgLoader ? (
                        "capture"
                      ) : (
                       <AiOutlineLoading3Quarters  className="animate-spin" size={25} />
                      )}
                    </button>
                  </div>
                )}
                <MoveableImage
                  ref={childRef}
                  imgSrc={imgSrc}
                  storyText={storyText}
                  colorCode={colorCode}
                  font={fontSize}
                />
                {storyText && (
                  <div className="w-[80vw] mx-auto md:hidden">
                    <div className="overflow-x-auto w-full mt-1">
                      <div className="flex gap-2 mt-2 w-max">
                        {colorCodes.map((color, i) => (
                          <div
                            key={i}
                            onClick={(e) => handleTextColor(e, color)}
                            className={`w-[30px] h-[30px] ring-1 rounded-full shrink-0 ${
                              color === "#FFFFFF"
                                ? "border-2 border-violet-500"
                                : ""
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex text-white items-center gap-1 mt-2 w-full">
                      <span>Font:</span>
                      <input
                        className="w-full"
                        type="range"
                        min="10"
                        max="60"
                        value={fontSize}
                        onChange={handleChange}
                      />
                      <span>{fontSize}px</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {switcher == "text_memory" && (
              <div className="bg-black/80 w-screen h-screen md:w-full md:h-full md:static fixed top-0 left-0">
                {switcher !== "default" && (
                  <div className="mx-auto w-full flex gap-[2px] items-center p-1 md:hidden relative">
                    <button
                      className="bg-white rounded-r-md rounded-l-full p-2"
                      onClick={() => setSwitcher("default")}
                    >
                      <RxCross2 size={26} color={"gray"} />
                    </button>
                    <input
                      type="text"
                      onChange={(e) => setStoryText(e.target.value)}
                      className="border focus:outline-none p-2 shadow-md rounded-md w-[calc(100%-140px)]"
                      placeholder="Start typing here"
                      name="story_text"
                      rows="2"
                    ></input>
                    <div
                      title="click to change color"
                      style={{ background: colorCode }}
                      className="w-10  h-10 rounded-md text-center text-white border overflow-hidden"
                    >
                      <input
                        id="color_picker"
                        type="color"
                        name="colorPicker"
                        value={colorCode}
                        onChange={(e) => setColorCode(e.target.value)}
                        className="w-full h-full cursor-pointer appearance-none border-none p-0"
                      />
                    </div>

                    <button
                      disabled={imgLoader}
                      onClick={handleTextMemory}
                      className="py-2 px-3 rounded-l-md rounded-r-full bg-violet-500 text-white"
                    >
                      {imgLoader ? (
                        <span>
                          <AiOutlineLoading3Quarters
                            className="animate-spin"
                            size={25}
                          />
                        </span>
                      ) : (
                        "Capture"
                      )}
                    </button>
                  </div>
                )}
                <div className="md:w-full md:h-full flex justify-center items-center">
                  <div className="w-[80vw] md:w-[300px] h-[80dvh] rounded-md border-white border-2 relative">
                    <img
                      className="w-full h-full"
                      src={`/story-bg/${textBg}.jpg`}
                      alt="story_image"
                    />

                    <div className="absolute top-0 left-0 flex items-center w-full h-full z-10">
                      <div className="w-full h-[80%] flex justify-center items-center overflow-y-auto">
                        <div
                          style={{
                            color: colorCode,
                            fontSize: fontSize + "px",
                          }}
                          className="max-h-full w-full px-4 text-center break-words"
                        >
                          {storyText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {storyText && (
                  <div className="w-[80vw] mx-auto md:hidden">
                    <div className="overflow-x-auto w-full mt-1">
                      <div className="flex gap-2 mt-2 w-max">
                        {text_bg.map((t) => (
                          <div
                            key={t}
                            onClick={(e) => handleTextBg(e, t)}
                            className={`w-5 h-5 cursor-pointer rounded-full overflow-hidden ${
                              t == "A" ? "border-2 border-violet-500" : ""
                            }`}
                          >
                            <img
                              className="w-full h-full object-cover"
                              src={`/story-bg/${t}.jpg`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex text-white items-center gap-1 mt-2 w-full">
                      <span>Font:</span>
                      <input
                        className="w-full"
                        type="range"
                        min="10"
                        max="60"
                        value={fontSize}
                        onChange={handleChange}
                      />
                      <span>{fontSize}px</span>
                    </div>
                  </div>
                )}
              </div>
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

export default Page; //
