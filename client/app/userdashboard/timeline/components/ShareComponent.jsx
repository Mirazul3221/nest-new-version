import React, { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa';
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import messanger from "@/public/share-icone/messanger.png";
import whatsapp from "@/public/share-icone/whatsapp.png";
import linkedin from "@/public/share-icone/linkedin.png";
import gmail from "@/public/share-icone/gmail.png";
import telegram from "@/public/share-icone/telegram.png";
import twitter from "@/public/share-icone/twitter.png";
import pinterest from "@/public/share-icone/pinterast.png";
import facebook from "@/public/share-icone/fb.png";
import CopyToClipboard from "react-copy-to-clipboard";
import { viewurl } from '@/app/config';
import Image from 'next/image';

const ShareComponent = ({share,slug,id}) => {
      const [copy, setCopy] = useState("copy");
  return (
              <div
                className={`fixed shairBlankPoint z-50 top-0 backdrop-blur-sm left-0 w-screen h-screen bg-gray-500/30 items-end flex justify-start md:justify-center md:items-center ${
                  share ? "scale-100" : "scale-0"
                } duration-100`}
              >
                <div
                  className={`md:w-1/2 w-full ${
                    share ? "translate-y-0" : "translate-y-96"
                  } md:translate-y-0 duration-500 bg-white rounded-md p-4 md:p-10`}
                >
                  <h2 className="text-center pb-2 border-b-[1px]">
                    Share With Your Friends
                  </h2>
                  <div className="grid grid-cols-3 w-2/3 md:w-full mx-auto md:grid-cols-7 pt-2 justify-center">
                    <div className="md:hidden">
                      <FacebookMessengerShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={messanger}
                          alt="Facebook-messanger"
                        />
                      </FacebookMessengerShareButton>
                    </div>
                    <div className="hidden md:block">
                      <FacebookShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-12 md:h-12 w-10 h-10"
                          src={facebook}
                          alt="Facebook-messanger"
                        />
                      </FacebookShareButton>
                    </div>
                    <div>
                      <WhatsappShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={whatsapp}
                          alt="Whatsapp"
                        />
                      </WhatsappShareButton>
                    </div>
                    <div>
                      <EmailShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={gmail}
                          alt="gmail"
                        />
                      </EmailShareButton>
                    </div>
                    <div>
                      <LinkedinShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={linkedin}
                          alt="Linkedin"
                        />
                      </LinkedinShareButton>
                    </div>
                    <div>
                      <TwitterShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={twitter}
                          alt="Twitter"
                        />
                      </TwitterShareButton>
                    </div>
                    <div>
                      <TelegramShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={telegram}
                          alt="Telegram"
                        />
                      </TelegramShareButton>
                    </div>
                    <div>
                      <PinterestShareButton
                        url={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <Image
                          className="md:w-16 md:h-16 w-10 h-10"
                          src={pinterest}
                          alt="pinterest"
                        />
                      </PinterestShareButton>
                    </div>
                    <div className="md:hidden md:w-16 md:h-16 w-10 h-10 bg-violet-700 rounded-full flex justify-center items-center">
                      <CopyToClipboard
                        text={`${viewurl}/${
                          slug ? slug : id
                        }`}
                      >
                        <button
                          className="p-4 text-white"
                          onClick={() => {
                            setCopy("Copied!");
                            setTimeout(() => {
                              setCopy("copy");
                            }, 1000);
                          }}
                        >
                          {copy == "copy" ? <FaRegCopy size={30} color="fff" /> : copy}
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
        
                  <div className="mt-4 hidden py-2 px-4 border border-violet-700 rounded-md text-violet-700 md:flex gap-2 justify-between items-center">
                    <div>
                      ${viewurl}/
                      {slug ? slug : id}
                    </div>
                    <CopyToClipboard
                      text={`${viewurl}/singlequestion/${
                        slug ? slug : id
                      }`}
                    >
                      <button
                        className="p-4"
                        onClick={() => {
                          setCopy("Copied!");
                          setTimeout(() => {
                            setCopy("copy");
                          }, 1000);
                        }}
                      >
                        {copy == "copy" ? <FaRegCopy size={25} /> : copy}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>  )
}

export default ShareComponent