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
      <main className="md:px-10 mt-4">
        <p className="text-center md:px-20 text-md">
          ইতিমধ্যে আপনারা উপলব্ধি করতে পারছেন যে ইডুপ্লাসপ্লাস একটি কমিউনিটি
          ভিত্তিক এম,সি,কিউ সেয়ারিং এপ্লিকেশনে হতে যাচ্ছে যেখানে আপনার এম,সি,কিউ
          প্রশ্নের যথাযথ উত্তর দেওয়ার মাধ্যমে নিজেদেরকে বিসিএস এর প্রলিমিনারী সহ
          অসংখ্য পরীক্ষার প্রস্তুতি নিতে পারবেন। এখানে একটি একাউন্ট সক্রিয় করেই
          আপনি নিজেকে জাস্টিফাই করতে পারবেন। তাই আর বিলম্ব না করে নিচের নিয়মগুলো
          অনুসরণ করে মাত্র ৫ মিনিটের মধ্যেই আপনি ইডুপ্লসপ্লাস পরিবারের একজন
          সদস্য হয়ে নিজেকে চাকরি পরীক্ষার জন্য প্রস্তুত করেন।
        </p>
        <div className="md:flex justify-between items-center gap-4 md:gap-10 mt-6">
          <p className="md:w-1/2 px-4 md:px-10">
            <span className="text-[#3E19FA] font-bold text-lg">1)</span> প্রথমে
            আপনাকে মোবাইল এর জন্য এপ্লিকেশনি{" "}
            <a
              href="/app/base.apk" // path inside /public
              download // forces download instead of opening
              className="px-2 py-1 bg-[#623bff] text-white hover:bg-[#4719ff]"
            >
              ডাউনলোড
            </a>{" "}
            দিয়ে ইনস্টল করে নিতে হবে। এর পর আপনাকে উপরে ডানদিকে "Join" বাটনে
            ক্লিক অথবা{" "}
            <span
              onClick={openaNewWindow}
              className="text-[#3E19FA] font-bold cursor-pointer"
            >
              এখানে ক্লিক
            </span>{" "}
            করে রেজিস্ট্রেশন পেজে যেতে হবে। <br /> <br />  রেজিষ্ট্রেশন পেজের চিত্র অনুযায়ী আপনাকে ইনপুট বক্সগুলোতে আপনার <br /> <span className="font-bold">I) নাম (ইংরেজিতে)</span> <br /> <span className="font-bold">II) আপনার ইমেইল(অবশ্যই রিয়েল হতে হবে)</span> <br /><span className="font-bold">III) এবং নুন্যতম ৬ ডিজিটের একটি পাসওয়ার্ড দিতে হবে।</span> <br /> সর্বশেষ আপনাকে   <span className="font-bold">ভেরিফাই ইমেইল বাটনে ক্লিক</span> করতে হবে। বেশ! আপনার প্রায় ৫০% কাজ  শেষ হয়ে গেল।
          </p>
          <div className="md:w-1/2">
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/register-form.jpg"
              alt="register-form"
            />
          </div>
        </div>
        <div className="md:flex justify-between items-center gap-4 md:gap-10 mt-6">
          <div className="md:w-1/2 flex gap-2">
            <img
              className="border-4 hidden border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/mail-md.jpg"
              alt="register-form"
            />
          </div>
          <p className="md:w-1/2">
            <span className="text-[#3E19FA] font-bold text-lg">2)</span> এই পর্যায়ে আপনার কাছে একটি ইমেইল চলে যাবে। তবে সেটা প্রসেসিং হতে সর্বোচ্চ ৫ মিনিট আপনাকে অপেক্ষা করতে হতে পারে। <span className="italic font-bold">কেননা ইডুপ্লাসপ্লাস এর পরিবারে আপনাকে স্বাগতম জানানোর জন্য আপনার ই-মেইলটি অরিজিনাল কিনা তা চেক করে আপনাকে ই-মেইল পাঠাতে একটু সময় নিবে।</span> অবশেষে আপনি যখন ইমেইল পাবেন সেখানে একটি বাটন থাকবে এবং সেখানে ক্লিক করলেই আপনার একাউন্ট সম্পূর্ণভাবে ওপেন হয়ে যাবে। 
          </p>
                      <img
              className="border-4 md:hidden border-gray-50/50 rounded-md"
              src="/blogs/how-to-create-an-account-in-eduplusplus/mail-md.jpg"
              alt="register-form"
            />
        </div>
        <div className="md:flex justify-between items-center gap-4 md:gap-10 mt-6">
          <p className="md:w-1/2">  <span className="text-[#3E19FA] font-bold text-lg">3)</span> 
            এরপর আপনি আপনার একটি  <span className="italic font-bold">প্রফাইল পিকচার, একটি টাইটেল এবং নিজের সম্পর্কে একটু তথ্য </span> সংযুক্ত করে নিতে হবে। আপনার কাজ শেষ এখন আপনি যে প্রশগুলো জানেন সেগুলো টিক দিতে পারেন। আপনার কতগুলো উত্তর সঠিক হয়েছে এবং কতগুলো ভুল হয়েছে সেগুলো<span className="italic font-bold">ডকুমেন্টস হিসেবে আপনার প্রফাইলের সাথে স্বয়ংক্রিয়ভাবে</span> সংযুক্ত হয়ে যাবে। <span className="italic text-amber-600">মনে রাখতে হবে, প্রতিটি প্রশ্নের জন্য আপনি একবার চান্স পাবেন যেখানে প্রথমবার আপনি সঠিক না ভুল উত্তর দিলেন তা ১ নম্বর করে প্রোফাইলের সাথে যুক্ত হবে।</span> এরপর একই প্রশ্নে একাধিকবার টিক দিলেও কোন নম্বর যুক্ত হনে না, তাই প্রতিটি প্রশ্নের উত্তর করার সময় সাবধানতা অবলম্বন করতে হবে কেননা প্রথমবারের উত্তরটা কাউন্ট হবে। আশা করি সবকিছুই আপনার কাছে স্পষ্ট হয়ে গেছে। তাই আর ধেরি কেন আজই শুরু করে দিন।
          </p>
          <div className="md:w-1/2 flex gap-2">
            <img
              className="border-4 border-gray-50/50 rounded-md"
              src="/desktop_view.jpg"
              alt="eduplusplus"
            />
          </div>
        </div>
        <div className="my-4 mt-6 md:mt-10">
          <p className="text-center"><span className="italic md:text-2xl font-bold text-amber-600">Lets download desktop app from the indicated marked at the right side</span> 
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
