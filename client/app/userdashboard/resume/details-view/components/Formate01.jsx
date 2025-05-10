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
    <div
      style={{
        margin: "0 auto",
        // padding:'20px' // center it
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid gray",
          paddingBottom: "24px",
          marginTop: "20px",
          color: "gray",
        }}
      >
        <div
          style={{
            width: "33.333%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
              borderRadius: "9999px",
              border: "3px solid gray",
              width: "10rem",
              height: "10rem",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={cvData.profile}
              alt="cv-profile"
            />
          </div>
        </div>
        <div style={{ width: "66.666%" }}>
          {cvData?.cvdata?.primaryData[0] && (
            <div>
              <div>
                <p
                  style={{
                    fontSize: "3rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {cvData?.cvdata?.primaryData[0]?.firstName}
                  {cvData?.cvdata?.primaryData[0]?.lastName}
                </p>
                {cvData?.cvdata?.primaryData[0]?.title && (
                  <p style={{ fontSize: "1.5rem", marginTop: "8px" }}>
                    {cvData?.cvdata?.primaryData[0]?.title}
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  borderTop: "1px solid gray",
                  paddingTop: "8px",
                  gap: "16px",
                  marginTop: "20px",
                }}
              >
                {cvData?.cvdata?.primaryData[0]?.number && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IconeBuilder
                      iconeHolder={<IoCallSharp color="white" size={15} />}
                    />
                    <p>{cvData?.cvdata?.primaryData[0]?.number}</p>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.email && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IconeBuilder
                      iconeHolder={<FaEnvelope color="white" size={15} />}
                    />
                    <p>{cvData?.cvdata?.primaryData[0]?.email}</p>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.in && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IconeBuilder
                      iconeHolder={<FaLinkedinIn color="white" size={15} />}
                    />
                    <p>{cvData?.cvdata?.primaryData[0]?.in}</p>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.website && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IconeBuilder
                      iconeHolder={<BiWorld color="white" size={15} />}
                    />
                    <p>{cvData?.cvdata?.primaryData[0]?.website}</p>
                  </div>
                )}
                {cvData?.cvdata?.primaryData[0]?.location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IconeBuilder
                      iconeHolder={<FaLocationDot color="white" size={15} />}
                    />
                    <p>{cvData?.cvdata?.primaryData[0]?.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "24px" }}>
        {/* Left Section */}
        <div style={{ width: "30%" }}>
          {cvData?.cvdata?.primaryData[0]?.myBioData && (
            <div style={{ paddingRight: "10px", marginTop: "20px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Career Objective
              </p>
             <p style={{textAlign:"justify"}}>{HTMLReactParser(cvData?.cvdata?.primaryData[0]?.myBioData)}</p>
            </div>
          )}
          {/* Education */}
          {cvData?.cvdata?.education && (
            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Education
              </p>
              {cvData?.cvdata?.education?.map((edu, i) => (
                <div key={i}>
                  {edu.educationLevel && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dfdfdf",
                          width: "20px",
                          height: "20px",
                          marginLeft: "-10px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{edu.educationLevel}</p>
                    </div>
                  )}
                  <div
                    style={{
                      borderLeft: "2px solid #dfdfdf",
                      paddingLeft: "16px",
                    }}
                  >
                    {edu.examination && <p>{edu.examination}</p>}
                    {edu.subject && <p>Subject/Group: {edu.subject}</p>}
                    {edu.board && <p>Board: {edu.board}</p>}
                    {edu.result && (
                      <p>
                        CGPA: {edu.gpa}{" "}
                        {edu.result === "GPA(Out of 5)"
                          ? "(Out of 5)"
                          : edu.result === "CGPA(Out of 4)"
                          ? "(Out of 4)"
                          : ""}
                      </p>
                    )}
                    {edu.courseDuration && (
                      <p>Course Duration: {edu.courseDuration} Years</p>
                    )}
                    {edu.instValue && <p>Institution: {edu.instValue}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cvData?.cvdata?.skills && (
            <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Skills
              </p>
              {cvData?.cvdata?.skills?.map((skl, i) => (
                <div key={i}>
                  {skl.skillName && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dfdfdf",
                          width: "20px",
                          height: "20px",
                          marginLeft: "-10px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{skl.skillName}</p>
                    </div>
                  )}
                  <div
                    style={{
                      borderLeft: "2px solid #dfdfdf",
                      paddingLeft: "16px",
                    }}
                  >
                    <StarRating percentage={skl.percentage} starSize={18} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Language */}
          {cvData?.cvdata?.langs && (
            <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Language
              </p>
              {cvData?.cvdata?.langs?.map((lan, i) => (
                <div key={i}>
                  {lan.langName && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dfdfdf",
                          width: "20px",
                          height: "20px",
                          marginLeft: "-10px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{lan.langName}</p>
                    </div>
                  )}
                  <div
                    style={{
                      borderLeft: "2px solid #dfdfdf",
                      paddingLeft: "16px",
                    }}
                  >
                    <StarRating percentage={lan.percentage} starSize={18} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div style={{ width: "66.666%" }}>
          {/* Experience */}
          {cvData?.cvdata?.experience && (
            <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Experience
              </p>
              {cvData?.cvdata?.experience?.map((exp, i) => (
                <div key={i}>
                  {exp.jobTitle && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dfdfdf",
                          width: "20px",
                          height: "20px",
                          marginLeft: "-10px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{exp.jobTitle}</p>
                    </div>
                  )}
                  <div
                    style={{
                      borderLeft: "2px solid #dfdfdf",
                      paddingLeft: "16px",
                      paddingBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "40px" }}>
                      {exp.companyName && <p>{exp.companyName}</p>}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {exp.startDate && <p>({exp.startDate})</p>} ---{" "}
                        {exp.endDate && <p>({exp.endDate})</p>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "40px" }}>
                      {exp.companyWeb && (
                        <a
                          style={{ textDecoration: "underline", color: "gray" }}
                          href={exp.companyWeb}
                          target="_blank"
                        >
                          {exp.companyWeb}
                        </a>
                      )}
                      {exp.companyLocation && <p>{exp.companyLocation}</p>}
                    </div>
                    <div style={{ display: "flex", gap: "40px" }}>
                      {exp.team && (
                        <p style={{ textDecoration: "underline" }}>
                          Team Size : {exp.team}
                        </p>
                      )}
                      {exp.level && <p>Level : {exp.level}</p>}
                    </div>
                    {exp.tecUse && <p>Technology Used : {exp.tecUse}</p>}
                    {exp.editorContent && (
                      <div
                        style={{
                          whiteSpace: "normal",
                          lineHeight: "1.6",
                          wordBreak: "break-word",
                          fontSize: "1rem",
                          marginTop: "8px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Summary:</span>{" "}
                        {HTMLReactParser(exp.editorContent)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {cvData?.cvdata?.project && (
            <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Project
              </p>
              {cvData?.cvdata?.project?.map((pro, i) => (
                <div key={i}>
                  {pro.projectName && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dfdfdf",
                          width: "20px",
                          height: "20px",
                          marginLeft: "-10px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{pro.projectName}</p>
                    </div>
                  )}
                  <div
                    style={{
                      borderLeft: "2px solid #dfdfdf",
                      paddingLeft: "16px",
                      paddingBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "40px" }}>
                      {pro.projectUrl && (
                        <a
                          style={{ textDecoration: "underline", color: "gray" }}
                          href={pro.projectUrl}
                          target="_blank"
                        >
                          {pro.projectUrl}
                        </a>
                      )}
                      {pro.projectDuration && <p>{pro.projectDuration}</p>}
                    </div>
                    {pro?.projectDescription && (
                      <div
                        style={{
                          whiteSpace: "normal",
                          lineHeight: "1.6",
                          wordBreak: "break-word",
                          fontSize: "1rem",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Summary:</span>{" "}
                        {HTMLReactParser(pro.projectDescription)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formate01;
