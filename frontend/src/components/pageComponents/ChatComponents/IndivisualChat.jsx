import React, { useContext } from "react";
import { SendHorizontal, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import chatData from "../../../data/ChatData";

const IndivisualChat = () => {
  const { theme } = useContext(AppContext);
  const isLg = useMediaQuery({ query: "(min-width:1024px)" });

  return (
    <div className="relative flex flex-col h-full">
      <div
        className={`flex-shrink-0 sticky top-0 z-10 p-[23px] bg-base-100 ${
          theme === "black"
            ? "border-b-2 border-b-base-300"
            : "border-b border-b-base-200"
        }`}
      >
        <div className="flex gap-5 items-center">
          <Link to="/chat">
            <ArrowLeft strokeWidth={1} className="w-5 h-5 cursor-pointer" />
          </Link>
          <p className="font-heading font-bold text-base">John Dsouza</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {chatData.map((data) => (
          <div key={data.id}>
            {data.sender === "me" ? (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Me"
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
                      alt="User"
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
        className={`flex-shrink-0 sticky bottom-0 z-10 p-4 bg-base-100 ${
          theme === "black"
            ? "border-t-2 border-t-base-300"
            : "border-t border-t-base-200"
        }`}
      >
        <div
          className={`p-2 flex gap-4 rounded-sm border border-base-300 ${
            theme === "black" ? "bg-base-300" : "bg-base-200"
          }`}
        >
          <input
            type="text"
            className="w-full font-subheading focus:outline-none resize-none bg-transparent"
            placeholder="Type a message..."
          />
          <SendHorizontal />
        </div>
      </div>
    </div>
  );
};

export default IndivisualChat;
