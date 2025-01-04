"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import loaderImg from "@/public/loader.gif";
import logo from "@/public/bcs-logo.png";
import { useRouter } from "next/navigation";
import storeContext from "../global/createContex";
import { baseurl } from "../config";
import Image from "next/image";
import Link from "next/link";
const ForgetPass = ({ setKey, setMail,getMyProfile }) => {
  //get userinfo from global data====================
  const [loader, setLoader] = useState(false);
  const { dispatch } = useContext(storeContext);
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [submitValue, setSubmitValue] = useState({
    email: "",
  });

  const targetElement = (e) => {
    setSubmitValue({
      ...submitValue,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();

    // redirect("/dashboard")
    try {
      setLoader(true);
      // let uri = `${baseurl}/auth/sendmail`;
      // const { data } = await axios.post(uri, submitValue);
      // // setTimeout(() => {
      // //   setKey("otpbox");
      // // }, 1000);
      // // getmyprofile
     const userDetails = await axios.post(`${baseurl}/auth/getmyprofile`, submitValue);
     if (userDetails) {
      setKey("myprofile");
     }
     getMyProfile(userDetails.data)
      setMail(submitValue);
      setAlert(data.msg);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setAlert(error.response?.data.message);
      setLoader(false);
      setAlert(error.message);
    }
  };

  return (
    <div>
      <div className="p-8 md:w-[400px] md:h-[74vh]">
        <form onSubmit={handlesubmit}>
          <div>
            <Image className="w-32 mx-auto mb-8" src={logo} alt="logo" />
            <h2 className={`text-rose-300`}>{alert}</h2>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                onChange={targetElement}
                value={submitValue.email}
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-2"></div>
            <div className="flex justify-between gap-4">
              <div className="mt-2 bg-gray-100 border py-2 rounded-md w-full flex justify-center items-center">
                <Link href={"/"}>
                  <h2 className="w-full h-full">Cancel</h2>
                </Link>
              </div>
              <button
                disabled={loader}
                type="submit"
                className={`mt-2 ${
                  loader
                    ? ""
                    : "bg-violet-700 hover:bg-violet-600 text-white duration-500"
                } border py-2 rounded-md w-full flex justify-center items-center`}
              >
                {loader ? (
                  <div className="flex justify-center items-center gap-2">
                    <h2>Loading</h2>{" "}
                    <Image src={loaderImg} className="w-5" alt="Loader" />
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
