import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Editor from "./Editor";
import HTMLReactParser from "html-react-parser";
import { commonLogout } from "../../components/common";

const ShowExpData = ({ exp, setExperienceData }) => {
  const { store, dispatch } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenFormWindow, setIsOpenFormWindow] = useState(false);
  const [isOpenDeleteWindow, setIsOpenDeleteWindow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [team, setTeam] = useState("");
  const [level, setLevel] = useState("");
  const [tecUse, setTecUse] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [linkToWork, setLinkToWork] = useState("");

  useEffect(() => {
    if (checked) {
      setEndDate("present");
    } else {
      setEndDate("");
    }
  }, [checked]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  //////////////////////////////////////////////////////////////////////
  const handleDeleteWindow = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/user-resume/delete-experience`,
        { expId: exp?.id },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setExperienceData(data);
      setIsOpenDeleteWindow(false);
    } catch (error) {commonLogout(dispatch,error)}
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOpenFormWindow = () => {
    exp?.jobTitle && setJobTitle(exp?.jobTitle);
    exp?.companyName && setCompanyName(exp?.companyName);
    exp?.companyWeb && setCompanyWeb(exp?.companyWeb);
    exp?.companyLocation && setCompanyLocation(exp?.companyLocation);
    exp?.employmentType && setEmploymentType(exp?.employmentType);
    exp?.startDate && setStartDate(exp?.startDate);
    exp?.endDate && setEndDate(exp?.endDate);
    exp?.team && setTeam(exp?.team);
    exp?.level && setLevel(exp?.level);
    exp?.tecUse && setTecUse(exp?.tecUse);
    exp?.teamSize && setTeamSize(exp?.teamSize);
    exp?.linkToWork && setLinkToWork(exp?.linkToWork);
    exp?.editorContent && setEditorContent(exp?.editorContent);
    setIsOpenFormWindow(true);
  };

  const handleSelect = (suggestion) => {
    setInstValue(suggestion);
    setFilteredSuggestions([]);
  };

  const handleEditResumeForm = async (e) => {
    e.preventDefault();
    const payload = {
      jobTitle,
      companyName,
      companyWeb,
      companyLocation,
      employmentType,
      startDate,
      endDate,
      team,
      level,
      tecUse,
      teamSize,
      linkToWork,
      editorContent,
    };

    // Filter out fields with falsy values (e.g., "", null, undefined)
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    const { data } = await axios.post(
      `${baseurl}/user-resume/update-experience`,
      { expId: exp?.id, filteredPayload },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );

    data?.jobTitle && (exp.jobTitle = data?.jobTitle);
    data?.companyName && (exp.companyName = data?.companyName);
    data?.companyWeb && (exp.companyWeb = data?.companyWeb);
    data?.companyLocation && (exp.companyLocation = data?.companyLocation);
    data?.employmentType && (exp.employmentType = data?.employmentType);
    data?.startDate && (exp.startDate = data?.startDate);
    data?.endDate && (exp.endDate = data?.endDate);
    data?.team && (exp.team = data?.team);
    data?.level && (exp.level = data?.level);
    data?.tecUse && (exp.tecUse = data?.tecUse);
    data?.teamSize && (exp.teamSize = data?.teamSize);
    data?.linkToWork && (exp.linkToWork = data?.linkToWork);
    data?.editorContent && (exp.editorContent = data?.editorContent);
    setIsOpenFormWindow(false);
    commonLogout(dispatch,error)
  };
  return (
    <div>
      {isOpenFormWindow ? (
        <form
          onSubmit={handleEditResumeForm}
          className="mb-10 bg-gray-100 p-4 border"
        >
          <div>
            <div class="md:grid gap-6 mb-6 md:grid-cols-2">
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="Enter a job title"
                />
              </div>
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Name
                </label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  type="text"
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="Enter a company name here"
                />
              </div>
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Website (Optional)
                </label>
                <input
                  onChange={(e) => setCompanyWeb(e.target.value)}
                  value={companyWeb}
                  type="url"
                  id="website"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example.com"
                />
              </div>

              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Location
                </label>
                <input
                  type="text"
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  value={companyLocation}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="City, Country — or “Remote” if applicable"
                />
              </div>
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Employment Type
                </label>
                <select
                  required
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full border outline-none rounded-md py-2 px-4"
                >
                  <option value={"Full-time"}>Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div className="md:flex justify-between items-center gap-4 my-2 md:my-0">
                <div className="w-full">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border w-full outline-none rounded-md py-[6px] px-4"
                    placeholder="Month, Year"
                  />
                </div>
                {checked ? (
                  <div className="w-full">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border w-full outline-none rounded-md py-[6px] px-4"
                      placeholder="Month, Year"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border w-full outline-none rounded-md py-[6px] px-4"
                      placeholder="Month, Year"
                    />
                  </div>
                )}
                <div className="w-fit">
                  <label className="space-x-2 cursor-pointer">
                    <span class="block md:min-w-20 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      If Continual
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={handleChange}
                      className="peer hidden"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-sm flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors">
                      <svg
                        className={`w-3 h-3 text-white ${
                          checked ? "block" : "hidden"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </div>
              </div>

              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Team / Department (Optional)
                </label>
                <input
                  type="text"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="Growth Team, Engineering Department"
                />
              </div>
              {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Level / Position Seniority (Optional)
                </label>
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="Junior, Mid-Level, Senior, Lead"
                />
              </div>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Technologies Used (for tech roles)
                </label>
                <input
                  type="text"
                  value={tecUse}
                  onChange={(e) => setTecUse(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="React.js, Node.js, MongoDB"
                />
              </div>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reporting To / Team Size (Optional)
                </label>
                <input
                  type="text"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="Reported to CTO, managed a team of 3 developers"
                />
              </div>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Links to Work (Optional)
                </label>
                <input
                  type="text"
                  value={linkToWork}
                  onChange={(e) => setLinkToWork(e.target.value)}
                  className="border w-full outline-none rounded-md py-[6px] px-4"
                  placeholder="GitHub, Portfolio, Live Projects"
                />
              </div>
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          </div>

          <div className="mb-4">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Key Responsibilities / Achievements
            </label>
            <Editor change={editorContent} onChange={handleEditorChange} />
          </div>
          <button
            type="submit"
            class="text-white bg-[#3e19fa] hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                  <span className="font-semibold">Job Title :</span>{" "}
                  {exp?.jobTitle}
                </h2>
              </div>
              {exp?.companyName && (
                <div>
                  {" "}
                  <h2 className="text-lg">
                    <span className="font-semibold">Company Name:</span>{" "}
                    {exp?.companyName}
                  </h2>
                </div>
              )}
              {exp?.companyWeb && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Company Website :</span>{" "}
                    {exp?.companyWeb}
                  </h2>
                </div>
              )}
              {exp?.companyLocation && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Company Location :</span>{" "}
                    {exp?.companyLocation}
                  </h2>
                </div>
              )}
              {exp?.employmentType && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Employment Type :</span>{" "}
                    {exp?.employmentType}
                  </h2>
                </div>
              )}

              {exp?.startDate && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Start date :</span>{" "}
                    {exp?.startDate}
                  </h2>
                </div>
              )}

              {exp?.endDate && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">End date :</span>{" "}
                    {exp?.endDate}
                  </h2>
                </div>
              )}

              {exp?.team && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Team :</span> {exp?.team}
                  </h2>
                </div>
              )}
              {exp?.level && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Level :</span> {exp?.level}
                  </h2>
                </div>
              )}
              {exp?.tecUse && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Technology Use :</span>{" "}
                    {exp?.tecUse}
                  </h2>
                </div>
              )}
              {exp?.teamSize && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">Team Size :</span>{" "}
                    {exp?.teamSize}
                  </h2>
                </div>
              )}
              {exp?.setLinkToWork && (
                <div>
                  <h2 className="text-lg">
                    <span className="font-semibold">
                      Work Document/portfolio Link :
                    </span>{" "}
                    {exp?.setLinkToWork}
                  </h2>
                </div>
              )}
            </div>
            {exp?.editorContent && (
              <div className="make_inline text-lg">
                <span className="font-semibold">
                  Summary : 
                </span>
                {HTMLReactParser(`${" " + exp?.editorContent}`)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowExpData;
