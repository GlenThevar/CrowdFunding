import React, { useContext } from "react";
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
    <div className="flex justify-center">
      <div
        className={`flex w-full max-w-7xl ${
          theme === "black"
            ? "border-2 border-base-300"
            : "border-1 border-base-200"
        } h-[65vh] overflow-hidden shadow-lg`}
      >
        {!isLg ? (
          username ? (
            <div className="flex-1 overflow-y-auto">
              <IndivisualChat />
            </div>
          ) : (
            <div
              className={`flex-1 overflow-y-auto ${
                theme === "black"
                  ? "md:border-r-2 md:border-base-300"
                  : "md:border-r md:border-base-200"
              }`}
            >
              <ChatList />
            </div>
          )
        ) : (
          <div
            className={`flex-1 overflow-y-auto ${
              theme === "black"
                ? "md:border-r-2 md:border-base-300"
                : "md:border-r md:border-base-200"
            }`}
          >
            <ChatList />
          </div>
        )}

        {isLg && (
          <div className="flex-2 overflow-y-auto">
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
