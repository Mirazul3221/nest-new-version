import { baseurl } from "@/app/config";
import React, { useState } from "react";
import axios from "axios";
import { useStore } from "@/app/global/DataProvider";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ShowExpData from "./ShowExpData";
import Editor from "./Editor";
import { commonLogout } from "../../components/common";

const AddExperience = () => {
  const { store,dispatch } = useStore();
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [openExperienceForm, setOpenExperienceForm] = useState(false);
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
        setEndDate("Present");
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleResumeForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        id: Date.now(),
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
        `${baseurl}/user-resume/experience`,
        filteredPayload,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setChecked(false)
      setJobTitle("");
      setCompanyName("");
      setCompanyWeb("");
      setCompanyLocation("");
      setEditorContent('');
      setEmploymentType("");
      setStartDate("");
      setEndDate("");
      setTeam("");
      setLevel("");
      setTecUse("");
      setTeamSize("");
      setLinkToWork("");
      setExperienceData((prev) => [...prev, filteredPayload]);
      setOpenExperienceForm(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      commonLogout(dispatch,error)
    }
  };

  /////////////////////////////////////////Get Bio Data////////////////////////////////////
  const fetchBio = async () => {
    setIsLoadingContainer(true);
    try {
      const { data } = await axios.get(`${baseurl}/user-resume/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setExperienceData(data?.cvdata?.experience);
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
  return (
    <div className=" min-h-[60vh] flex justify-center items-center">
      {isLoadingContainer ? (
        <h2 className="mx-auto">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-700 text-center"
            size={20}
          />
        </h2>
      ) : (
        <div className="py-4 w-full">
          {experienceData?.length === 0 && (
            <form onSubmit={handleResumeForm} className="mt-4">
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
                  <div className="">
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
          )}

          {experienceData?.length > 0 && (
            <>
              {experienceData?.map((exp, i) => {
                return (
                  <ShowExpData
                    key={i}
                    exp={exp}
                    setExperienceData={setExperienceData}
                  />
                );
              })}
            </>
          )}

          {openExperienceForm && (
            <form onSubmit={handleResumeForm} className="mt-4">
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
          )}
          {experienceData?.length > 0 && (
            <button
              disabled={openExperienceForm}
              onClick={() => setOpenExperienceForm(true)}
              class={`text-white w-fit bg-[#3e19fa] ${
                openExperienceForm ? "cursor-not-allowed" : ""
              } hover:bg-violet-600 mt-10 ring-[3px] ring-violet-300 font-medium rounded-lg px-5 py-2.5 text-center`}
            >
              Add Experience (If Required)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddExperience;
