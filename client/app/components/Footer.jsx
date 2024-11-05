"use client";
import React from "react";
import { FaFacebook, FaLinkedin, FaSquareWhatsapp } from "react-icons/fa6";
import { Banner } from "../adsterra/Banner";
const Footer = () => {
  return (
    <div>
            <Banner/>
      <div className="footer flex justify-between items-center py-4 md:px-20 px-4 bg-gray-300">
        <h2>
          © Copyright 2024 | All Rights Reserved | Powered by Mirazul islam
        </h2>
        <div className="flex items-center md:gap-4 gap-2">
          <FaFacebook size={25} />
          <FaSquareWhatsapp size={25} />
          <FaLinkedin size={25} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
