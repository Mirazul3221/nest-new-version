"use client";
import { Banner } from "@/app/adsterra/Banner";
import VerticleBanner from "@/app/adsterra/VerticleBanner";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React, { useState } from "react";
import { useEffect } from "react";
import bcs_banner from  '@/public/bcs-prostuti.jpg'
import LeftBar from "../components/LeftBar";
import Link from "next/link";
import { viewurl } from "@/app/config";

const Page = () => {
  const [scrollVal, setScrollVal] = useState(false);

  const renderAdd = (e) => {
    const scrollPosition = window.scrollY; // Vertical scroll position
    setScrollVal(scrollPosition);
  };
  useEffect(() => {
    window.addEventListener("scroll", renderAdd);
    return () => {
      window.removeEventListener("scroll", renderAdd);
    };
  }, []);
  console.log(scrollVal)
  return (
    <>
      <div>
        <Header />
        <div className="py-1 bg-slate-300"></div>
        <div className="flex justify-between bg-gray-100">
          <div className="left hidden md:block w-3/12">
            <h2 className="font-semibold bg-violet-500 py-2 text-center text-white md:t-2xl">
              সূচিপত্র
            </h2>
            <LeftBar/>
            {/* {
                scrollVal > 10 &&  <VerticleBanner />
            } */}
           
          </div>
          <div className="right md:w-9/12">
            <h1 className="font-semibold bg-violet-500 py-2 text-center text-white md:t-2xl">
              বিসিএস প্রস্তুতির সঠিক পথনির্দেশ
            </h1>
            <div className="md:pr-20 text-gray-700 mt-4">
              <p>
                বিসিএস পরীক্ষা বাংলাদেশের সবচেয়ে প্রতিযোগিতামূলক পরীক্ষাগুলোর
                মধ্যে অন্যতম। এটি শুধু একটি পরীক্ষা নয়, বরং একজন প্রার্থীর
                জীবনের দৃষ্টিভঙ্গি, অধ্যবসায় এবং সঠিক পরিকল্পনার প্রতিফলন।
                বিসিএস প্রস্তুতিতে সফল হতে চাইলে কিছু নির্দিষ্ট কৌশল ও নিয়ম
                মেনে চলা জরুরি।
              </p>
              <Image className="w-full rounded-sm mt-4" src={bcs_banner}/>
              <div className="content ml-2 mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ১. লক্ষ্য স্থির করুন এবং পরিকল্পনা তৈরি করুন
                </h3>
                <p className="my-2">বিসিএস পরীক্ষা মূলত তিনটি ধাপে বিভক্ত:</p>
                <ul className="text-sm list-disc pl-6 space-y-2">
                  <li>
                      <Link className="font-semibold text-violet-500 underline" href={`${viewurl}/blogs/static/bcs-preliminary-exam`}>  প্রিলিমিনারি পরীক্ষা:</Link>
                    বেসিক জ্ঞান যাচাই করার জন্য।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      {" "}
                      রিটেন পরীক্ষা:
                    </span>{" "}
                    গভীরতর বিষয়ভিত্তিক বিশ্লেষণ প্রয়োজন।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      {" "}
                      মৌখিক পরীক্ষা:
                    </span>{" "}
                    ব্যক্তিত্ব ও দক্ষতা যাচাই।
                  </li>
                </ul>
                <p className="my-2">
                  প্রতিটি ধাপের জন্য আলাদা পরিকল্পনা করুন। প্রতিদিনের পড়াশোনার
                  সময় ভাগ করে নিন এবং সেই অনুযায়ী পড়ুন।
                </p>
              </div>
              <div className="content"></div>
              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ২. সিলেবাস ভালোভাবে বুঝুন
                </h3>
                <p className="my-2">
                  {" "}
                  সিলেবাস অনুযায়ী পড়াশোনা করলে সময় নষ্ট কম হয়। সিলেবাসের
                  প্রতিটি বিষয়ভিত্তিক অধ্যায় পড়ুন এবং গুরুত্বপূর্ণ অংশ
                  চিহ্নিত করুন।
                </p>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ৩. সময় ব্যবস্থাপনা শিখুন
                </h3>
                <p className="my-2">
                  আপনার দৈনন্দিন রুটিনের মধ্যে পড়াশোনা, রিভিশন এবং বিশ্রামের
                  জন্য নির্দিষ্ট সময় রাখুন। পরীক্ষার দিন সঠিক সময়ে প্রস্তুত
                  থাকতে প্র্যাকটিস সেট সমাধান করুন।
                </p>
              </div>

              <div className="content">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ৪. ভালো বই এবং রিসোর্স নির্বাচন করুন
                </h3>
                <p className="mt-2">
                  বিসিএস পরীক্ষার জন্য বিভিন্ন মানসম্পন্ন বই বাজারে পাওয়া যায়।
                  প্রয়োজনীয় বিষয়ে ফোকাস করতে নিম্নলিখিত বইগুলো পড়তে পারেন:
                </p>
                <ul className="text-sm list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold text-gray-800">
                      সাধারণ জ্ঞান:{" "}
                    </span>{" "}
                    বাংলাদেশ ও বিশ্বপরিচয়।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      {" "}
                      বাংলা ভাষা ও সাহিত্য:
                    </span>
                    সৃজনশীল বই।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">ইংরেজি:</span>
                    গ্রামার এবং রচনা চর্চা।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">গণিত:</span>
                    সুত্র ও সমস্যার সমাধান।
                  </li>
                </ul>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ৫. রুটিনমাফিক পরীক্ষা দিন
                </h3>
                <p className="mt-2">
                  নিয়মিত মডেল টেস্ট দিন এবং আপনার ভুলগুলো খুঁজে বের করুন।
                  ভুলগুলো ঠিক করার জন্য আলাদা সময় দিন।
                </p>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ৬. খবর এবং সাম্প্রতিক ঘটনাবলি অনুসরণ করুন
                </h3>
                <p className="mt-2">
                  বর্তমান বিশ্বের গুরুত্বপূর্ণ ঘটনা সম্পর্কে জ্ঞান অর্জন করুন।
                  দৈনিক পত্রিকা পড়া এবং খবর শোনা অভ্যাস করুন।
                </p>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  ৭. মানসিক চাপ নিয়ন্ত্রণ করুন
                </h3>
                <p className="mt-2">
                  পড়াশোনার পাশাপাশি নিজের মানসিক ও শারীরিক স্বাস্থ্যের প্রতি
                  নজর দিন। নিয়মিত ব্যায়াম করুন, পুষ্টিকর খাবার খান এবং যথেষ্ট
                  ঘুমান।
                </p>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">উপসংহার</h3>
                <p className="mt-2 mb-10">
                  বিসিএস পরীক্ষায় সফল হওয়ার জন্য ধৈর্য, অধ্যবসায় এবং সঠিক
                  পরিকল্পনা অপরিহার্য। প্রতিদিনের ছোট ছোট প্রচেষ্টাই বড় সাফল্য
                  বয়ে আনে। একাগ্রতা এবং আত্মবিশ্বাস বজায় রেখে এগিয়ে যান।
                  আপনার সফলতা কামনা করছি!
                </p>
              </div>
            </div>
            {scrollVal > 300 && <Banner className="w-full" />}

            <Script
              type="text/javascript"
              src="//pl23641250.profitablecpmrate.com/9d/dd/06/9ddd062e14b034f4d6043be8bf0a1f91.js"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
