import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { commonLogout } from "../../components/common";

const AddSummary = () => {
  const { store,dispatch } = useStore();
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const [projectData, setProjectData] = useState("");
  const [openBtn, setOpenBtn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchBio = async () => {
    setIsLoadingContainer(true);
    try {
      const { data } = await axios.get(`${baseurl}/user-resume/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setProjectData(data?.cvdata?.primaryData[0]?.myBioData);
      setOpenBtn(data?.cvdata?.primaryData[0]?.myBioData);
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

  const handleEditorChange = (content) => {
    setProjectData(content);
  };

  console.log(openBtn.length);
  console.log(projectData.length);
  return (
    <div>
      <div className="mt-10 w-2/3 shadow-md mx-auto">
        {projectData && (
          <Editor change={projectData} onChange={handleEditorChange} />
        )}
        <div className=""></div>
        {openBtn &&
          openBtn.length + 2 !== projectData &&
          projectData.length && (
            <div>
              {openBtn.length + 2 !== projectData.length && (
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
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default AddSummary;
