import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import ShowLangsData from "./ShowLangsData";

const AddLangs = () => {
  const { store } = useStore();
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [projectData, setProjectData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchBio = async () => {
    setIsLoadingContainer(true);
    try {
      const { data } = await axios.get(`${baseurl}/user-resume/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData(data?.cvdata?.langs);
      setIsLoadingContainer(false);
    } catch (error) {
      console.log(error);
      setIsLoadingContainer(false);
    }
  };
  useEffect(() => {
    fetchBio();
  }, []);
  const [langs, setLangs] = useState([]);
  const handleAddLangs = () => {
    setLangs([
      ...langs,
      {
        id: Date.now(),
        langName: "",
        percentage: "",
      },
    ]);
  };

  useEffect(() => {
    if (projectData.length === 0) {
      setLangs([
        {
          id: Date.now(),
          langName: "",
          percentage: "",
        },
      ]);
    }
  }, [projectData]);
  const handleChangeLangs = (id, field, value) => {
    setLangs(
      langs.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  const handleDeleteLangs = (id) => {
    setLangs(langs.filter((skl) => skl.id !== id));
  };

  const handleLangsForm = async (e) => {
    e.preventDefault();
    const reverseData = langs?.reverse();
    console.log(langs);
    try {
      await axios.post(`${baseurl}/user-resume/langs`, reverseData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData((prev) => [...reverseData, ...prev]);
      setLangs([
        {
          id: "",
          langName: "",
          percentage: "",
        },
      ]);
      //  setOpenProjectForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const reHandleLangsForm = async (e) => {
    e.preventDefault();
    const reverseData = langs?.reverse();
    try {
      await axios.post(`${baseurl}/user-resume/re-langs`, reverseData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData((prev) => [...reverseData, ...prev]);
      setLangs([
        {
          id: "",
          langName: "",
          percentage: "",
        },
      ]);
      setOpenProjectForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      {isLoadingContainer ? (
        <h2 className="mx-auto  min-h-[60vh] flex justify-center items-center">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-700 text-center"
            size={20}
          />
        </h2>
      ) : (
        <div className="mx-auto mt-5 w-full h-full">
          {projectData.length > 0 ? (
            <div>
              {projectData &&
                projectData?.map((item) => {
                  return (
                    <div key={item.id}>
                      <ShowLangsData
                        item={item}
                        setProjectData={setProjectData}
                      />
                    </div>
                  );
                })}

              {openProjectForm && (
                <form className="mt-5" onSubmit={reHandleLangsForm}>
                  <h2 className="text-2xl mb-1 font-semibold">Languages</h2>
                  {langs.map((lang) => (
                    <div className="mb-4 border p-4 rounded-lg relative">
                      {/* Delete Button */}
                      {lang.length > 1 && (
                        <button
                          onClick={() => handleDeleteLangs(lang.id)}
                          className="flex ml-auto items-center gap-1 p-2 text-red-600 hover:text-red-800"
                        >
                          <MdDeleteOutline /> Delete
                        </button>
                      )}
                      <div key={lang.id} className=" md:grid grid-cols-2 gap-5">
                        <div>
                          <label className="block mb-1 text-sm font-semibold">
                            Add Language
                          </label>
                          <input
                            type="text"
                            required
                            value={lang.langName}
                            onChange={(e) =>
                              handleChangeLangs(
                                lang.id,
                                "langName",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded mb-2"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-semibold">
                            Percentage
                          </label>
                          <input
                            type="number"
                            required
                            value={lang.percentage}
                            onChange={(e) =>
                              handleChangeLangs(
                                lang.id,
                                "percentage",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded mb-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex w-fit gap-3 items-center">
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
                    {langs.length < 5 && (
                      <div
                        onClick={handleAddLangs}
                        class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
                      >
                        Add New
                      </div>
                    )}
                  </div>
                </form>
              )}

              {projectData?.length > 0 && (
                <div>
                  {!openProjectForm && projectData?.length < 5 && (
                    <button
                      disabled={openProjectForm}
                      onClick={() => setOpenProjectForm(true)}
                      class={`text-white w-fit bg-violet-500 ${
                        openProjectForm ? "cursor-not-allowed" : ""
                      } hover:bg-violet-600 mt-10 ring-[3px] ring-violet-300 font-medium rounded-lg px-5 py-2.5 text-center`}
                    >
                      Add Languages (If Required)
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form className="mt-5" onSubmit={handleLangsForm}>
              <h2 className="text-2xl mb-1 font-semibold">Language</h2>
              {langs.map((lang) => (
                <div className="mb-4 border p-4 rounded-lg relative">
                  {/* Delete Button */}
                  {langs.length > 1 && (
                    <button
                      onClick={() => handleDeleteLangs(lang.id)}
                      className="flex ml-auto items-center gap-1 p-2 text-red-600 hover:text-red-800"
                    >
                      <MdDeleteOutline /> Delete
                    </button>
                  )}
                  <div key={lang.id} className=" md:grid grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-1 text-sm font-semibold">
                        Add Language
                      </label>
                      <input
                        type="text"
                        required
                        value={lang.langName}
                        onChange={(e) =>
                          handleChangeLangs(lang.id, "langName", e.target.value)
                        }
                        className="w-full p-2 border rounded mb-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-semibold">
                        Percentage
                      </label>
                      <input
                        type="number"
                        required
                        value={lang.percentage}
                        onChange={(e) =>
                          handleChangeLangs(
                            lang.id,
                            "percentage",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded mb-2"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex w-fit gap-3 items-center">
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
                {langs.length < 5 && (
                  <div
                    onClick={handleAddLangs}
                    class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
                  >
                    Add New
                  </div>
                )}
              </div>
            </form>
          )}

          {/* Add Section Button */}
        </div>
      )}
    </div>
  );
};

export default AddLangs;
