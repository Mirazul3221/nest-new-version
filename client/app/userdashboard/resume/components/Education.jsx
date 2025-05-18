import { baseurl } from "@/app/config";
import React, { useState } from "react";
import {
  bba_course,
  bsc_engineering,
  bsc_in_agricultural_science,
  diploma_in_engineering,
  diploma_in_medical_technology,
  fazil,
  getHighlightedText,
  honors,
  hsc_vocational,
  mbbs_bds,
  pass_course,
  ssc_dakhil_oLevel_cambridge_SSC_equivalent_hsc_alim_business_management,
  ssc_vocational__dakhil_vocational,
} from "./data";
import axios from "axios";
import { useStore } from "@/app/global/DataProvider";
import { useEffect } from "react";
import ShowEduData from "./ShowEduData";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { commonLogout } from "../../components/common";

const Education = () => {
  const { store,dispatch } = useStore();
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [educationLevel, setEducationLevel] = useState("Secondary");
  const [examination, setExamination] = useState("S.S.C");
  const [subject, setSubject] = useState("");
  const [board, setBoard] = useState("");
  const [result, setResult] = useState("");
  const [instValue, setInstValue] = useState("");
  const [foreignIns, setForeignIns] = useState("");
  const [foreignCountry, setForeignCountry] = useState("");
  const [gpa, setGpa] = useState();
  const [courseDuration, setCourseDuration] = useState();
  const [passingYear, setPassingYear] = useState();
  const [openEducationForm, setOpenEducationForm] = useState(false);

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleEducationLevel = (e) => {
    setExamination("Select");
    setEducationLevel(e.target.value);
  };

  const handleExamination = (e) => {
    setExamination(e.target.value);
  };
  const handleSubGroupDegree = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeInstValue = (e) => {
    const value = e.target.value;
    setInstValue(value);
    if (value.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const lowerValue = value.toLowerCase();
      const filtered = honors.filter((item) =>
        item.toLowerCase().includes(lowerValue)
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSelect = (suggestion) => {
    setInstValue(suggestion);
    setFilteredSuggestions([]);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleResumeForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        id: Date.now(),
        educationLevel,
        examination,
        subject,
        board,
        result,
        instValue,
        foreignIns,
        foreignCountry,
        gpa,
        courseDuration,
        passingYear,
      };

      // Filter out fields with falsy values (e.g., "", null, undefined)
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      const { data } = await axios.post(
        `${baseurl}/user-resume/education`,
        filteredPayload,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setEducationLevel("Secondary");
      setExamination("S.S.C");
      setSubject("");
      setBoard("");
      setResult("");
      setInstValue("");
      setForeignIns("");
      setForeignCountry("");
      setGpa("");
      setCourseDuration("");
      setPassingYear("");

      setEducationData((prev) => [...prev, filteredPayload]);
      setOpenEducationForm(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      commonLogout(dispatch)
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
      setEducationData(data?.cvdata?.education);
      setIsLoadingContainer(false);
    } catch (error) {
      console.log(error);
      setIsLoadingContainer(false);
      commonLogout(dispatch)
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
          {educationData?.length === 0 && (
            <form onSubmit={handleResumeForm} className="mt-4">
              <div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Level of Education
                    </label>
                    <select
                      value={educationLevel}
                      onChange={handleEducationLevel}
                      className="w-full border outline-none rounded-md py-2 px-4"
                    >
                      <option value="JSC/JDC/8pass">JSC/JDC/8pass</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Higher Secondary">Higher Secondary</option>
                      <option value="Bachelor/Honors">Bachelor/Honors</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD (Doctor of Philosophy)">
                        PhD (Doctor of Philosophy)
                      </option>
                    </select>
                  </div>
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  {educationLevel !== "PhD (Doctor of Philosophy)" && (
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Examination
                      </label>
                      <select
                        required
                        onChange={handleExamination}
                        value={examination}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        <option value={""}>Select</option>
                        {educationLevel == "JSC/JDC/8pass" && (
                          <>
                            <option value="JSC">JSC</option>
                            <option value="JDC(Madrasha)">JDC(Madrasha)</option>
                            <option value="8 pass">8 pass</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {educationLevel == "Secondary" && (
                          <>
                            <option value="S.S.C">S.S.C</option>
                            <option value="Dakhil(Madrasha)">
                              Dakhil(Madrasha)
                            </option>
                            <option value="S.S.C Vocational">
                              S.S.C Vocational
                            </option>
                            <option value="O Level/Cambridge">
                              O Level/Cambridge
                            </option>
                            <option value="S.S.C Equivalent">
                              S.S.C Equivalent
                            </option>
                            <option value="Dakhil Vocational">
                              Dakhil Vocational
                            </option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {educationLevel == "Higher Secondary" && (
                          <>
                            <option value="H.S.C">H.S.C</option>
                            <option value="Alim">Alim</option>
                            <option value="Business Management">
                              Business Management
                            </option>
                            <option value="Diploma-in-Engineering">
                              Diploma-in-Engineering
                            </option>
                            <option value="A Level/Sr. Cambridge">
                              A Level/Sr. Cambridge
                            </option>
                            <option value="H.S.C Equivalent">
                              H.S.C Equivalent
                            </option>
                            <option value="Diploma in Medical Technology">
                              Diploma in Medical Technology
                            </option>
                            <option value="H.S.C Vocational">
                              H.S.C Vocational
                            </option>
                            <option value="H.S.C (BM)">H.S.C (BM)</option>
                            <option value="Diploma in Pharmacy">
                              Diploma in Pharmacy
                            </option>
                          </>
                        )}

                        {educationLevel == "Bachelor/Honors" && (
                          <>
                            <option value="B.Sc Engineering">
                              B.Sc Engineering
                            </option>
                            <option value="B.Sc in Agricaltural Science">
                              B.Sc in Agricaltural Science
                            </option>
                            <option value="M.B.B.S/B.D.S">M.B.B.S/B.D.S</option>
                            <option value="Honors">Honors</option>
                            <option value="Pass Course">Pass Course</option>
                            <option value="Fazil">Fazil</option>
                            <option value="B.B.A">B.B.A</option>
                            <option value="Graduation Equivalent">
                              Graduation Equivalent
                            </option>
                          </>
                        )}

                        {educationLevel == "Masters" && (
                          <>
                            <option value="M.A">M.A</option>
                            <option value="M.S.S">M.S.S</option>
                            <option value="M.Sc">M.Sc</option>
                            <option value="M.Com">M.Com</option>
                            <option value="M.B.A">M.B.A</option>
                            <option value="L.L.M">L.L.M</option>
                            <option value="Kamil">Kamil</option>
                            <option value="Masters Equivalent">
                              Masters Equivalent
                            </option>
                          </>
                        )}

                        {educationLevel == "PhD (Doctor of Philosophy)" && (
                          <>
                            <option value="Bachelor of Medicine and Bachelor of Surgery(MBBS)">
                              Bachelor of Medicine and Bachelor of Surgery(MBBS)
                            </option>
                            <option value="Bachelor of Business Administration (BBA)">
                              Bachelor of Business Administration (BBA)
                            </option>
                            <option value="Other">0</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  {(educationLevel == "JSC/JDC/8pass" ||
                    educationLevel == "Secondary" ||
                    educationLevel == "Higher Secondary") && (
                    <>
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Board*
                        </label>
                        <select
                          required
                          value={board}
                          onChange={(e) => setBoard(e.target.value)}
                          className="w-full border outline-none rounded-md py-2 px-4"
                        >
                          <option value={""}>Select</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Jessor">Jessor</option>
                          <option value="Rajsahi">Rajsahi</option>
                        </select>
                      </div>
                    </>
                  )}

                  {educationLevel !== "JSC/JDC/8pass" && (
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Subject/Group/Degree
                      </label>
                      <select
                        required
                        onChange={handleSubGroupDegree}
                        value={subject}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        <option value="">Select</option>
                        {(examination == "S.S.C" ||
                          examination == "Dakhil(Madrasha)" ||
                          examination == "O Level/Cambridge" ||
                          examination == "S.S.C Equivalent" ||
                          examination == "H.S.C" ||
                          examination == "Alim" ||
                          examination == "Business Management" ||
                          examination == "A Level/Sr. Cambridge" ||
                          examination == "H.S.C Equivalent" ||
                          examination == "H.S.C (BM)") && (
                          <>
                            {ssc_dakhil_oLevel_cambridge_SSC_equivalent_hsc_alim_business_management.map(
                              (val, i) => {
                                return (
                                  <option key={i} value={val}>
                                    {val}
                                  </option>
                                );
                              }
                            )}
                          </>
                        )}

                        {(examination == "Dakhil Vocational" ||
                          examination == "S.S.C Vocational") && (
                          <>
                            {ssc_vocational__dakhil_vocational.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}

                        {examination == "Diploma-in-Engineering" && (
                          <>
                            {diploma_in_engineering.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}

                        {(examination == "Diploma in Medical Technology" ||
                          examination == "Diploma in Pharmacy") && (
                          <>
                            {diploma_in_medical_technology.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "H.S.C Vocational" && (
                          <>
                            {hsc_vocational.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.Sc Engineering" && (
                          <>
                            {bsc_engineering.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.Sc in Agricaltural Science" && (
                          <>
                            {bsc_in_agricultural_science.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "M.B.B.S/B.D.S" && (
                          <>
                            {mbbs_bds.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {(examination == "Honors" ||
                          examination == "Graduation Equivalent") && (
                          <>
                            {honors.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "Pass Course" && (
                          <>
                            {pass_course.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "Fazil" && (
                          <>
                            {fazil.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.B.A" && (
                          <>
                            {bba_course.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {/* {(examination == "") && (
                  <>
                    {bsc_in_agricultural_science.map((val, i) => {
                      return (
                        <option key={i} value={val}>
                          {val}
                        </option>
                      );
                    })}
                  </>
                )} */}
                      </select>
                    </div>
                  )}

                  {!checked &&
                    (educationLevel == "Bachelor/Honors" ||
                      educationLevel == "Masters") && (
                      <div className="relative w-full">
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          University/Inst.
                        </label>
                        <input
                          type="text"
                          required
                          value={instValue}
                          onChange={handleChangeInstValue}
                          className="w-full border outline-none rounded-md py-2 px-4"
                          placeholder="Type University Name..."
                        />

                        {filteredSuggestions.length > 0 && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "0",
                              margin: "4px 0 0",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              position: "absolute",
                              width: "100%",
                              backgroundColor: "white",
                              zIndex: 1,
                            }}
                          >
                            {filteredSuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                                style={{
                                  padding: "8px",
                                  cursor: "pointer",
                                }}
                              >
                                {getHighlightedText(suggestion, instValue)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                </div>

                {(educationLevel == "Bachelor/Honors" ||
                  educationLevel == "Masters") && (
                  <div className="w-full">
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
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
                      <span className="text-sm text-gray-700">
                        This is a foreign institute
                      </span>
                    </label>

                    {checked && (
                      <div className="md:flex gap-4 w-full">
                        <div className="w-full">
                          <label
                            for="last_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Institute Name***
                          </label>
                          <input
                            required
                            onChange={(e) => setForeignIns(e.target.value)}
                            value={foreignIns}
                            type="text"
                            id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            for="last_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Country of Foreign University
                          </label>
                          <input
                            required
                            onChange={(e) => setForeignCountry(e.target.value)}
                            value={foreignCountry}
                            type="text"
                            id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Result
                    </label>
                    <div className="flex justify-between gap-2 items-center">
                      <select
                        required
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        {" "}
                        <option value="">Select</option>
                        {(educationLevel == "JSC/JDC/8pass" ||
                          educationLevel == "Secondary" ||
                          educationLevel == "Higher Secondary") && (
                          <>
                            <option value="First Division">
                              First Division
                            </option>
                            <option value="Second Division">
                              Second Division
                            </option>
                            <option value="Thard Division">
                              Thard Division
                            </option>
                            <option value="GPA(Out of 4)">GPA(Out of 4)</option>
                            <option value="GPA(Out of 5)">GPA(Out of 5)</option>
                          </>
                        )}
                        {(educationLevel == "Bachelor/Honors" ||
                          educationLevel == "Masters" ||
                          educationLevel == "PhD (Doctor of Philosophy)") && (
                          <>
                            <option value="First Class">First Class</option>
                            <option value="Second Class">Second Class</option>
                            <option value="Thard Class">Thard Class</option>
                            <option value="CGPA(Out of 4)">
                              CGPA(Out of 4)
                            </option>
                            <option value="CGPA(Out of 5)">
                              CGPA(Out of 5)
                            </option>
                          </>
                        )}
                        <option value="Pass">Pass</option>
                        <option value="Enroalled">Enroalled</option>
                      </select>
                      {(result == "GPA(Out of 4)" ||
                        result == "GPA(Out of 5)" ||
                        result == "CGPA(Out of 4)" ||
                        result == "CGPA(Out of 5)") && (
                        <input
                          value={gpa}
                          required
                          onChange={(e) => setGpa(e.target.value)}
                          className="border outline-none rounded-md py-[6px] px-4"
                          type="number"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <div className="w-full">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Passing Year
                      </label>
                      <input
                        required
                        value={passingYear}
                        onChange={(e) => setPassingYear(e.target.value)}
                        className="border w-full outline-none rounded-md py-[6px] px-4"
                        type="number"
                      />
                    </div>
                    {(educationLevel == "Bachelor/Honors" ||
                      educationLevel == "Masters" ||
                      educationLevel == "PhD (Doctor of Philosophy)") && (
                      <div className="w-full">
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Course Duration
                        </label>
                        <input
                          required
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          className="border w-full outline-none rounded-md py-[6px] px-4"
                          type="number"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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

          {educationData?.length > 0 && (
            <>
              {educationData?.map((edu, i) => {
                return (
                  <ShowEduData
                    key={i}
                    edu={edu}
                    setEducationData={setEducationData}
                  />
                );
              })}
            </>
          )}

          {openEducationForm && (
            <form onSubmit={handleResumeForm} className="mt-4">
              <div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Level of Education
                    </label>
                    <select
                      value={educationLevel}
                      onChange={handleEducationLevel}
                      className="w-full border outline-none rounded-md py-2 px-4"
                    >
                      <option value="JSC/JDC/8pass">JSC/JDC/8pass</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Higher Secondary">Higher Secondary</option>
                      <option value="Bachelor/Honors">Bachelor/Honors</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD (Doctor of Philosophy)">
                        PhD (Doctor of Philosophy)
                      </option>
                    </select>
                  </div>
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  {educationLevel !== "PhD (Doctor of Philosophy)" && (
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Examination
                      </label>
                      <select
                        required
                        onChange={handleExamination}
                        value={examination}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        <option>Select</option>
                        {educationLevel == "JSC/JDC/8pass" && (
                          <>
                            <option value="JSC">JSC</option>
                            <option value="JDC(Madrasha)">JDC(Madrasha)</option>
                            <option value="8 pass">8 pass</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {educationLevel == "Secondary" && (
                          <>
                            <option value="S.S.C">S.S.C</option>
                            <option value="Dakhil(Madrasha)">
                              Dakhil(Madrasha)
                            </option>
                            <option value="S.S.C Vocational">
                              S.S.C Vocational
                            </option>
                            <option value="O Level/Cambridge">
                              O Level/Cambridge
                            </option>
                            <option value="S.S.C Equivalent">
                              S.S.C Equivalent
                            </option>
                            <option value="Dakhil Vocational">
                              Dakhil Vocational
                            </option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {educationLevel == "Higher Secondary" && (
                          <>
                            <option value="H.S.C">H.S.C</option>
                            <option value="Alim">Alim</option>
                            <option value="Business Management">
                              Business Management
                            </option>
                            <option value="Diploma-in-Engineering">
                              Diploma-in-Engineering
                            </option>
                            <option value="A Level/Sr. Cambridge">
                              A Level/Sr. Cambridge
                            </option>
                            <option value="H.S.C Equivalent">
                              H.S.C Equivalent
                            </option>
                            <option value="Diploma in Medical Technology">
                              Diploma in Medical Technology
                            </option>
                            <option value="H.S.C Vocational">
                              H.S.C Vocational
                            </option>
                            <option value="H.S.C (BM)">H.S.C (BM)</option>
                            <option value="Diploma in Pharmacy">
                              Diploma in Pharmacy
                            </option>
                          </>
                        )}

                        {educationLevel == "Bachelor/Honors" && (
                          <>
                            <option value="B.Sc Engineering">
                              B.Sc Engineering
                            </option>
                            <option value="B.Sc in Agricaltural Science">
                              B.Sc in Agricaltural Science
                            </option>
                            <option value="M.B.B.S/B.D.S">M.B.B.S/B.D.S</option>
                            <option value="Honors">Honors</option>
                            <option value="Pass Course">Pass Course</option>
                            <option value="Fazil">Fazil</option>
                            <option value="B.B.A">B.B.A</option>
                            <option value="Graduation Equivalent">
                              Graduation Equivalent
                            </option>
                          </>
                        )}

                        {educationLevel == "Masters" && (
                          <>
                            <option value="M.A">M.A</option>
                            <option value="M.S.S">M.S.S</option>
                            <option value="M.Sc">M.Sc</option>
                            <option value="M.Com">M.Com</option>
                            <option value="M.B.A">M.B.A</option>
                            <option value="L.L.M">L.L.M</option>
                            <option value="Kamil">Kamil</option>
                            <option value="Masters Equivalent">
                              Masters Equivalent
                            </option>
                          </>
                        )}

                        {educationLevel == "PhD (Doctor of Philosophy)" && (
                          <>
                            <option value="Bachelor of Medicine and Bachelor of Surgery(MBBS)">
                              Bachelor of Medicine and Bachelor of Surgery(MBBS)
                            </option>
                            <option value="Bachelor of Business Administration (BBA)">
                              Bachelor of Business Administration (BBA)
                            </option>
                            <option value="Other">0</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  {(educationLevel == "JSC/JDC/8pass" ||
                    educationLevel == "Secondary" ||
                    educationLevel == "Higher Secondary") && (
                    <>
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Board*
                        </label>
                        <select
                          required
                          value={board}
                          onChange={(e) => setBoard(e.target.value)}
                          className="w-full border outline-none rounded-md py-2 px-4"
                        >
                          <option>Select</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Jessor">Jessor</option>
                          <option value="Rajsahi">Rajsahi</option>
                        </select>
                      </div>
                    </>
                  )}

                  {educationLevel !== "JSC/JDC/8pass" && (
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Subject/Group/Degree
                      </label>
                      <select
                        required
                        onChange={handleSubGroupDegree}
                        value={subject}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        <option>Select</option>
                        {(examination == "S.S.C" ||
                          examination == "Dakhil(Madrasha)" ||
                          examination == "O Level/Cambridge" ||
                          examination == "S.S.C Equivalent" ||
                          examination == "H.S.C" ||
                          examination == "Alim" ||
                          examination == "Business Management" ||
                          examination == "A Level/Sr. Cambridge" ||
                          examination == "H.S.C Equivalent" ||
                          examination == "H.S.C (BM)") && (
                          <>
                            {ssc_dakhil_oLevel_cambridge_SSC_equivalent_hsc_alim_business_management.map(
                              (val, i) => {
                                return (
                                  <option key={i} value={val}>
                                    {val}
                                  </option>
                                );
                              }
                            )}
                          </>
                        )}

                        {(examination == "Dakhil Vocational" ||
                          examination == "S.S.C Vocational") && (
                          <>
                            {ssc_vocational__dakhil_vocational.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}

                        {examination == "Diploma-in-Engineering" && (
                          <>
                            {diploma_in_engineering.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}

                        {(examination == "Diploma in Medical Technology" ||
                          examination == "Diploma in Pharmacy") && (
                          <>
                            {diploma_in_medical_technology.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "H.S.C Vocational" && (
                          <>
                            {hsc_vocational.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.Sc Engineering" && (
                          <>
                            {bsc_engineering.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.Sc in Agricaltural Science" && (
                          <>
                            {bsc_in_agricultural_science.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "M.B.B.S/B.D.S" && (
                          <>
                            {mbbs_bds.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {(examination == "Honors" ||
                          examination == "Graduation Equivalent") && (
                          <>
                            {honors.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "Pass Course" && (
                          <>
                            {pass_course.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "Fazil" && (
                          <>
                            {fazil.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {examination == "B.B.A" && (
                          <>
                            {bba_course.map((val, i) => {
                              return (
                                <option key={i} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </>
                        )}
                        {/* {(examination == "") && (
                  <>
                    {bsc_in_agricultural_science.map((val, i) => {
                      return (
                        <option key={i} value={val}>
                          {val}
                        </option>
                      );
                    })}
                  </>
                )} */}
                      </select>
                    </div>
                  )}

                  {!checked &&
                    (educationLevel == "Bachelor/Honors" ||
                      educationLevel == "Masters") && (
                      <div className="relative w-full">
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          University/Inst.
                        </label>
                        <input
                          required
                          type="text"
                          value={instValue}
                          onChange={handleChangeInstValue}
                          className="w-full border outline-none rounded-md py-2 px-4"
                          placeholder="Type University Name..."
                        />

                        {filteredSuggestions.length > 0 && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "0",
                              margin: "4px 0 0",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              position: "absolute",
                              width: "100%",
                              backgroundColor: "white",
                              zIndex: 1,
                            }}
                          >
                            {filteredSuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                                style={{
                                  padding: "8px",
                                  cursor: "pointer",
                                }}
                              >
                                {getHighlightedText(suggestion, instValue)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                </div>

                {(educationLevel == "Bachelor/Honors" ||
                  educationLevel == "Masters") && (
                  <div className="w-full">
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
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
                      <span className="text-sm text-gray-700">
                        This is a foreign institute
                      </span>
                    </label>

                    {checked && (
                      <div className="md:flex gap-4 w-full">
                        <div className="w-full">
                          <label
                            for="last_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Institute Name***
                          </label>
                          <input
                            required
                            onChange={(e) => setForeignIns(e.target.value)}
                            value={foreignIns}
                            type="text"
                            id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            for="last_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Country of Foreign University
                          </label>
                          <input
                            required
                            onChange={(e) => setForeignCountry(e.target.value)}
                            value={foreignCountry}
                            type="text"
                            id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
                  {/* ------------------------------------------------%%%%%%%%%%%--------------------------------------------------------*/}
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Result
                    </label>
                    <div className="flex justify-between gap-2 items-center">
                      <select
                        value={result}
                        required
                        onChange={(e) => setResult(e.target.value)}
                        className="w-full border outline-none rounded-md py-2 px-4"
                      >
                        {" "}
                        <option value="">Select</option>
                        {(educationLevel == "JSC/JDC/8pass" ||
                          educationLevel == "Secondary" ||
                          educationLevel == "Higher Secondary") && (
                          <>
                            <option value="First Division">
                              First Division
                            </option>
                            <option value="Second Division">
                              Second Division
                            </option>
                            <option value="Thard Division">
                              Thard Division
                            </option>
                            <option value="GPA(Out of 4)">GPA(Out of 4)</option>
                            <option value="GPA(Out of 5)">GPA(Out of 5)</option>
                          </>
                        )}
                        {(educationLevel == "Bachelor/Honors" ||
                          educationLevel == "Masters" ||
                          educationLevel == "PhD (Doctor of Philosophy)") && (
                          <>
                            <option value="First Class">First Class</option>
                            <option value="Second Class">Second Class</option>
                            <option value="Thard Class">Thard Class</option>
                            <option value="CGPA(Out of 4)">
                              CGPA(Out of 4)
                            </option>
                            <option value="CGPA(Out of 5)">
                              CGPA(Out of 5)
                            </option>
                          </>
                        )}
                        <option value="Pass">Pass</option>
                        <option value="Enroalled">Enroalled</option>
                      </select>
                      {(result == "GPA(Out of 4)" ||
                        result == "GPA(Out of 5)" ||
                        result == "CGPA(Out of 4)" ||
                        result == "CGPA(Out of 5)") && (
                        <input
                          required
                          value={gpa}
                          onChange={(e) => setGpa(e.target.value)}
                          className="border outline-none rounded-md py-[6px] px-4"
                          type="number"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <div className="w-full">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Passing Year
                      </label>
                      <input
                        value={passingYear}
                        required
                        onChange={(e) => setPassingYear(e.target.value)}
                        className="border w-full outline-none rounded-md py-[6px] px-4"
                        type="number"
                      />
                    </div>
                    {(educationLevel == "Bachelor/Honors" ||
                      educationLevel == "Masters" ||
                      educationLevel == "PhD (Doctor of Philosophy)") && (
                      <div className="w-full">
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Course Duration
                        </label>
                        <input
                          required
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          className="border w-full outline-none rounded-md py-[6px] px-4"
                          type="number"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <button
                  type="submit"
                  class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
                >
                  {isLoading ? "Loading..." : "Save change"}
                </button>

                <button
                  onClick={() => setOpenEducationForm(false)}
                  class={`text-white w-fit bg-violet-500 hover:bg-violet-600 ring-[3px] ring-violet-300 font-medium rounded-lg px-5 py-1 text-center`}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {educationData?.length > 0 && (
            <button
              disabled={openEducationForm}
              onClick={() => setOpenEducationForm(true)}
              class={`text-white w-fit bg-violet-500 ${
                openEducationForm ? "cursor-not-allowed" : ""
              } hover:bg-violet-600 mt-10 ring-[3px] ring-violet-300 font-medium rounded-lg px-5 py-2.5 text-center`}
            >
              Add Education (If Required)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
