import React from "react";

const CvPreview = ({ data }) => {
  const { name, title, contact, summary, experience, education, skills } = data;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden flex min-h-screen">
      
      {/* Left Sidebar */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white w-1/3 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold leading-tight">{name}</h1>
          <h2 className="text-xl font-light mt-2">{title}</h2>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">{contact?.email}</p>
            <p className="text-sm">{contact?.phone}</p>
            <p className="text-sm">{contact?.address}</p>
          </div>
        </div>

        <div className="text-xs text-center mt-10">
          <p>Designed with ❤️</p>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-10 space-y-8 overflow-y-auto">
        
        {/* Summary */}
        <section>
          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Profile Summary</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Experience</h3>
          {experience?.map((job, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">{job.role}</p>
                <p className="text-sm text-gray-500">{job.duration}</p>
              </div>
              <p className="text-sm text-indigo-600">{job.company}</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Education</h3>
          {education?.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.institution} ({edu.year})</p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills?.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1 rounded-full hover:bg-indigo-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CvPreview;
