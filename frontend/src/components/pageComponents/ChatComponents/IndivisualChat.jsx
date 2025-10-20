import React, { useContext } from "react";
import { SendHorizontal, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import { AppContext } from "../../../context/AppContext";
import chatData from "../../../data/ChatData";
import { Link } from "react-router-dom";

const IndivisualChat = () => {
  const { theme } = useContext(AppContext);
  const isLg = useMediaQuery({ query: "(min-width:1024px)" });
  return (
    <div>
      <div className="flex flex-col justify-between h-screen">
        <div
          className={`p-[23px] ${
            theme == "black"
              ? "border-b-2 border-b-base-300"
              : "border-b-1 border-b-base-200"
          }`}
        >
          <div className="flex gap-5 items-center">
            <Link to="/chat">
              <ArrowLeft strokeWidth={1} className="w-5 h-5 cursor-pointer" />
            </Link>
            <p className="font-heading font-bold text-base">John Dsouza</p>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {chatData.map((data) => (
            <div key={data.id}>
              {data.sender == "me" ? (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header font-heading text-xs">
                    {data.sender}
                    <time className="opacity-50 font-heading">{data.time}</time>
                  </div>
                  <div className="chat-bubble font-subheading text-xs">
                    {data.text}
                  </div>
                </div>
              ) : (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header font-heading text-xs">
                    {data.sender}
                    <time className="opacity-50 font-heading">{data.time}</time>
                  </div>
                  <div className="chat-bubble font-subheading text-xs">
                    {data.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className={`p-4 ${
            theme == "black"
              ? "border-t-2 border-t-base-300"
              : "border-t-1 border-t-base-200"
          }`}
        >
          <div
            className={`border-1 border-base-300 p-2 flex gap-4 rounded-sm ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <input
              type="text"
              className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none"
              placeholder={`Search...`}
            />
            <SendHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualChat;
