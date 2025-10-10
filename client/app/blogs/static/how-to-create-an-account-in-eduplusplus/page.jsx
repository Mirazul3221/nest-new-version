"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { viewurl } from "@/app/config";
import React from "react";

const Page = () => {
  const openaNewWindow = () => {
    window.open(`${viewurl}/register`);
  };
  return (
    <div>
      <Header />
      <h1 className="md:text-3xl text-center text-white py-5 md:py-10 bg-[#3E19FA]">
        How to create an account inside eduplusplus
      </h1>
      <main className="px-4 md:px-10 mt-4">
        <div className="md:flex justify-between items-center">
          <p className="md:w-1/2">
            <span className="text-[#3E19FA] font-bold text-lg">1)</span> First
            of all you need to download and install{" "}
            <a
              href="/app/base.apk" // path inside /public
              download // forces download instead of opening
              className="px-2 py-1 bg-[#623bff] text-white hover:bg-[#4719ff]"
            >
              android app
            </a>{" "}
            then Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            enim veritatis amet eos aperiam, molestiae quaerat dolore? Dolorem
            optio veniam cupiditate molestiae soluta. Temporibus nostrum
            doloremque neque fugit, delectus molestias.
            <span
              onClick={openaNewWindow}
              className="text-[#3E19FA] font-bold cursor-pointer"
            >
              Click
            </span>{" "}
            kare naw
          </p>
          <div className="md:w-1/2">
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/register-form.jpg"
              alt="register-form"
            />
          </div>
        </div>
        <div className="md:flex justify-between items-center">
          <div className="md:w-1/2 flex gap-2">
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/mail-md.jpg"
              alt="register-form"
            />
          </div>
          <p className="md:w-1/2">
            <span className="text-[#3E19FA] font-bold text-lg">2)</span> First
            of all you need to download and install{" "}
            <a
              href="/app/base.apk" // path inside /public
              download // forces download instead of opening
              className="px-2 py-1 bg-[#623bff] text-white hover:bg-[#4719ff]"
            >
              android app
            </a>{" "}
            then Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            enim veritatis amet eos aperiam, molestiae quaerat dolore? Dolorem
            optio veniam cupiditate molestiae soluta. Temporibus nostrum
            doloremque neque fugit, delectus molestias.
            <span
              onClick={openaNewWindow}
              className="text-[#3E19FA] font-bold cursor-pointer"
            >
              Click
            </span>{" "}
            kare naw
          </p>
        </div>
        <div className="md:flex justify-between items-center">
          <p className="md:w-1/2">
            <span className="text-[#3E19FA] font-bold text-lg">3)</span> First
            of all you need to download and install
            then Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            enim veritatis amet eos aperiam, molestiae quaerat dolore? Dolorem
            optio veniam cupiditate molestiae soluta. Temporibus nostrum
            doloremque neque fugit, delectus molestias.
          </p>
                    <div className="md:w-1/2 flex gap-2">
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/desktop_view.jpg"
              alt="eduplusplus"
            />
          </div>
        </div>
        <div className="my-4">
          <p>
            <span className="text-[#3E19FA] font-bold text-lg">4)</span> First
            of all you need to download and install
            then Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            enim veritatis amet eos aperiam, molestiae quaerat dolore? Dolorem
            optio veniam cupiditate molestiae soluta. Temporibus nostrum
            doloremque neque fugit, delectus molestias.
          </p>
                    <div>
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/desktop-app.jpg"
              alt="eduplusplus"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
