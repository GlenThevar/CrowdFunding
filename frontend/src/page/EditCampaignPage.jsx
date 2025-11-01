import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StickyNote, CircleX } from "lucide-react";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { AppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import allTags from "../data/allCampaignTags";
import interestingFacts from "../data/interestingInfo";

const EditCampaignPage = () => {
  const { theme, userId } = useContext(AppContext);
  const navigate = useNavigate();

  const { id: campaignId } = useParams();

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [url, setUrl] = useState("");
  const [funds, setFunds] = useState("");
  const [faq, setFaq] = useState([{ id: 0, Question: "", Answer: "" }]);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [fundsError, setFundsError] = useState("");
  const [imageError, setImageError] = useState("");
  const [editorError, setEditorError] = useState("");
  const [tagError, setTagError] = useState("");
  const [loadCount, setLoadCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (loadCount == 49) setLoadCount(0);
        else setLoadCount((prev) => prev + 1);
      }, 5000);
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      setIsPageLoading(true);
      setPageError(null);

      const baseurl =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/campaigns/${campaignId}`
          : `/campaigns/${campaignId}`;

      try {
        const response = await axios.get(baseurl);
        const campaignData = response.data;

        if (campaignData) {
          setTitle(campaignData.title || "");
          setDiscription(campaignData.discription || "");
          setUrl(campaignData.youtubeUrl || "");
          setFunds(campaignData.goalAmount?.toString() || "");
          setText(campaignData.content || "");
          setTags(campaignData.tags || []);
          setFaq(
            campaignData.faq?.map((item, index) => ({
              id: item._id,
              Question: item.Question,
              Answer: item.Answer,
            })) || [{ id: 0, Question: "", Answer: "" }]
          );
        }
      } catch (err) {
        console.error("Error fetching campaign data:", err);
        setPageError("Error fetching campaign data");
        toast.error("Error fetching campaign data");
      } finally {
        setIsPageLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaignData();
    } else {
      setPageError("Campaign ID not found in URL.");
      toast.error("Campaign ID not found in URL.");
      setIsPageLoading(false);
    }
  }, [campaignId]);

  const titleChange = (e) => setTitle(e.target.value);
  const discriptionChange = (e) => setDiscription(e.target.value);
  const urlChange = (e) => setUrl(e.target.value);
  const fundsChange = (e) => setFunds(e.target.value);

  const faqChange = (id, type, val) => {
    setFaq((prevfaq) =>
      prevfaq.map((f) => (f.id === id ? { ...f, [type]: val } : f))
    );
  };

  const faqHandleAdd = () => {
    const len = faq[faq.length - 1].id;
    setFaq((prev) => [...prev, { id: len + 1, Question: "", Answer: "" }]);
  };

  const faqHandleDelete = () => {
    if (faq.length === 1) return;
    setFaq((prev) => prev.slice(0, -1));
  };

  const handleTagClick = (tag) => {
    const isSelected = tags.includes(tag);
    if (isSelected) {
      setTags(tags.filter((t) => t !== tag));
      setTagError("");
    } else {
      if (tags.length >= 2) {
        setTagError("You can select a maximum of 2 tags.");
      } else {
        setTags([...tags, tag]);
        setTagError("");
      }
    }
  };

  const validateTitle = () => {
    if (!title.trim()) {
      const err = "Title cannot be empty";
      setTitleError(err);
      return err;
    }
    setTitleError("");
    return null;
  };

  const validateDescription = () => {
    if (!discription.trim()) {
      const err = "Description cannot be empty";
      setDescriptionError(err);
      return err;
    } else if (discription.length > 50) {
      const err = "Description cannot be more than 50 characters";
      setDescriptionError(err);
      return err;
    }
    setDescriptionError("");
    return null;
  };

  const validateUrl = () => {
    if (!url.trim()) {
      const err = "Enter a valid URL";
      setUrlError(err);
      return err;
    }
    try {
      new URL(url);
      setUrlError("");
      return null;
    } catch {
      const err = "Enter a valid URL";
      setUrlError(err);
      return err;
    }
  };

  const validateFunds = () => {
    if (!funds || isNaN(Number(funds))) {
      const err = "Funds must be a number";
      setFundsError(err);
      return err;
    }
    setFundsError("");
    return null;
  };

  const validateImages = (files) => {
    setImages(files);
    const invalid = Array.from(files).some((file) => file.size > 1000000);
    if (invalid) {
      setImageError("Each image must be below 1MB");
    } else {
      setImageError("");
    }
  };

  const validateNewImagesOnSubmit = () => {
    if (images.length === 0) {
      setImageError("");
      return null;
    }
    const invalidSize = Array.from(images).some((file) => file.size > 1000000);
    if (invalidSize) {
      const err = "Each newly selected image must be below 1MB";
      setImageError(err);
      return err;
    }

    if (images.length > 0 && images.length <= 3) {
      const err = "At least 4 are required.";
      setImageError(err);
      return err;
    }
    setImageError("");
    return null;
  };

  const validateEditor = () => {
    if (!text) {
      const err = "Project description cannot be empty";
      setEditorError(err);
      return err;
    }
    setEditorError("");
    return null;
  };

  const handleSubmit = async () => {
    const errors = [
      validateTitle(),
      validateDescription(),
      validateUrl(),
      validateFunds(),
      validateEditor(),
      validateNewImagesOnSubmit(),
    ];

    const validationErrors = errors.filter((err) => err !== null);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("discription", discription);
    formData.append("url", url);
    formData.append("funds", funds);
    formData.append("text", text);
    formData.append("faq", JSON.stringify(faq));
    formData.append("tags", JSON.stringify(tags));

    if (images.length > 0) {
      images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const baseurl =
      import.meta.env.MODE === "development"
        ? `http://localhost:3000/campaigns/${campaignId}`
        : `/campaigns/${campaignId}`;

    try {
      const response = await axios.patch(baseurl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Campaign updated successfully!");
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error("Error updating campaign:");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <span className="loading loading-ring loading-lg"></span>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-heading font-semibold text-xs">DID YOU KNOW ?</p>
          <p className="font-heading text-xs">{interestingFacts[loadCount]} </p>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <span className="loading loading-ring loading-lg"></span>
        <p className="text-xs font-heading">
          Error Occoured, try retracing your steps ?{" "}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[100vh] shadow-lg ${
        theme === "black"
          ? "border-2 border-base-300"
          : "border-1 border-base-200"
      }`}
    >
      <Toaster />

      <div className="flex flex-col m-10 gap-8">
        <h1 className="text-2xl font-heading font-bold mb-0 -mt-2">
          Edit Campaign
        </h1>
        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm md:text-base">
            Post Title
          </p>
          <div
            className={`p-2 rounded-lg flex items-center ${
              titleError
                ? "border-1 border-red-600"
                : theme === "black"
                ? "bg-base-300 border-1 border-base-300"
                : "bg-base-200 border-1 border-base-300"
            }`}
          >
            <input
              type="text"
              className="focus:outline-0 w-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the title.."
              value={title}
              onChange={titleChange}
              onBlur={validateTitle}
            />
            {titleError && (
              <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
            )}
          </div>
          {titleError && (
            <p className="label font-heading text-xs text-red-700">
              {titleError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Post Description
          </p>
          <div
            className={`p-2 rounded-lg ${
              theme === "black" ? "bg-base-300" : "bg-base-200"
            } ${
              descriptionError
                ? "border-1 border-red-600"
                : "border-1 border-base-300"
            }`}
          >
            <textarea
              className="focus:outline-0 w-full h-20 font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the description.."
              value={discription}
              onChange={discriptionChange}
              onBlur={validateDescription}
            />
          </div>
          {descriptionError && (
            <p className="label font-heading text-xs text-red-700">
              {descriptionError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              The post description should be max 50 characters
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Youtube URL
          </p>
          <div
            className={`p-2 rounded-lg flex items-center ${
              urlError
                ? "border-1 border-red-600"
                : theme === "black"
                ? "bg-base-300 border-1 border-base-300"
                : "bg-base-200 border-1 border-base-300"
            }`}
          >
            <input
              type="url"
              className="focus:outline-0 w-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the URL"
              value={url}
              onChange={urlChange}
              onBlur={validateUrl}
            />
            {urlError && (
              <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
            )}
          </div>
          {urlError && (
            <p className="label font-heading text-xs text-red-700">
              {urlError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              Every campaign will display ONE video uploaded on YouTube
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Thumbnail Images
          </p>

          <FileUpload
            multiple
            accept="image/*"
            customUpload={true}
            maxFileSize={1000000}
            onSelect={(e) => validateImages(e.files)}
            onRemove={(e) =>
              setImages((currentImages) =>
                currentImages.filter((f) => f.name !== e.file.name)
              )
            }
            onClear={() => setImages([])}
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
          {imageError && (
            <p className="label font-heading text-xs text-red-700">
              {imageError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              Upload new images to replace the existing ones. If you upload any,
              you must upload at least 4. Max 1MB each.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Required Funds
          </p>
          <div
            className={`p-2 rounded-lg flex items-center ${
              fundsError
                ? "border-1 border-red-600"
                : theme === "black"
                ? "bg-base-300 border-1 border-base-300"
                : "bg-base-200 border-1 border-base-300"
            }`}
          >
            <input
              type="number"
              className="focus:outline-0 w-full font-subheading resize-none text-xs md:text-sm"
              placeholder="Enter the amount"
              value={funds}
              onChange={fundsChange}
              onBlur={validateFunds}
            />
            {fundsError && (
              <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
            )}
          </div>
          {fundsError && (
            <p className="label font-heading text-xs text-red-700">
              {fundsError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">Enter the amount in INR</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">
            Campaign Tags (Max 2)
          </p>
          <div
            className={`p-4 rounded-lg ${
              theme === "black" ? "bg-base-300" : "bg-base-200"
            } ${
              tagError ? "border-1 border-red-600" : "border-1 border-base-300"
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`btn btn-xs rounded-full font-heading ${
                      isSelected
                        ? theme === "black"
                          ? "btn-primary"
                          : "bg-green-900 text-white"
                        : "btn-ghost"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
          {tagError && (
            <p className="label font-heading text-xs text-red-700">
              {tagError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <StickyNote strokeWidth={1} className="w-4 h-4" />
            <p className="text-xs font-extralight">
              Select up to 2 tags to help users discover your campaign.
              (Optional)
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading font-semibold text-sm sm:text-base">FAQ</p>
          <div className="flex flex-col gap-4">
            {faq.map((data) => (
              <div key={data.id} className="flex flex-col lg:flex-row gap-2">
                <div
                  className={`p-2 rounded-lg h-20 lg:flex-1 ${
                    theme === "black"
                      ? "bg-base-300 border-1 border-base-300"
                      : "bg-base-200 border-1 border-base-300"
                  }`}
                >
                  <textarea
                    className="focus:outline-0 w-full h-full font-subheading resize-none text-xs md:text-sm"
                    placeholder={`Enter Question`}
                    value={data.Question}
                    onChange={(e) =>
                      faqChange(data.id, "Question", e.target.value)
                    }
                  />
                </div>
                <div
                  className={`p-2 rounded-lg h-20 lg:flex-1 ${
                    theme === "black"
                      ? "bg-base-300 border-1 border-base-300"
                      : "bg-base-200 border-1 border-base-300"
                  }`}
                >
                  <textarea
                    className="focus:outline-0 w-full h-full font-subheading resize-none text-xs md:text-sm"
                    placeholder={`Enter Answer`}
                    value={data.Answer}
                    onChange={(e) =>
                      faqChange(data.id, "Answer", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className={`btn btn-outline btn-primary rounded-sm shadow-sm flex gap-2 items-center justify-center ${
                theme === "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
              }`}
              onClick={faqHandleAdd}
            >
              <p className="font-heading text-xs sm:text-sm font-light">Add</p>
            </button>
            <button
              className={`btn btn-outline btn-primary rounded-sm shadow-sm flex gap-2 items-center justify-center ${
                theme === "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
              }`}
              onClick={faqHandleDelete}
            >
              <p className="font-heading text-xs sm:text-sm font-light">
                Delete
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-10">
          <p className="font-heading font-semibold text-base">
            Project Description
          </p>
          {editorError && (
            <p className="label font-heading text-xs text-red-700">
              {editorError}
            </p>
          )}
          <Editor
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            onBlur={validateEditor}
            className="h-50"
          />
        </div>

        <div className="mt-20 sm:mt-10 md:mt-0">
          <button
            className={`btn btn-outline btn-primary rounded-sm shadow-sm flex gap-2 items-center justify-center ${
              theme === "black"
                ? "text-white hover:text-black hover:bg-white"
                : "text-black bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <p className="font-heading text-xs sm:text-sm font-light">
              {isLoading ? "Saving..." : "Save Changes"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCampaignPage;
