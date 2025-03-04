"use client";
import { Banner } from "@/app/adsterra/Banner";
import VerticleBanner from "@/app/adsterra/VerticleBanner";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import Script from "next/script";
import React, { useState } from "react";
import { useEffect } from "react";
import bcs_exam from "@/public/bcs/bcs-exam-scene.jpg";
import mark_dist from "@/public/bcs/bcs-mark-distribution.jpg";
import LeftBar from "../components/LeftBar";

const Page = () => {
    const [scrollVal, setScrollVal] = useState(0);

    const renderAdd = () => {
      const scrollPosition = document.documentElement.scrollTop; // Vertical scroll position
      const documentHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight; // Total scrollable height
      const scrollPercent = (scrollPosition / documentHeight) * 100; // Percentage of scroll
      setScrollVal(Math.floor(scrollPercent));
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
        <div className="flex justify-between px-4 md:px-0 bg-gray-200">
          <div className="left hidden md:block w-3/12">
            <h2 className="font-semibold bg-violet-500 py-2 text-center text-white md:t-2xl">
              সূচিপত্র
            </h2>
            <LeftBar />
            {/* {
                scrollVal > 10 &&  <VerticleBanner />
            } */}
          </div>
          <div className="right md:w-9/12">
            <h1 className="font-semibold bg-violet-500 py-2 text-center text-white md:t-2xl">
              বিসিএস প্রিলিমিনারি পরীক্ষা: প্রস্তুতি এবং গুরুত্ব
            </h1>
            <div className="md:pr-20 text-gray-700 mt-4">
            {
                     ( scrollVal>=0 && scrollVal < 20) && <Banner/>
                }
              <p>
                বিসিএস প্রিলিমিনারি পরীক্ষা বাংলাদেশ সিভিল সার্ভিসে প্রবেশের
                প্রথম ধাপ। এটি দেশের সবচেয়ে প্রতিযোগিতামূলক পরীক্ষাগুলোর মধ্যে
                অন্যতম। প্রিলিমিনারি পরীক্ষার মাধ্যমে প্রার্থীদের প্রাথমিক
                যোগ্যতা যাচাই করা হয় এবং এর ভিত্তিতেই তারা পরবর্তী ধাপের জন্য
                নির্বাচিত হন। এই পরীক্ষার গুরুত্ব, প্রস্তুতি এবং এর মুখোমুখি
                হওয়ার সঠিক কৌশল নিয়ে আলোচনা করা অত্যন্ত প্রাসঙ্গিক।
              </p>
              <Image className="md:w-8/12 rounded-sm mt-4" src={bcs_exam } />
              <div className="content ml-2 mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                  প্রিলিমিনারি পরীক্ষার কাঠামো
                </h3>
                <p className="my-2">
                  বিসিএস প্রিলিমিনারি পরীক্ষা একটি বহুনির্বাচনী প্রশ্ন (MCQ)
                  ভিত্তিক পরীক্ষা। এতে মোট ২০০ নম্বরের প্রশ্ন থাকে, যা দুই
                  ঘণ্টার মধ্যে সমাধান করতে হয়। প্রশ্নগুলো বিভিন্ন বিষয়ের ওপর
                  ভিত্তি করে তৈরি, যেমন:
                </p>
                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                  <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold text-gray-800">
                      বাংলা ভাষা ও সাহিত্য:
                    </span>
                    ৩৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      ইংরেজি ভাষা ও সাহিত্য
                    </span>{" "}
                    ৩৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      {" "}
                      বাংলাদেশ বিষয়াবলি:
                    </span>
                    ৩০ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      আন্তর্জাতিক বিষয়াবলি:
                    </span>
                    ২০ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা:
                    </span>
                    ১০ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      সাধারণ বিজ্ঞান:
                    </span>{" "}
                    ১৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      কম্পিউটার ও তথ্যপ্রযুক্তি:
                    </span>
                    ১৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      গাণিতিক যুক্তি:
                    </span>
                    ১৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      মানসিক দক্ষতা:
                    </span>
                    ১৫ নম্বর
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                      নৈতিকতা, মূল্যবোধ ও সুশাসন:
                    </span>
                    ১০ নম্বর
                  </li>
                </ul>
                  </div>
                 <Image className="md:w-1/2" src={mark_dist}/>
                </div>
                <p className="my-2">
                  প্রতিটি ভুল উত্তরের জন্য ০.৫০ নম্বর কাটা হয়, যা পরীক্ষাকে আরও
                  চ্যালেঞ্জিং করে তোলে।
                </p>
              </div>
              <div className="content mt-4">
                {
                     ( scrollVal>20 && scrollVal < 50) && <Banner/>
                }
                <h3 className="font-semibold text-gray-800 mt-2">
                  প্রস্তুতির কৌশল
                </h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-semibold text-gray-800">
                    সিলেবাস বিশ্লেষণ:
                    </span>
                    বিসিএস প্রিলিমিনারি পরীক্ষার প্রস্তুতি শুরু করার আগে সিলেবাস ভালোভাবে বুঝে নেয়া জরুরি। কোন কোন টপিক বেশি গুরুত্বপূর্ণ এবং বেশি নম্বর বরাদ্দ পায়, তা বুঝে পড়াশোনা করা উচিত।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                    পরিকল্পিত পড়াশোনা:
                    </span>
                    প্রতিদিন নির্দিষ্ট সময় বরাদ্দ করে প্রতিটি বিষয়ের জন্য আলাদা পরিকল্পনা করা দরকার। বাংলা ও ইংরেজিতে বেশি সময় দেয়ার পাশাপাশি সাধারণ জ্ঞান ও গণিতের অনুশীলন নিয়মিত করতে হবে।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                    বিগত প্রশ্নপত্র অনুশীলন:
                    </span>
                    বিগত বছরের প্রশ্নপত্র এবং মডেল টেস্ট সমাধানের মাধ্যমে পরীক্ষার ধরন সম্পর্কে ধারণা পাওয়া যায় এবং সময় ব্যবস্থাপনার দক্ষতা বাড়ে।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                    নতুন তথ্য সংগ্রহ:
                    </span>
                    সাম্প্রতিক সাধারণ জ্ঞান, জাতীয় ও আন্তর্জাতিক ঘটনা এবং বিজ্ঞান ও প্রযুক্তি সম্পর্কিত তথ্য নিয়মিত আপডেট করতে হবে।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">
                    সময় ব্যবস্থাপনা:
                    </span>
                    পরীক্ষার হলে দ্রুততার সঙ্গে সঠিক উত্তর দেয়ার দক্ষতা অর্জনের জন্য সময় ব্যবস্থাপনার অনুশীলন জরুরি।
                  </li>
                </ul>
              </div>

              <div className="content mt-4">
                <h3 className="font-semibold text-gray-800 mt-2">
                পরীক্ষার গুরুত্ব
                </h3>
                <p className="my-2">
                প্রিলিমিনারি পরীক্ষার প্রধান লক্ষ্য হলো প্রার্থীদের যোগ্যতা প্রমাণের জন্য একটি নিরপেক্ষ ও কার্যকর প্ল্যাটফর্ম তৈরি করা। এই পরীক্ষার মাধ্যমে প্রার্থী তার জ্ঞান, দক্ষতা এবং দ্রুত চিন্তা করার ক্ষমতা প্রদর্শন করেন।
                </p>
                <p className="my-2">
                এছাড়া, প্রিলিমিনারি পরীক্ষায় উত্তীর্ণ হওয়ার মাধ্যমে প্রার্থী লিখিত পরীক্ষায় অংশগ্রহণের সুযোগ পান, যা সিভিল সার্ভিস ক্যাডারে প্রবেশের পথে একটি বড় সাফল্য।
                </p>
              </div>

              <div className="content">
                <h3 className="font-semibold text-gray-800 mt-2">
                  চ্যালেঞ্জ এবং উত্তরণের উপায়
                </h3>
                <p className="mt-2">
                  বিসিএস প্রিলিমিনারি পরীক্ষায় সফল হওয়ার প্রধান চ্যালেঞ্জ হলো বিশাল প্রতিযোগিতা এবং সঠিক প্রস্তুতির অভাব। হাজার হাজার প্রার্থী এই পরীক্ষায় অংশগ্রহণ করে, কিন্তু মাত্র একটি ছোট অংশ পরবর্তী ধাপে উত্তীর্ণ হয়।
                </p>
                <ul className="text-sm list-disc pl-6 space-y-2">
                  <li>
                     প্রার্থীদের মানসিক চাপ সামলানোর জন্য ধৈর্যশীল হতে হবে।
                  </li>
                  <li>
                  আত্মবিশ্বাস ধরে রাখতে হবে এবং প্রস্তুতির সময় সঠিক কৌশল প্রয়োগ করতে হবে।
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800">ইংরেজি:</span>
                    গ্রামার এবং রচনা চর্চা।
                  </li>
                  <li>
                  শারীরিক ও মানসিক সুস্থতার জন্য পর্যাপ্ত বিশ্রাম নেয়া এবং স্বাস্থ্যকর জীবনযাপন বজায় রাখা অত্যন্ত গুরুত্বপূর্ণ।
                  </li>
                </ul>
              </div>

              <div className="content mt-4">
                <p className="mt-2 mb-10">
                বিসিএস প্রিলিমিনারি পরীক্ষা কেবলমাত্র একটি প্রাথমিক ধাপ হলেও এটি পুরো সিভিল সার্ভিস পরীক্ষার ভিত্তি স্থাপন করে। কঠোর পরিশ্রম, সঠিক পরিকল্পনা এবং ধৈর্যের মাধ্যমে একজন প্রার্থী এই পরীক্ষায় সফল হতে পারেন। তাই প্রিলিমিনারি পরীক্ষাকে হালকাভাবে না নিয়ে সর্বোচ্চ মনোযোগ এবং নিষ্ঠার সঙ্গে প্রস্তুতি নেয়া উচিত। এটি সাফল্যের পথে প্রথম এবং সবচেয়ে গুরুত্বপূর্ণ পদক্ষেপ।
                </p>
              </div>
            </div>
            {scrollVal > 50 && <Banner className="w-full" />}

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
