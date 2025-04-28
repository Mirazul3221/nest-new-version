"use client";

import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useEffect, useRef, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Formate01 from "./components/Formate01";
import Formate02 from "./components/Formate02";
import { convertImagesToBase64 } from "./components/convertImagesToBase64";

const Page = () => {
  const { store } = useStore();
  const resumeRef = useRef();
  const [cvData, setCvData] = useState("");
  const [loader,setLoader] = useState(false)

  const fetchBio = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/user-resume/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setCvData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBio();
  }, []);

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
  console.log(resumeRef.current)
    try {
      setLoader(true)
      // // ✅ First convert all images to base64
       await convertImagesToBase64(resumeRef.current);
  
      // ✅ Then get the updated HTML
      const element = resumeRef.current.innerHTML;
      const response = await axios.post(
        `${baseurl}/user-resume/generate-pdf`,
        { html: element },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          responseType: "blob",
        }
      );
      setLoader(false)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setLoader(false)
      console.error("Download Failed:", error);
    }
  };
  

  return (
    <ProtectRoute>
      <SuperHeader />
      <div className="min-h-[30vh] flex justify-between">
        {/* Left Sidebar */}
        <div className="w-2/12">Left side</div>

        {/* Resume Preview + Buttons */}
        <div className="w-10/12 py-10 flex flex-col items-center">

        <div ref={resumeRef}>
              <Formate01 cvData={cvData} />
            </div>

          {/* Download Buttons */}
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={downloadAsPDF}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            > {
              loader ? "Loading..." : " Download as PDF"
            }
             
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </ProtectRoute>
  );
};

export default Page;
