import React from "react";
import IconeBuilder from "./IconeBuilder";
import { IoCallSharp } from "react-icons/io5";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import StarRating from "../../components/StarRating";
import HTMLReactParser from "html-react-parser";

const Formate01 = ({ cvData }) => {
  return (
    <div className="p-10 text-gray-700">
      <div className="top-part flex border-b-2 pb-6 text-gray-700 mt-10">
        <div className="w-4/12 flex justify-center items-center">
          <img
            className="rounded-full w-32 shadow-2xl shadow-gray-500 ring-2 ring-white"
            src={cvData.profile}
            alt="cv-profile"
          />
        </div>
        <div className="w-8/12">
          {cvData?.cvdata?.primaryData[0] && (
            <div>
              <div>
                <h2 className="text-5xl font-semibold">
                  {cvData?.cvdata?.primaryData[0]?.firstName}
                  {cvData?.cvdata?.primaryData[0]?.lastName}
                </h2>
                {cvData?.cvdata?.primaryData[0]?.title && (
                  <h2 className="text-2xl mt-1">
                    {cvData?.cvdata?.primaryData[0]?.title}
                  </h2>
                )}
              </div>
              <div className="grid border-t pt-2 gap-4 grid-cols-2 mt-5">
                {cvData?.cvdata?.primaryData[0]?.number && (
                  <div className="flex items-center gap-2">
                    <IconeBuilder
                      iconeHolder={<IoCallSharp color="white" size={15} />}
                    />
                    <h2>{cvData?.cvdata?.primaryData[0]?.number}</h2>
                  </div>
                )}

                {cvData?.cvdata?.primaryData[0]?.email && (
                  <div className="flex items-center gap-2">
                    <IconeBuilder
                      iconeHolder={<FaEnvelope color="white" size={15} />}
                    />
                    <h2>{cvData?.cvdata?.primaryData[0]?.email}</h2>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.in && (
                  <div className="flex items-center gap-2">
                    <IconeBuilder
                      iconeHolder={<FaLinkedinIn color="white" size={15} />}
                    />
                    <h2>{cvData?.cvdata?.primaryData[0]?.in}</h2>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.website && (
                  <div className="flex items-center gap-2">
                    <IconeBuilder
                      iconeHolder={<BiWorld color="white" size={15} />}
                    />
                    <h2>{cvData?.cvdata?.primaryData[0]?.website}</h2>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.location && (
                  <div className="flex items-center gap-2">
                    <IconeBuilder
                      iconeHolder={<FaLocationDot color="white" size={15} />}
                    />
                    <h2>{cvData?.cvdata?.primaryData[0]?.location}</h2>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="w-4/12">
          {cvData?.cvdata?.education && (
            <div className="mt-10">
              <h2 className="uppercase text-2xl font-semibold mb-4">
                Education
              </h2>
              {cvData?.cvdata?.education?.map((edu, i) => {
                return (
                  <div className="" key={i}>
                    {edu.educationLevel && (
                      <div className="aboutSlide year gap-4 flex items-center">
                        <div className="bg-[#dfdfdf] w-5 h-5 -ml-[10px] rounded-full flex justify-center items-center">
                          {i + 1}
                        </div>
                        <p className="font-bold">{edu.educationLevel}</p>
                      </div>
                    )}

                    <div class="desc border-l-2 aboutSlide border-[#dfdfdf] pl-4">
                      {edu.examination && <h2>{edu.examination}</h2>}
                      {edu.subject && <h2>Subject/Gropu: {edu.subject}</h2>}
                      {edu.board && <h2>Board:{edu.board}</h2>}
                      {edu.result && (
                        <h2>
                          {" "}
                          cgpa:{edu.gpa}{" "}
                          {edu.result == "GPA(Out of 5)" ? (
                            <span className="text-sm">(Out of 5)</span>
                          ) : edu.result == "CGPA(Out of 4)" ? (
                            <span className="text-sm">(Out of 4)</span>
                          ) : (
                            ""
                          )}
                        </h2>
                      )}

                      {edu.courseDuration && (
                        <h2>Course Duration:{edu.courseDuration} Years</h2>
                      )}
                      {edu.instValue && <h2>Institution:{edu.instValue}</h2>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {cvData?.cvdata?.skills && (
            <div className="mt-10">
              <h2 className="uppercase text-2xl font-semibold mb-4">Skills</h2>
              {cvData?.cvdata?.skills?.map((skl, i) => {
                return (
                  <div key={i}>
                    {skl.skillName && (
                      <div className="aboutSlide year gap-4 flex items-center">
                        <div className="bg-[#dfdfdf] w-5 h-5 -ml-[10px] rounded-full flex justify-center items-center">
                          {i + 1}
                        </div>
                        <p className="font-bold">{skl.skillName}</p>
                      </div>
                    )}
                    <div className="border-l-2 aboutSlide border-[#dfdfdf] pl-4">
                      <StarRating percentage={skl.percentage} starSize={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cvData?.cvdata?.langs && (
            <div className="mt-10">
              <h2 className="uppercase text-2xl font-semibold mb-4">
                Language
              </h2>
              {cvData?.cvdata?.langs?.map((lan, i) => {
                return (
                  <div key={i}>
                    {lan.langName && (
                      <div className="aboutSlide year gap-4 flex items-center">
                        <div className="bg-[#dfdfdf] w-5 h-5 -ml-[10px] rounded-full flex justify-center items-center">
                          {i + 1}
                        </div>
                        <p className="font-bold">{lan.langName}</p>
                      </div>
                    )}
                    <div className="border-l-2 aboutSlide border-[#dfdfdf] pl-4">
                      <StarRating percentage={lan.percentage} starSize={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="w-8/12">
          {cvData?.cvdata?.experience && (
            <div className="mt-10">
              <h2 className="uppercase text-2xl font-semibold mb-4">
                Experience
              </h2>
              {cvData?.cvdata?.experience?.map((exp, i) => {
                return (
                  <div key={i}>
                    {exp.jobTitle && (
                      <div className="aboutSlide year gap-4 flex items-center">
                        <div className="bg-[#dfdfdf] w-5 h-5 -ml-[10px] rounded-full flex justify-center items-center">
                          {i + 1}
                        </div>
                        <p className="font-bold">{exp.jobTitle}</p>
                      </div>
                    )}
                    <div className="border-l-2 aboutSlide pb-5 border-[#dfdfdf]">
                      <div class="flex gap-10 pl-4">
                        {exp.companyName && <h2>{exp.companyName}</h2>}
                        <div className="flex items-center gap-1">
                          {exp.startDate && <p>({exp.startDate})</p>} ---
                          {exp.endDate && <p>({exp.endDate})</p>}
                        </div>
                      </div>
                      <div class=" flex gap-10 pl-4">
                        {exp.companyWeb && (
                          <a
                            className="underline"
                            href={exp.companyWeb}
                            target="_blank"
                          >
                            {exp.companyWeb}
                          </a>
                        )}
                        {exp.companyLocation && <h2>{exp.companyLocation}</h2>}
                      </div>

                      <div class=" flex gap-10 pl-4">
                        {exp.team && (
                          <p className="underline">Team Size : {exp.team}</p>
                        )}
                        {exp.level && <h2>Level : {exp.level}</h2>}
                      </div>
                      {exp.tecUse && <h2 className="pl-4">Technology Used : {exp.tecUse}</h2>}
                      {exp?.editorContent && (
                        <div className="make_inline text-lg pl-4">
                          <span className="font-semibold">Summary :</span>
                          {HTMLReactParser(`${" " + exp?.editorContent}`)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {cvData?.cvdata?.project && (
            <div className="mt-10">
              <h2 className="uppercase text-2xl font-semibold mb-4">
                Project
              </h2>
              {cvData?.cvdata?.project?.map((pro, i) => {
                return (
                  <div key={i}>
                    {pro.projectName && (
                      <div className="aboutSlide year gap-4 flex items-center">
                        <div className="bg-[#dfdfdf] w-5 h-5 -ml-[10px] rounded-full flex justify-center items-center">
                          {i + 1}
                        </div>
                        <p className="font-bold">{pro.projectName}</p>
                      </div>
                    )}
                    <div className="border-l-2 aboutSlide pb-5 border-[#dfdfdf]">
                      <div class=" flex gap-10 pl-4">
                        {pro.projectUrl && (
                          <a
                            className="underline"
                            href={pro.projectUrl}
                            target="_blank"
                          >
                            {pro.projectUrl}
                          </a>
                        )}
                        {pro.projectDuration && <h2>{pro.projectDuration}</h2>}
                      </div>

                      {pro?.projectDescription && (
                        <div className="make_inline text-lg pl-4">
                          <span className="font-semibold">Summary :</span>
                          {HTMLReactParser(`${" " + pro?.projectDescription}`)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formate01;
