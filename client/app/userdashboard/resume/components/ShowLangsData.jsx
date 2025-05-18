import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { commonLogout } from "../../components/common";

const ShowLangsData = ({ item, setProjectData }) => {
  const { store ,dispatch} = useStore();
  const [isOpenFormWindow, setIsOpenFormWindow] = useState(false);
  const [isOpenDeleteWindow, setIsOpenDeleteWindow] = useState(false);
  const [langName, setLangName] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEditResumeForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseurl}/user-resume/update-langs`,
        { langId: item?.id, updateData: { langName, percentage } },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      data?.langName && (item.langName = data?.langName);
      data?.percentage && (item.percentage = data?.percentage);
      setIsOpenFormWindow(false);
    } catch (error) {
      console.log(error);
      commonLogout(dispatch)
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOpenFormWindow = async () => {
    item?.langName && setLangName(item?.langName);
    item?.percentage && setPercentage(item?.percentage);
    setIsOpenFormWindow(true);
  };
  //////////////////////////////////////////////////////////////////////
  const handleDeleteWindow = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/user-resume/delete-langs`,
        { langId: item?.id },
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
  return (
    <div>
      {isOpenFormWindow ? (
        <form className="" onSubmit={handleEditResumeForm}>
          <div className="mb-4 border p-4 rounded-lg relative">
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Add Language
              </label>
              <input
                type="text"
                required
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Percentage
              </label>
              <input
                type="text"
                required
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full p-2 border rounded mb-2"
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
        <div className="data mt-5 border bg-white border-gray-200 text-gray-700  px-6 py-4">
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
          <div className="flex gap-2 items-center w-fit ml-auto">
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
            <div className="">
              <div>
                <h2 className="text-lg">
                  <span className="font-semibold">Language :</span>{" "}
                  {item?.langName}
                </h2>
              </div>
              {item?.percentage && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Percentage:</span>
                    {item?.percentage}%
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowLangsData;
