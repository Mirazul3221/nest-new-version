"use client";
import axios from "axios";
import React, {useState } from "react";
import loaderImg from "@/public/loader.gif"
import logo from '@/public/bcs-logo.png'
import { useRouter } from "next/navigation";
import { baseurl } from "../config";
import Image from "next/image";
const RecoveryPass = ({mail}) => {
  //get userinfo from global data====================
  const [loader,setLoader] = useState(false)
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [pass,setPass] = useState('');

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
      setLoader(true)
      let uri = `${baseurl}/auth/updatepass`;
      const { data } = await axios.post(uri, {email:mail.email,password:pass});
      setAlert(data.msg);
        setLoader(false)
        router.push("/login")
    } catch (error) {
      console.log(error);
      setAlert(error.response?.data.message);
      setLoader(false)
    }
  };
  return (
    <div>
      <div className="p-8 md:w-[400px] md:h-[74vh]">
        <form onSubmit={handlesubmit}>
          <div>
            <Image className="w-32 mx-auto mb-8" src={logo} alt="logo"/>
            <h2 className={`text-rose-300`}>{alert}</h2>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                onChange={(e)=>setPass(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="******"
                required
              />
            </div>
            <div className="mb-2">

            </div>
            <button
            disabled={loader}
              type="submit"
              className={`mt-2 ${loader ? "":"bg-[#3e19fa] hover:bg-violet-600 text-white duration-500"} border py-2 rounded-md w-full flex justify-center items-center`}>
              {loader ? <div className="flex justify-center items-center gap-2"><h2>Loading</h2> <Image src={loaderImg} className="w-5" alt="Loader"/></div>: "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPass;
