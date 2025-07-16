"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { baseurl } from "../config";
import axios from "axios";
import Link from "next/link";

const Otp = ({ setKey, mail }) => {
    const [loader,setLoader] = useState(false)
  const [otp, setOtp] = useState(null);
  const [alert, setAlert] = useState("");
  const handleOtp = async () => {
    try {
      let uri = `${baseurl}/auth/recovery-user`;
      const { data } = await axios.post(uri, mail);
      console.log(typeof data.otp);
      if (otp == data.otp) {
        setKey("setpass");
      } else {
        setAlert("Invalide code");
        setTimeout(() => {
            setAlert("");
        }, 1000);
      }
    } catch (error) {}
  };

 const sendCodeAgain = async ()=>{
    try {
        setLoader(true)
        let uri = `${baseurl}/auth/sendmail`;
        const { data } = await axios.post(uri, mail);
        setTimeout(() => {
          setKey('otpbox')
        }, 1000);
        setAlert(data.msg);
        setTimeout(() => {
            setAlert("");
        }, 1000);
          setLoader(false)
      } catch (error) {
        console.log(error);
        setAlert(error.response?.data.message);
        setLoader(false)
        setAlert(error.message);
      }
 }
  return (
    <div className="md:w-1/2 p-10">
      <div className="flex justify-center mb-10">
        {" "}
        <div className="w-28">
          <Logo />
        </div>
      </div>
      <h2 className="mb-2">
        Please check your emails for a message with your code. Your code <br />{" "}
        is 6 numbers long.
      </h2>
      <h2 className="text-rose-500">{alert}</h2>
      <div className="flex gap-2 items-center">
<div className="w-1/2">
<input
        onChange={(e) => setOtp(e.target.value)}
        className="rounded-md px-4 w-full py-1 border-[1px] focus:border-fuchsia-600 focus:border-2 focus:outline-none border-fuchsia-600"
        type="text"
      />
</div>
        <div className="">
          <h3 className="text-sm">
            We sent your code to: <br />{" "}
          </h3>
          <h3  className="text-sm">{mail.email}</h3>
        </div>
      </div>
        <div className="border-t-[1px] mt-4 flex justify-between items-center">
        <button disabled={loader} onClick={sendCodeAgain} className="hover:underline duration-100">Did not get a code?</button>
<div className="flex gap-2">
    <Link href='./login'>
    <h2 className="bg-gray-200 w-fit mt-1 text-gray-500 duration-500 border py-1 text-center cursor-pointer rounded-md px-4 text-sm">Cancel</h2></Link>
<div
          onClick={handleOtp}
          className="bg-[#3e19fa] hover:bg-violet-600 w-fit mt-1 text-white duration-500 border py-1 text-center cursor-pointer rounded-md px-4 text-sm"
        >
          Continue
        </div>
</div>
        </div>
    </div>
  );
};

export default Otp;
