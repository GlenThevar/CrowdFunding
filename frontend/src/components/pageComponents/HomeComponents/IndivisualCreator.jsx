import React, { useContext, useEffect, useState } from "react";
import { Link2, Mail, UserPlus, UserRoundCheck } from "lucide-react";

import { AppContext } from "../../../context/AppContext";

const IndivisualCreator = () => {
  const { theme } = useContext(AppContext);

  const [isFollow, setIsFollow] = useState(false);

  const FollowUser = () => {
    setIsFollow((isFollow) => !isFollow);
  };

  useEffect(() => {
    console.log(isFollow);
  }, [isFollow]);

  return (
    <div className="flex flex-col gap-8">
      <div className="font-heading text-base sm:text-2xl font-medium">
        About the creator
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`rounded-full ${
            theme == "black"
              ? "hover:border-1 border-white"
              : "hover:border-1 border-black"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
            className={`rounded-full w-20 hover:cursor-pointer `}
            alt=""
          />
        </div>
        <div>
          <p className="font-heading text-sm sm:text-base">William Moore</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex-col justify-start">
          <p className="font-heading text-base sm:text-lg">
            6 created projects{" "}
          </p>
          <p className="font-heading text-xs sm:text-sm">1 backed projects</p>
        </div>
        <div className="flex-col justify-start">
          <p className="font-heading text-base sm:text-lg">Oct 18 2025</p>
          <p className="font-heading text-xs sm:text-sm">Last Login</p>
        </div>
        <div className="flex-col">
          <p className="font-heading text-base sm:text-lg">June 2023</p>
          <p className="font-heading text-xs sm:text-sm">Account Created</p>
        </div>
      </div>
      <div className="w-full border-b-1 border-base-300"></div>
      <div className="font-subheading text-xs sm:text-sm">
        <p>
          William Moore is a storyteller, actor, writer and musician who has
          built a dedicated following of over 375,000 across social media. One
          of his most recognisable styles - blending traditional rhymes,
          riddles, and folklore with a dark, atmospheric twist - has captivated
          audiences worldwide. He has successfully crowdfunded multiple
          projects, including The Grimoire of Forgotten Fairytales and its
          haunting follow-up, The Tome of Terrible Truths
        </p>
        <br />
        <p>
          As a founding member of Stone Fable, a storytelling collective devoted
          to immersive, high quality narratives, he helped bring One For Sorrow:
          Whispers in the Mist to life last year and in 2025, its chilling
          sequel, One For Sorrow: The Malice Beneath. Whether through books,
          games, audio dramas or eerie short-form content, his work transforms
          the familiar into something beautifully unsettling.
        </p>
      </div>
      <div className="flex gap-5">
        <button
          className={`btn btn-outline btn-primary py-2 px-3 sm:py-6 sm:px-10 rounded-sm   ${
            theme == "black"
              ? "text-white hover:text-black hover:bg-white"
              : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
          } shadow-sm flex gap-2 items-center justify-center`}
        >
          <Mail strokeWidth={1} className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="font-heading text-xs sm:text-sm font-light">Message</p>
        </button>
        <button
          className={`btn btn-outline btn-primary font-m py-2 px-3 sm:py-6 sm:px-10 rounded-sm   ${
            theme == "black"
              ? "text-white hover:text-black hover:bg-white"
              : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
          } shadow-sm flex gap-2 items-center justify-center`}
          onClick={FollowUser}
        >
          {isFollow ? (
            <div className="flex gap-2">
              <UserRoundCheck
                strokeWidth={1}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <p className="font-heading text-xs sm:text-sm font-light">
                Following
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <UserPlus strokeWidth={1} className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="font-heading text-xs sm:text-sm font-light">
                Follow
              </p>
            </div>
          )}
        </button>
      </div>

      <div className="flex flex-wrap ">
        <div
          className={`flex items-center gap-1 p-1 ${
            theme == "black" ? "hover:border-b-1" : "hover:border-b-1"
          }`}
        >
          <Link2 className="w-4 h-4" />
          <a
            href="https://www.williammooremusic.com"
            className="font-subheading text-xs sm:text-sm"
          >
            Music
          </a>
        </div>
        <div
          className={`flex items-center gap-1 p-1 ${
            theme == "black" ? "hover:border-b-1" : "hover:border-b-1"
          }`}
        >
          <Link2 className="w-4 h-4" />
          <a
            href="https://linktr.ee/williammooremusic"
            className="font-subheading text-xs sm:text-sm"
          >
            LinkTree
          </a>
        </div>
        <div
          className={`flex items-center gap-1 p-1 ${
            theme == "black" ? "hover:border-b-1" : "hover:border-b-1"
          }`}
        >
          <Link2 className="w-4 h-4" />
          <a
            href="https://www.tiktok.com/notfound"
            className="font-subheading text-xs sm:text-sm "
          >
            TikTok
          </a>
        </div>
        <div
          className={`flex items-center gap-1 p-1 ${
            theme == "black" ? "hover:border-b-1" : "hover:border-b-1"
          }`}
        >
          <Link2 className="w-4 h-4" />
          <a
            href="https://www.instagram.com/williammooremusic/"
            className="font-subheading text-xs sm:text-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndivisualCreator;
