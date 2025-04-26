"use client";
import ProtectRoute from "@/app/global/ProtectRoute";
import React, { useEffect, useRef, useState } from "react";
import SuperHeader from "../../components/SuperHeader";
import Footer from "@/app/components/Footer";
import axios from "axios";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import Formate01 from "./components/Formate01";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const page = () => {
  const { store } = useStore();
  const resumeRef = useRef();
  const [cvData, setCvData] = useState("");
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const downloadAsImage = async (format) => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const dataUrl = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `resume.${format}`;
    link.click();
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;
    let heightLeft = pdfHeight;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position -= pdf.internal.pageSize.getHeight();
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save("resume.pdf");
  };

  return (
    <ProtectRoute>
      <SuperHeader />
      <div className="min-h-[30vh] flex justify-between">
        <div className="w-2/12">Left side</div>
        <div className="w-10/12 bg-amber-50">
          <div ref={resumeRef}>{cvData && <Formate01 cvData={cvData} />}</div>

          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={() => downloadAsImage("png")}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download as PNG
            </button>
            <button
              onClick={() => downloadAsImage("jpeg")}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download as JPG
            </button>
            <button
              onClick={downloadAsPdf}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Download as PDF
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </ProtectRoute>
  );
};

export default page;
