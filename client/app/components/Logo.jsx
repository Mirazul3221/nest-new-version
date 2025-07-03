import Image from "next/image";
import React from "react";
import logo from "@/public/bcs-logo.png";
import Link from "next/link";
const Logo = ({w}) => {
  return (

      <Link href={"/"}>
        {/* <Image width={w} src={logo} alt="BCS Logo" /> */}
        <div className="text-center text-violet-500 text-3xl">edu <sub>++</sub></div>
      </Link>
  );
};

export default Logo;
