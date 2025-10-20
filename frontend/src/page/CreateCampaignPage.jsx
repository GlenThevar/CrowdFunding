import React, { useContext, useState, useRef } from "react";
import { StickyNote } from "lucide-react";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";

import { AppContext } from "../context/AppContext";

const CreateCampaignPage = () => {
  const { theme } = useContext(AppContext);
  const [text, setText] = useState("");
  const [title, settitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [url, setUrl] = useState("");
  const [funds, setfunds] = useState("");

  const [faq, setFaq] = useState([
    {
      id: 0,
      Question: "",
      Answer: "",
    },
  ]);

  const titleChange = (e) => {
    settitle(e.target.value);
  };
  const discriptionChange = (e) => {
    setDiscription(e.target.value);
  };
  const urlChange = (e) => {
    setUrl(e.target.value);
  };

  const fundsChange = (e) => {
    setfunds(e.target.value);
  };

  const faqChange = (id, type, val) => {
    setFaq((prevfaq) =>
      prevfaq.map((faq) => (faq.id == id ? { ...faq, [type]: val } : faq))
    );
  };

  const faqHandleAdd = () => {
    let len = faq[faq.length - 1].id;
    setFaq((data) => [...data, { id: len + 1, Question: "", Answer: "" }]);
  };

  const faqHandleDelete = () => {
    let faqArr = [...faq];
    if (faqArr.length == 1) {
      return;
    } else {
      faqArr.pop();
      setFaq(faqArr);
    }
  };

  return (
    <div
      className={`min-h-[100vh] shadow-lg ${
        theme == "black"
          ? "border-2 border-base-300"
          : "border-1 border-base-200"
      }`}
    >
      <div className="flex flex-col m-10 gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm md:text-base">
            Post Title
          </p>
          <div
            className={`border-1 border-base-300 p-2 rounded-lg ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <input
              type="text"
              className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none font-subheading resize-none w-full text-xs md:text-sm"
              placeholder="Enter the title.."
              value={title}
              onChange={titleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Post Discription
          </p>
          <div
            className={`border-1 border-base-300 p-2 rounded-lg h-20 ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <textarea
              type="text"
              className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full h-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the discription.."
              value={discription}
              onChange={discriptionChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              The post discription should be of max 50 words
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Youtube URL
          </p>
          <div
            className={`border-1 border-base-300 p-2 rounded-lg ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <input
              type="url"
              className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the URL"
              value={url}
              onChange={urlChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              Every campaign will display ONE video which has to uploaded on
              youtube first and then it should be added here
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Thumbnail Images
          </p>

          <div>
            <FileUpload
              multiple
              accept="image/*"
              customUpload={true}
              maxFileSize={1000000}
              chooseOptions={{
                className: `font-heading text-xs md:text-sm gap-1 p-1 md:p-2 rounded-sm ${
                  theme == "black"
                    ? "border-2 border-base-300 hover:bg-white hover:text-black"
                    : "border-1 border-base-200 hover:bg-green-900 hover:text-white"
                }`,
              }}
              uploadOptions={{
                className: `font-heading text-xs md:text-sm gap-1 p-1 md:p-2 rounded-sm ${
                  theme == "black"
                    ? "border-2 border-base-300 hover:bg-white hover:text-black"
                    : "border-1 border-base-200 hover:bg-green-900 hover:text-white"
                }`,
              }}
              cancelOptions={{
                className: `font-heading text-xs md:text-sm gap-1 p-1 md:p-2 rounded-sm  ${
                  theme == "black"
                    ? "border-2 border-base-300 hover:bg-white hover:text-black"
                    : "border-1 border-base-200 hover:bg-green-900 hover:text-white"
                }`,
              }}
              pt={{
                root: {
                  className: `p-4 rounded-md ${
                    theme == "black"
                      ? "border-2 border-base-300"
                      : "border-1 border-base-200"
                  }`,
                },
                buttonbar: {
                  className: "flex gap-1 md:gap-3",
                },
                chooseIcon: {
                  className: "md:w-3 md:h-3",
                },
                uploadIcon: {
                  className: "md:w-3 md:h-3",
                },
                cancelIcon: {
                  className: "md:w-3 md:h-3",
                },
                details: {
                  className: "font-heading text-[8px] md:text-xs ml-5 mt-2",
                },
                actions: {
                  className: "text-red-400",
                },
              }}
            />
          </div>

          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight ">
              These images will be shown on the thumbnail and it will increase
              the chances of people selecting on your campaign
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Required Funds
          </p>
          <div
            className={`border-1 border-base-300 p-2 rounded-lg  ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <input
              type="number"
              className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the ammount"
              value={funds}
              onChange={fundsChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight ">Enter the amount in INR</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-heading font-semibold text-sm sm:text-base">
            <p>FAQ</p>
          </div>
          <div className="flex flex-col gap-4">
            {faq.map((data) => (
              <div key={data.id} className="flex flex-col lg:flex-row gap-2">
                <div
                  className={`border-1 border-base-300 p-2 rounded-lg h-20 lg:flex-1 ${
                    theme == "black" ? "bg-base-300" : "bg-base-200"
                  }`}
                >
                  <textarea
                    type="text"
                    className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full h-full font-subheading resize-none text-xs md:text-sm"
                    placeholder={`Enter Question ${data.id}`}
                    value={data.Question}
                    onChange={(e) =>
                      faqChange(data.id, "Question", e.target.value)
                    }
                  />
                </div>
                <div
                  className={`border-1 border-base-300 p-2 rounded-lg h-20 lg:flex-1 ${
                    theme == "black" ? "bg-base-300" : "bg-base-200"
                  }`}
                >
                  <textarea
                    type="text"
                    className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full h-full font-subheading resize-none text-xs md:text-sm"
                    placeholder={`Enter Answer ${data.id}`}
                    value={data.Answer}
                    onChange={(e) =>
                      faqChange(data.id, "Answer", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-end gap-2">
              <button
                className={`btn btn-outline btn-primary rounded-sm ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex gap-2 items-center justify-center`}
                onClick={faqHandleAdd}
              >
                <p className="font-heading text-xs sm:text-sm font-light">
                  Add
                </p>
              </button>
              <button
                className={`btn btn-outline btn-primary rounded-sm ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex gap-2 items-center justify-center`}
                onClick={faqHandleDelete}
              >
                <p className="font-heading text-xs sm:text-sm font-light">
                  Delete
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <div>
            <p className="font-heading font-semibold text-base">
              Project Discription
            </p>
          </div>
          <Editor
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            className="h-50"
          />
        </div>
        <div className="mt-20 sm:mt-10 md:mt-0 ">
          <div>
            <button
              className={`btn btn-outline btn-primary rounded-sm ${
                theme == "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
              } shadow-sm flex gap-2 items-center justify-center`}
              onClick={faqHandleAdd}
            >
              <p className="font-heading text-xs sm:text-sm font-light">
                Submit
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
