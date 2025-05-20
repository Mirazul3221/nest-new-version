"use client";
import { useEffect, useState } from "react";
import Editor01 from "./Editor01";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ShowProjectData from "./ShowProjectData";
import { MdDeleteOutline } from "react-icons/md";
import { commonLogout } from "../../components/common";

export default function AddProject() {
  const { store ,dispatch} = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [projectData, setProjectData] = useState("");
  /////////////////////////////////////////Get Bio Data////////////////////////////////////
  const fetchBio = async () => {
    setIsLoadingContainer(true);
    try {
      const { data } = await axios.get(`${baseurl}/user-resume/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData(data?.cvdata?.project);
      setIsLoadingContainer(false);
    } catch (error) {
      console.log(error);
      setIsLoadingContainer(false);
      commonLogout(dispatch,error)
    }
  };
  useEffect(() => {
    fetchBio();
  }, []);

  const [sections, setSections] = useState([
  ]);
  useEffect(() => {
    if (projectData.length === 0) {
      setSections([
        {
          id: Date.now(),
          projectName: "",
          projectDuration: "",
          projectUrl: "",
          projectDescription: "",
        }
      ]);
    }
  }, [projectData]);
  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        projectName: "",
        projectDuration: "",
        projectUrl: "",
        projectDescription: "",
      },
    ]);
  };
  const handleChange = (id, field, value) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleFormValue = async (e) => {
    e.preventDefault();
    const reverseData = sections?.reverse();
    try {
      await axios.post(`${baseurl}/user-resume/project`, reverseData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData((prev) => [...reverseData, ...prev]);
      setSections([
        {
          id: "",
          projectName: "",
          projectDuration: "",
          projectUrl: "",
          projectDescription: "",
        },
      ]);
      setOpenProjectForm(false);
    } catch (error) {commonLogout(dispatch,error)}
  };
  const reHandleFormValue = async (e) => {
    e.preventDefault();
    const reverseData = sections?.reverse();
    try {
      await axios.post(`${baseurl}/user-resume/re-project`, reverseData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData((prev) => [...reverseData, ...prev]);
      setSections([
        {
          id: "",
          projectName: "",
          projectDuration: "",
          projectUrl: "",
          projectDescription: "",
        },
      ]);
      setOpenProjectForm(false);
    } catch (error) {commonLogout(dispatch,error)}
  };

  console.log(projectData)
  
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
                      <ShowProjectData
                        item={item}
                        setProjectData={setProjectData}
                      />
                    </div>
                  );
                })}

              {openProjectForm && (
                <form className="mt-4" onSubmit={reHandleFormValue}>
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="mb-4 border p-4 rounded-lg relative"
                    >
                      {/* Delete Button */}
                      {sections.length > 1 && (
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="flex ml-auto items-center gap-1 p-2 text-red-600 hover:text-red-800"
                        >
                          <MdDeleteOutline /> Delete
                        </button>
                      )}
                      <div>
                        <label className="block mb-1 text-sm font-semibold">
                          Project Name
                        </label>
                        <input
                          type="text"
                          required
                          value={section.projectName}
                          onChange={(e) =>
                            handleChange(
                              section.id,
                              "projectName",
                              e.target.value
                            )
                          }
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
                          value={section.projectDuration}
                          onChange={(e) =>
                            handleChange(
                              section.id,
                              "projectDuration",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded mb-2"
                        />
                      </div>
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium"
                        >
                          Live Link
                        </label>
                        <input
                          value={section.projectUrl}
                          onChange={(e) =>
                            handleChange(
                              section.id,
                              "projectUrl",
                              e.target.value
                            )
                          }
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
                        <Editor01
                          value={section.projectDescription}
                          id={section.id}
                          func={handleChange}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3 items-center">
                    <div
                      onClick={() => setOpenProjectForm(false)}
                      class="text-white cursor-pointer bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
                    >
                      Cancel
                    </div>
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
                    {sections.length < 5 - projectData?.length && (
                      <div
                        onClick={handleAddSection}
                        class="text-white cursor-pointer bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
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
                      Add Project (If Required)
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleFormValue}>
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="mb-4 border p-4 rounded-lg relative"
                >
                  <div>
                    <label className="block mb-1 text-sm font-semibold">
                      Project Name
                    </label>
                    <input
                      type="text"
                      required
                      value={section.projectName}
                      onChange={(e) =>
                        handleChange(section.id, "projectName", e.target.value)
                      }
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
                      value={section.projectDuration}
                      onChange={(e) =>
                        handleChange(
                          section.id,
                          "projectDuration",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium"
                    >
                      Live Link
                    </label>
                    <input
                      value={section.projectUrl}
                      onChange={(e) =>
                        handleChange(section.id, "projectUrl", e.target.value)
                      }
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
                    <Editor01
                      value={section.projectDescription}
                      id={section.id}
                      func={handleChange}
                    />
                  </div>

                  {/* Delete Button */}
                  {sections.length > 1 && (
                        <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="flex ml-auto items-center gap-1 p-2 text-red-600 hover:text-red-800"
                      >
                        <MdDeleteOutline /> Delete
                      </button>
                  )}
                </div>
              ))}

              <div className="flex gap-3 items-center">
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
                {sections.length < 5 && (
                  <div
                    onClick={handleAddSection}
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
}
