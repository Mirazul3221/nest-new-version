"use client";
import React from "react";
import { FaFacebook, FaLinkedin, FaSquareWhatsapp } from "react-icons/fa6";
import { Banner } from "../adsterra/Banner";
const Footer = () => {
  return (
    <div>
            <Banner/>
      <div className="footer flex justify-between items-center py-4 md:px-20 px-4 bg-gray-300">
         <div className="md:flex gap-1 items-center">
         <h2>
          © Copyright 2024 | All Rights Reserved | Powered by Mirazul islam | 
        </h2>
        <h1>Bcs preparation online platform</h1>
         </div>
         <div className="flex gap-2">
           <a href="/register">Sign Up</a>
           <a href="/login">Log In</a>
         </div>
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
