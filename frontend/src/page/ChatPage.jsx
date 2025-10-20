import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

import ChatList from "../components/pageComponents/ChatComponents/ChatList";
import IndivisualChat from "../components/pageComponents/ChatComponents/IndivisualChat";

const Chat = () => {
  const { theme } = useContext(AppContext);
  const isLg = useMediaQuery({ query: "(min-width:1024px)" });
  const { username } = useParams();

  return (
    <div className="min-h-screen">
      <div
        className={`flex mx-10 my-8 ${
          theme == "black"
            ? "border-2 border-base-300"
            : "border-1 border-base-200"
        }`}
      >
        {!isLg ? (
          username ? (
            <div className="flex-1">
              <IndivisualChat />
            </div>
          ) : (
            <div
              className={`flex-1 ${
                theme == "black"
                  ? "md:border-r-2 md:border-base-300"
                  : "md:border-r-1 md:border-base-200"
              }`}
            >
              <ChatList />
            </div>
          )
        ) : (
          <div
            className={`flex-1 ${
              theme == "black"
                ? "md:border-r-2 md:border-base-300"
                : "md:border-r-1 md:border-base-200"
            }`}
          >
            <ChatList />
          </div>
        )}

        {isLg && (
          <div className="flex-2">
            {username ? (
              <IndivisualChat />
            ) : (
              <div className="flex justify-center items-center h-full w-full font-heading">
                Select to view a chat
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
