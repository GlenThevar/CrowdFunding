import React, { useContext, useEffect, useState, useRef } from "react";
import { SendHorizontal, ArrowLeft, Paperclip, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Viewer from "react-viewer";
import { toast } from "react-hot-toast";

import placeholderPhoto from "../../../data/images/placeholderPhoto.jpg";
import { AppContext } from "../../../context/AppContext";

const IndivisualChat = () => {
  const { theme, userId } = useContext(AppContext);
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState(null);
  const [tempUrl, setTempUrl] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);

  const chatEndRef = useRef(null);
  const isLg = useMediaQuery({ query: "(min-width:1024px)" });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !receiverId) return;

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const baseurl_1 =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/chat/list/${userId}`
          : `/chat/list/${userId}`;

      try {
        const chatListRes = await axios.get(baseurl_1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const chat = chatListRes.data.data.find((c) =>
          c.participants.some((p) => p._id === receiverId)
        );

        if (chat) {
          setChatId(chat._id);

          const baseurl_2 =
            import.meta.env.MODE === "development"
              ? `http://localhost:3000/chat/messages/${chat._id}`
              : `/chat/messages/${chat._id}`;

          const msgRes = await axios.get(baseurl_2, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages(msgRes.data.data || []);

          const baseurl_3 =
            import.meta.env.MODE === "development"
              ? `http://localhost:3000/chat/messages/seen/${chat._id}`
              : `/chat/messages/seen/${chat._id}`;
          try {
            await axios.patch(
              baseurl_3,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (seenErr) {
            console.error("Could not mark messages as seen:", seenErr);
          }
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching chat messages:", err);
        toast.error(err.response?.data?.message || "Error fetching messages.");
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  const fileReseat = () => {
    setFile(null);
    setTempUrl(null);
    document.getElementById("upload").value = null;
  };

  const handleSend = async () => {
    if (!messageInput.trim() && !file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    const formData = new FormData();
    formData.append("sender", userId);

    if (messageInput.trim()) {
      formData.append("text", messageInput.trim());
    }
    if (file) {
      formData.append("image", file);
    }

    try {
      const baseurl =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/chat/send/${receiverId}`
          : `/chat/send/${receiverId}`;

      const res = await axios.post(baseurl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newPopulatedMessage = res.data.data.lastMessage;
      setMessages((prev) => [...prev, newPopulatedMessage]);

      setMessageInput("");
      fileReseat();
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error(err.response?.data?.message || "Error sending message.");
    }
  };

  const fileUploadClick = () => {
    document.getElementById("upload").click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 1000000) {
      toast.error("File size cannot be over 1 MB");
      return;
    }
    setFile(selectedFile);
  };

  useEffect(() => {
    if (file) {
      setTempUrl(URL.createObjectURL(file));
    } else {
      setTempUrl(null);
    }
  }, [file]);

  const showImagePreview = (imageUrl) => {
    setViewerImages([{ src: imageUrl, alt: "Preview" }]);
    setPreviewVisible(true);
  };

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
          <p className="font-heading font-bold text-base">Chat</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full opacity-70 text-sm">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender && msg.sender._id === userId;
            const senderName = msg.sender ? msg.sender.username : "User";
            const profileUrl = msg.sender ? msg.sender.profileUrl : null;

            return (
              <div
                key={msg._id}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={isMe ? "Me" : senderName}
                      src={profileUrl || placeholderPhoto}
                    />
                  </div>
                </div>
                <div className="chat-header font-heading text-xs">
                  {isMe ? "You" : senderName}
                  <time className="opacity-50 ml-2 font-heading text-[10px]">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                <div className="chat-bubble font-subheading text-xs flex flex-col gap-2">
                  {msg.content?.image && (
                    <div className={`${imageLoading && "skeleton h-30 w-48"}`}>
                      <img
                        src={msg.content.image}
                        alt="Chat message"
                        className={`w-48 h-auto rounded-md cursor-pointer ${
                          imageLoading && "hidden"
                        }`}
                        onClick={() => showImagePreview(msg.content.image)}
                        onLoad={() => setImageLoading(false)}
                      />
                    </div>
                  )}
                  {msg.content?.text && <p>{msg.content.text}</p>}
                </div>
                {isMe && (
                  <div className="chat-footer opacity-50">
                    {msg.seen ? "Seen" : "Delivered"}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div
        className={`flex flex-col items-center gap-4 flex-shrink-0 sticky bottom-0 z-10 p-4 bg-base-100 ${
          theme === "black"
            ? "border-t-2 border-t-base-300"
            : "border-t border-t-base-200"
        }`}
      >
        <Viewer
          visible={previewVisible}
          onClose={() => {
            setPreviewVisible(false);
            setViewerImages([]);
          }}
          images={viewerImages}
          changeable={false}
          drag={false}
        />

        {tempUrl && (
          <div>
            <div className="flex gap-4 items-center ">
              <div
                className="text-xs font-heading cursor-pointer"
                onClick={() => showImagePreview(tempUrl)}
              >
                Preview Image
              </div>
              <div className="">
                <X
                  className="h-4 w-4 hover:cursor-pointer"
                  onClick={fileReseat}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center w-full gap-4">
          <div>
            <input
              type="file"
              id="upload"
              name="filename"
              className="hidden"
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg"
            ></input>
            <Paperclip
              onClick={fileUploadClick}
              id="uploadbutton"
              className="hover:cursor-pointer"
            />
          </div>
          <div
            className={`p-2 flex flex-1 gap-4 rounded-sm border border-base-300 ${
              theme === "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full font-subheading focus:outline-none resize-none bg-transparent"
              placeholder="Type a message..."
            />
            <SendHorizontal
              className="cursor-pointer hover:opacity-80"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualChat;
