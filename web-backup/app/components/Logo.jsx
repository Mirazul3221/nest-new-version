import Image from "next/image";
import React from "react";
import logo from "@/public/bcs-logo.png";
import Link from "next/link";
const Logo = ({w}) => {
  return (

      <Link href={"/"}>
        {/* <Image width={w} src={logo} alt="BCS Logo" /> */}
        <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-[#ff0015] text-[8px] flex justify-center items-center text-white text-center">Bloody <br/> july</div>
      </Link>
  );
};

export default Logo;
