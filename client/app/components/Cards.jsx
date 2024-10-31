import { projectsData } from "../global/appData";
import SingleCard from "./SingleCard";
const Projects = () => {
    return (
      <div id='projects' className="relative z-40  mt-12">
        <div className="sticky top-20">
          <div className="w-[80px] h-[80px] bg-violet-300 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
          <div className="flex items-center justify-start relative">
            <span className="bg-[#1a1443] absolute left-0  w-fit text-white px-5 py-3 text-xl rounded-md">
              PROJECTS
            </span>
            <span className="w-full h-[2px] bg-[#1a1443]"></span>
          </div>
        </div>
        <div className="pt-10">
          <div className="">
            {/* {projectsData[0].description} */}
            {projectsData.slice(0, 4).map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card w-full mx-auto sticky"
              >
                <div className="rounded transition-all duration-[0.5s] w-full md:h-[110vh]">
                  <SingleCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Projects