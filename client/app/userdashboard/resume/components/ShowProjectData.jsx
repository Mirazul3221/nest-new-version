import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Editor from "./Editor";
import HTMLReactParser from "html-react-parser";
import { commonLogout } from "../../components/common";

const ShowProjectData = ({ item, setProjectData }) => {
  const { store, dispatch } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenFormWindow, setIsOpenFormWindow] = useState(false);
  const [isOpenDeleteWindow, setIsOpenDeleteWindow] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  //////////////////////////////////////////////////////////////////////
  const handleDeleteWindow = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/user-resume/delete-project`,
        { proId: item?.id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setProjectData(data);
      setIsOpenDeleteWindow(false);
    } catch (error) {commonLogout(dispatch)}
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOpenFormWindow = async () => {
    item?.projectName && setProjectName(item?.projectName);
    item?.projectDuration && setProjectDuration(item?.projectDuration);
    item?.projectUrl && setProjectUrl(item?.projectUrl);
    item?.projectDescription && setProjectDescription(item?.projectDescription);
    setIsOpenFormWindow(true);
  };

  const handleEditResumeForm = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${baseurl}/user-resume/update-project`,
      {
        proId: item?.id,
        updateData: {
          projectName,
          projectDuration,
          projectUrl,
          projectDescription,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );

    data?.projectName && (item.projectName = data?.projectName);
    data?.projectDuration && (item.projectDuration = data?.projectDuration);
    data?.projectUrl && (item.projectUrl = data?.projectUrl);
    data?.projectDescription &&
      (item.projectDescription = data?.projectDescription);
    setIsOpenFormWindow(false);
    commonLogout(dispatch)
  };
  return (
    <div>
      {isOpenFormWindow ? (
        <form className="" onSubmit={handleEditResumeForm}>
          <div className="mb-4 border p-4 rounded-lg relative">
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Project Name
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Project Duration
              </label>
              <input
                type="text"
                required
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            </div>
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium">
                Live Link
              </label>
              <input
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                type="url"
                id="website"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                placeholder="example.com"
              />
            </div>

            <div className="">
              <label className="block mb-1 text-sm font-semibold">
                Project Description
              </label>
              {/* <textarea
                required
                value={section.description}
                onChange={(e) =>
                  handleChange(section.id, "description", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
              ></textarea> */}
              <Editor
                change={projectDescription}
                onChange={setProjectDescription}
              />
            </div>
            <div className="flex mt-4 items-center gap-2">
              <button
                type="submit"
                class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-white text-center"
                    size={20}
                  />
                ) : (
                  "Save change"
                )}
              </button>
              <div
                onClick={() => setIsOpenFormWindow(false)}
                class="text-white w-fit bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1 text-center"
              >
                Cancel
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="data mt-10 border bg-white border-gray-200 text-gray-700  px-6 py-10">
          {/* ////////////////Delete open window box//////////////////////// */}
          <div
            className={`fixed ${
              isOpenDeleteWindow ? "scale-1" : "scale-0"
            } duration-150 flex justify-center items-center z-50 bg-black/10 top-0 backdrop-blur-sm left-0 w-screen h-screen`}
          >
            <div className={`w-1/3 h-1/3 p-10 bg-white rounded-sm`}>
              <div className="flex text-3xl font-semibold items-center gap-4">
                {" "}
                <MdDeleteOutline size={50} color="#ff4d4d" /> Delete!
              </div>
              <h2 className="mt-4 text-lg">
                Are you sure, you want to delete this record?
              </h2>
              <div className="flex items-center gap-4 ml-auto w-fit mt-4">
                <h2
                  onClick={() => setIsOpenDeleteWindow(false)}
                  className="cursor-pointer"
                >
                  CANCEL
                </h2>
                <h2
                  onClick={() => handleDeleteWindow()}
                  className="bg-[#ff4d4d] text-white px-6 py-1 cursor-pointer rounded-md"
                >
                  YES, DELETE
                </h2>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center w-fit ml-auto mb-2">
            <button
              onClick={handleOpenFormWindow}
              className="text-green-500 text-sm font-semibold flex items-center gap-2 px-4 border-2 rounded-md border-white duration-150 hover:border-green-300"
            >
              <FaRegEdit /> EDIT
            </button>
            <button
              onClick={() => setIsOpenDeleteWindow(true)}
              className="text-rose-500 text-sm font-semibold px-4 border-2 flex items-center rounded-md border-white duration-150 hover:border-rose-300"
            >
              <MdDeleteOutline /> DELETE
            </button>
          </div>
          <div>
            <div className="md:grid grid-cols-2 gap-10">
              <div>
                <h2 className="text-lg">
                  <span className="font-semibold">Project Name :</span>{" "}
                  {item?.projectName}
                </h2>
              </div>
              {item?.projectDuration && (
                <div>
                  {" "}
                  <h2 className="text-lg">
                    <span className="font-semibold">Project Duration:</span>{" "}
                    {item?.projectDuration}
                  </h2>
                </div>
              )}
            </div>
            {item?.projectUrl && (
              <div>
                <h2 className="text-lg">
                  <span className="font-semibold">Project URL :</span>{" "}
                  {item?.projectUrl}
                </h2>
              </div>
            )}
            
            {item?.projectDescription && (
              <div className="make_inline text-lg">
                <span className="font-semibold">Summary :</span>
                {HTMLReactParser(`${" " + item?.projectDescription}`)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProjectData;
