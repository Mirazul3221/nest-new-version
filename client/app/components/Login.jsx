"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import loaderImg from "@/public/loader.gif";
import { useRouter } from "next/navigation";
import storeContext from "../global/createContex";
import { baseurl } from "../config";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect } from "react";
const InputForm = () => {
  //get userinfo from global data====================
  const [loader, setLoader] = useState(false);
  const { dispatch } = useContext(storeContext);
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [location, setLocation] = useState({ lon: null, lat: null });
  const [submitValue, setSubmitValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const targetElement = (e) => {
    console.log(location)
    setSubmitValue({
       location,
      ...submitValue,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();

    // redirect("/dashboard")
    try {
      setLoader(true);
      let uri = `${baseurl}/auth/user/login`;
      const { data } = await axios.post(uri, submitValue);
      setAlert(data.msg);
      if(typeof window !== 'undefined'){
        localStorage.setItem("token", data.token);
      }

      dispatch({ type: "login_success", paylod: { token: data.token } });
      router.push("/userdashboard/timeline/friends-question");
      setTimeout(() => {
        setLoader(false);
      }, 10000);
    } catch (error) {
      console.log(error);
      setAlert(error.response?.data.message);
      setLoader(false);
    }
  };

  console.log(location)
  console.log(submitValue)
  return (
    <div>
      <div className="p-8 md:w-[400px] md:h-[74vh]">
        <form onSubmit={handlesubmit}>
          <div>
           <div className="flex justify-center"> <Logo w={100}/></div>
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
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>

              <div className="bg-gray-50 relative border border-gray-300 text-gray-900 text-sm rounded-lg">
                <input
                  className="focus:ring-blue-500 rounded-lg pr-12 focus:outline-none focus:bg-white focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  id="password"
                  name="password"
                  value={submitValue.password}
                  onChange={targetElement}
                />
                <div
                  onClick={toggleShowPassword}
                  className="focus:outline-none cursor-pointer p-2 rounded-full mr-4 absolute top-[50%] transform -translate-y-[50%] right-0"
                >
                  {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </div>
              </div>
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
                  <h2>Loading</h2>
                  <Image src={loaderImg} className="w-5" alt="Loader" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <Link href='./recoverypassword'><h2 className="text-center mt-2 text-sm">Forgotten password?</h2></Link> 
        <div className="py-4 border-t-2 mt-2">
          <Link href='./register'>
            <button
              className={`bg-violet-700 hover:bg-violet-600 text-white duration-500 border py-2 rounded-md w-full flex justify-center items-center`}
            >
              <h2>Create account</h2>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
