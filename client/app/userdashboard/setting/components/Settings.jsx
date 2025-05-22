"use client";
import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BiWorld } from "react-icons/bi";
import { BsAndroid2 } from "react-icons/bs";
import { FaApple, FaChrome, FaEdge } from "react-icons/fa";
import { FaLocationDot, FaMobileScreen } from "react-icons/fa6";
import { GrFirefox } from "react-icons/gr";
import { IoGitNetworkSharp, IoLogoWindows } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import ProfileCropper from "../../components/ProfileCropper";
import { commonLogout, maskEmail } from "../../components/common";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Settings = ({ userData }) => {
  const { store, dispatch } = useStore();
  const [openName, setOpenName] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [mail, setMail] = useState(null);
  const [settingData, setSettingData] = useState(null);
  const [openEmail, setOpenEmail] = useState(false);
  const [openEmailVarifiedWindow, setOpenEmailVarifiedWindow] = useState(false);
  const [loading01, setLoading01] = useState(false);
  const [getOtp, setGetOpt] = useState();
  const [otpAlert, setOtpAlert] = useState("");
  const otpBoxRef = useRef(null);
  useEffect(() => {
    setMail(maskEmail(userData?.email));
  }, []);
  const fetchSettingData = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/login-status/all`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setSettingData(data);
      // Do something with `data` here (e.g., update state)
    } catch (error) {
      console.error("Error fetching data:", error);
      commonLogout(dispatch, error);
    }
  };

  useEffect(() => {
    fetchSettingData();
  }, []);
  const deleteSession = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/login-status/${id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      const filterData = settingData.filter((data) => data._id !== id);
      setSettingData(filterData);
      toast(data);
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

  const handleEmailVarifiedWindow = (e) => {
    e.preventDefault();
    setLoading01(true);
    setTimeout(() => {
      setLoading01(false);
      if (mail.includes("***")) {
        toast.error("Email is not valid!");
        return;
      }
      setOpenEmailVarifiedWindow(true);
    }, 1000);
  };

  const handleCatchOtp = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/auth/send-mail-to-reset-email`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setGetOpt(data);
      otpBoxRef.current?.focus();
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };

  const handleMatchOtp = (e) => {
    const storeValue = e.target.value;
    if (getOtp == storeValue) {
      setOtpAlert("Otp Matched");
      handleUpdateEmail();
    } else {
      if (storeValue.length > 3 && storeValue.length < 5) {
        setOtpAlert("Wrong Otp!");
      } else {
        setOtpAlert("");
      }
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const { data } = await axios.post(
        `${baseurl}/auth/update-email`,
        { email: mail },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast('Email Update Successfully');
       setOpenEmailVarifiedWindow(false);
       setGetOpt(null)
       setOpenEmail(false)
       setOtpAlert('')
    } catch (error) {
      commonLogout(dispatch, error);
    }
  };
  return (
    <div className="w-full h-full text-gray-700">
      <ToastContainer />
      <div className="bg-white rounded-md border px-6 py-4">
        <h5 className="font-semibold md:text-2xl mb-3 text-gray-700">
          Personal Info
        </h5>
        <div className="w-fit mx-auto">
          <ProfileCropper name={userData?.name} profile={userData?.profile} />
        </div>
        <div className="w-fit mx-auto text-center mt-2">
          <label
            onClick={() => setOpenName(true)}
            title="Click here to update name"
            className={`text-2xl cursor-pointer ${
              openName ? "hidden" : "block"
            }`}
            htmlFor="update_name"
          >
            {userData?.name}
          </label>
          <div
            className={`${
              openName ? "block" : "hidden"
            } flex gap-2 items-center`}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="update_name"
              value={name}
            />
            <div
              onClick={() => setOpenName(false)}
              className="px-3 py-1 bg-gray-100 rounded-md"
            >
              Cancel
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-md">Save Change</div>
          </div>
        </div>

        <div className="w-2/3 mx-auto">
          <div className="mt-5 md:flex justify-center w-full gap-6">
            <div className="border p-4 w-1/2 shadow-md">
            <div >
              <h5>Change Email</h5>
              <form onSubmit={handleEmailVarifiedWindow}>
                <input
                  required
                  onChange={(e) => setMail(e.target.value)}
                  onFocus={() => setOpenEmail(true)}
                  className="border w-full px-4 py-1 rounded-md mt-2"
                  type="email"
                  value={mail}
                />
                {openEmail && (
                  <div className="flex gap-2 mt-1 justify-end">
                    <div
                      onClick={() => setOpenEmail(false)}
                      className="px-3 py-1 bg-gray-100 rounded-md"
                    >
                      Cancel{" "}
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-gray-100 rounded-md"
                    >
                      {loading01 ? "Loading..." : "Save Change"}
                    </button>
                  </div>
                )}
              </form>

              <p className="text-rose-400 mt-1"> <span className="font-semibold">Note:</span> The email address, you will change must be valid and authentic. If you update a invalid email, you will never restore your email again. Only OTP is sent to the valid email</p>
            </div>
            </div>
            <div className="border p-4 w-1/2 flex flex-col shadow-md">
              <h5>Change Password</h5>
              <input
                className="border px-4 py-1 rounded-md w-full"
                type="password"
                value="*********"
              />
              <label className=" mt-2" htmlFor="new_pass">
                New Password
              </label>
              <input
                className="border px-4 py-1 rounded-md w-full"
                type="password"
                value="*********"
              />
              <label className=" mt-2" htmlFor="new_pass">
                Confirm Password
              </label>
              <input
                className="border px-4 py-1 rounded-md w-full"
                type="password"
                value="*********"
              />
            </div>
          </div>
          <textarea
            className="w-full h-[12vh] mt-6 shadow-md p-2 border"
            name="go"
            id="dg"
            value={userData?.description}
          ></textarea>
        </div>
      </div>
      <div className="bg-white mt-4 border px-6 py-4 mb-2">
        <h5 className="font-semibold md:text-2xl mb-3">Login Status</h5>
        {settingData &&
          settingData?.reverse().map((item, i) => {
            return (
              <div key={i} className="py-3 mb-2">
                <div className="md:flex gap-4 flex-wrap">
                  <div className="flex gap-1 items-center">
                    {item.os == "Windows" ? (
                      <IoLogoWindows size={20} />
                    ) : item.os == "Android" ? (
                      <BsAndroid2 size={18} />
                    ) : item.os == "iOS" ? (
                      <FaApple size={18} />
                    ) : (
                      <FaMobileScreen size={18} />
                    )}
                    <h6>
                      <span className="font-bold">Os:</span>
                      {item.os}
                    </h6>
                  </div>
                  <div className="flex gap-1 items-center">
                    {item.browser == "Chrome" ||
                    item.browser == "Mobile Chrome" ? (
                      <FaChrome size={20} />
                    ) : item.browser == "Firefox" ||
                      item.browser == "Mobile Firefox" ? (
                      <GrFirefox size="18" />
                    ) : item.browser == "Edge" ? (
                      <FaEdge size={18} />
                    ) : (
                      <BiWorld size={18} />
                    )}
                    <h6>
                      <span className="font-bold">Browser:</span>
                      {item.browser}
                    </h6>
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaLocationDot size={18} />
                    <h6>
                      <span className="font-bold">Location:</span>
                      {item.location}
                    </h6>
                  </div>
                  <div className="flex gap-1 items-center">
                    <IoGitNetworkSharp size={18} />
                    <h6>
                      <span className="font-bold">IP:</span>
                      {item.ipAddress}
                    </h6>
                  </div>
                </div>
                <h6>
                  <span className="font-bold">Agent:</span>
                  {item.userAgent}
                </h6>
                <div className="flex items-center gap-1 text-[12px]">
                  {item.sessionId == store.userInfo.sessionId && (
                    <div
                      onClick={() => deleteSession(item._id)}
                      className="text-green-500 cursor-pointer py-1 px-2 mt-1 border border-green-500 w-fit rounded-md"
                    >
                      THIS DEVICE
                    </div>
                  )}
                  <div
                    onClick={() => deleteSession(item._id)}
                    className="text-rose-500 cursor-pointer py-1 px-2 mt-1 border border-rose-500 w-fit rounded-md"
                  >
                    DELETE THIS SESSION
                  </div>
                </div>
              </div>
            );
          })}

        {settingData && settingData.length == 0 && (
          <p className="text-center mt-5">Data Not Found!</p>
        )}
      </div>

      {openEmailVarifiedWindow && (
        <div className="w-screen h-screen bg-black/10 fixed z-20 top-0 left-0 backdrop-blur-sm flex justify-center items-center">
          <div className="w-1/3 h-1/3 bg-white shadow-xl rounded-2xl border p-5">
            <div
              onClick={() => {
                setOpenEmailVarifiedWindow(false);
                setOtpAlert("");
              }}
              className="ml-auto w-fit cursor-pointer"
            >
              <RxCross1 size={20} />
            </div>
            {!getOtp ? (
              <div>
                <p className="text-left">
                  Hi {userData?.name.split(" ")[0]}, We are confused to change
                  your email address. To justify you identity we send a OTP code
                  to{" "}
                  <span className="font-semibold">
                    "{maskEmail(userData?.email)}"
                  </span>
                  . Keep the valid OTP code to the input field to get change
                  your email address. Do you agree?
                </p>
                <div className="flex items-center gap-2 w-fit mt-5 ml-auto">
                  <button
                    onClick={handleCatchOtp}
                    className="px-5 py-1 border bg-gray-100 rounded-md"
                  >
                    Yes, I agree!
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-left">
                  Hi {userData?.name.split(" ")[0]}, we successfully send a four
                  digit OTP to your email. Please check your mail box and put
                  the code in the suggested box.{" "}
                  <span
                    className={`${
                      otpAlert == "Wrong Otp!"
                        ? "text-rose-300"
                        : "text-green-300"
                    }`}
                  >
                    {otpAlert}
                  </span>
                  {otpAlert == "Otp Matched" && (
                    <span className="w-fit ml-auto -mt-4 flex items-center gap-2">
                      <AiOutlineLoading3Quarters
                        className="animate-spin text-gray-700 text-center"
                        size={20}
                      />{" "}
                      Processing...
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 w-fit mt-10 ml-auto">
                  <label htmlFor="otp">OTP BOX</label>
                  <input
                    ref={otpBoxRef}
                    onChange={handleMatchOtp}
                    className="border-2 w-28 px-3 py-1 rounded-md"
                    type="number"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
