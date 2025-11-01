import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { MapPin, CircleX } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, Link } from "react-router-dom";

import CampaignComponent from "../components/pageComponents/HomeComponents/CampaignComponent";
import { AppContext } from "../context/AppContext";
import placeholderPhoto from "../data/images/placeholderPhoto.jpg";
import interestingFacts from "../data/interestingInfo";

const UserPage = () => {
  const { theme, userId } = useContext(AppContext);

  const [profileData, setProfileData] = useState(null);
  const [userCampaigns, setUserCampaigns] = useState([]);

  const [shortDiscription, setShortDiscription] = useState("");
  const [longDiscription, setLongDiscription] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);
  const { id: paramid } = useParams();

  const [usernameIncorrect, setUsernameIncorrect] = useState(false);
  const [shortIncorrect, setShortIncorrect] = useState(false);
  const [longIncorrect, setLongIncorrect] = useState(false);
  const [locationIncorrect, setLocationIncorrect] = useState(false);
  const [fileIncorrect, setFileIncorrect] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);
  const [pageError, setPageError] = useState(null);

  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [updateTitle, SetUpdateTitle] = useState("");
  const [updateDiscription, SetUpdateDiscription] = useState("");

  const [updateTitleError, setUpdateTitleError] = useState(false);
  const [updateDiscriptionError, setUpdateDiscriptionError] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    const fetchUserDataAndCampaigns = async () => {
      setPageLoading(true);
      setPageError(null);
      setProfileData(null);
      setUserCampaigns([]);

      if (!paramid) {
        setPageError("User ID not found in URL.");
        setPageLoading(false);
        toast.error("User ID not found in URL.");
        return;
      }

      const baseurl_1 =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/campaigns/user/${paramid}`
          : `/campaigns/user/${paramid}`;

      try {
        const campaignsRes = await axios.get(baseurl_1);

        if (
          campaignsRes.data &&
          Array.isArray(campaignsRes.data) &&
          campaignsRes.data.length > 0
        ) {
          setUserCampaigns(campaignsRes.data);
          if (campaignsRes.data[0]?.userid) {
            setProfileData(campaignsRes.data[0].userid);
          } else {
            const baseurl_2 =
              import.meta.env.MODE === "development"
                ? `http://localhost:3000/user/${paramid}`
                : `/user/${paramid}`;

            const userRes = await axios.get(baseurl_2);
            setProfileData(userRes.data);
          }
        } else {
          setUserCampaigns([]);
          const baseurl_3 =
            import.meta.env.MODE === "development"
              ? `http://localhost:3000/user/${paramid}`
              : `/user/${paramid}`;
          const userRes = await axios.get(baseurl_3);
          if (userRes.data) {
            setProfileData(userRes.data);
          } else {
            throw new Error("User profile not found.");
          }
        }
      } catch (err) {
        console.error("Error fetching page data:", err);
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to load page data.";
        setPageError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setPageLoading(false);
      }
    };

    fetchUserDataAndCampaigns();
  }, [paramid]);

  useEffect(() => {
    if (!pageLoading) {
      setTimeout(() => {
        if (loadCount == 49) setLoadCount(0);
        else setLoadCount((prev) => prev + 1);
      }, 5000);
    }
  }, [pageLoading]);

  useEffect(() => {
    if (profileData && userId === paramid) {
      setUsername(profileData.username || "");
      setLocation(profileData.basedLocation || "");
      setShortDiscription(profileData.shortDiscription || "");
      setLongDiscription(profileData.longDiscription || "");
    } else if (userId !== paramid) {
      setUsername("");
      setLocation("");
      setShortDiscription("");
      setLongDiscription("");
    }
  }, [profileData, userId, paramid]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleShortDiscriptionChange = (e) =>
    setShortDiscription(e.target.value);
  const handleLongDiscriptionChange = (e) => setLongDiscription(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFileIncorrect(false);
    if (selectedFile) {
      if (selectedFile.size > 1000000) {
        setFileIncorrect(true);
        toast.error("File size cannot exceed 1MB");
        setFile(null);
        e.target.value = "";
      } else {
        setFile(selectedFile);
        console.log("Selected file:", selectedFile);
      }
    } else {
      setFile(null);
    }
  };

  const onBlurUsername = () => {
    setUsernameIncorrect(username.trim().length === 0);
  };
  const onBlurShort = () => {
    setShortIncorrect(
      shortDiscription.trim().length === 0 || shortDiscription.length > 30
    );
  };
  const onBlurLong = () => {
    setLongIncorrect(
      longDiscription.trim().length === 0 || longDiscription.length > 750
    );
  };
  const onBlurLocation = () => {
    setLocationIncorrect(location.trim().length === 0 || location.length > 15);
  };

  const onBlurUpdateTitle = () => {
    setUpdateTitleError(updateTitle.trim() == 0 ? true : false);
  };
  const onBlurUpdateDiscription = () => {
    setUpdateDiscriptionError(updateDiscription.trim() == 0 ? true : false);
  };

  const createUpdate = async () => {
    if (updateTitle.trim() == 0 || updateDiscription.trim() == 0) {
      toast.error("Fields cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    const baseurl_4 =
      import.meta.env.MODE === "development"
        ? `http://localhost:3000/campaigns/update/${updateId}`
        : `/campaigns/update/${updateId}`;

    try {
      const data = axios.post(
        baseurl_4,
        {
          title: updateTitle,
          discription: updateDiscription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        toast.success("Update Created Successfully");
      }
    } catch (error) {
      console.log("Error Occoured" + error);
      toast.error("Internal Server Error");
    } finally {
      document.getElementById("update_modal").close();
      setUpdateDiscriptionError("");
      SetUpdateTitle("");
    }
  };

  const editProfile = async () => {
    onBlurUsername();
    onBlurShort();
    onBlurLong();
    onBlurLocation();
    const isFileCurrentlyInvalid = file && file.size > 1000000;
    if (isFileCurrentlyInvalid) setFileIncorrect(true);

    if (
      username.trim().length === 0 ||
      location.trim().length === 0 ||
      location.length > 15 ||
      longDiscription.trim().length === 0 ||
      longDiscription.length > 750 ||
      shortDiscription.trim().length === 0 ||
      shortDiscription.length > 30 ||
      fileIncorrect ||
      isFileCurrentlyInvalid
    ) {
      toast.error("Please correct the errors in the form before submitting.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    setUpdateLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("username", username);
    formData.append("shortDiscription", shortDiscription);
    formData.append("longDiscription", longDiscription);
    formData.append("basedLocation", location);

    const baseurl_5 =
      import.meta.env.MODE === "development"
        ? `http://localhost:3000/user/update/${paramid}`
        : `/user/update/${paramid}`;

    try {
      const result = await axios.post(baseurl_5, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data) {
        toast.success("Profile updated successfully!");
        setProfileData(result.data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) {
      toast.error("No campaign selected for deletion.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    setIsDeleting(true);

    try {
      const baseurl_6 =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/campaigns/${campaignToDelete}`
          : `/campaigns/${campaignToDelete}`;

      const response = await axios.delete(baseurl_6, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Campaign deleted successfully!");

        setUserCampaigns((currentCampaigns) =>
          currentCampaigns.filter((c) => c._id !== campaignToDelete)
        );
        document.getElementById("delete_modal").close();
        setCampaignToDelete(null);
      }
    } catch (err) {
      console.error("Error deleting campaign:", err);
      toast.error("Error deleting campaign:");
      document.getElementById("delete_modal").close();
    } finally {
      setIsDeleting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
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
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <div>
          <p className="font-heading text-xs ">
            Error Occoured, Try refreshing ?{" "}
          </p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <div>
          <p className="font-heading text-xs ">
            Campaign not found, Try refreshing ?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <Toaster />
      <div
        className={`min-h-screen  p-4 sm:p-6 w-full shadow-lg ${
          theme == "black"
            ? "border-2 border-base-300"
            : "border-1 border-base-200"
        } `}
      >
        <div
          className={`w-full mx-auto shadow-md rounded-2xl ${
            theme == "black"
              ? "border-2 border-base-300"
              : "border-1 border-base-200"
          }`}
        >
          <div className="h-32 bg-green-900 rounded-t-2xl"></div>

          <div className="p-6 relative flex flex-col lg:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex  gap-4 w-full items-center justify-center lg:justify-start">
              {" "}
              <img
                src={profileData?.profileUrl || placeholderPhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white -mt-16 bg-gray-300 object-cover flex-shrink-0"
              />
              <div className="w-full flex flex-col gap-1">
                {" "}
                <div>
                  <h1 className="font-bold font-heading text-lg">
                    {" "}
                    {profileData?.username}
                  </h1>
                  <p className="font-subheading text-sm w-full text-gray-500">
                    {" "}
                    {profileData?.shortDiscription || "No description"}
                  </p>
                </div>
                {profileData?.basedLocation && (
                  <div className="flex justify-start gap-1 items-center mt-1">
                    {" "}
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />{" "}
                    <p className="font-heading text-xs sm:text-sm text-gray-400">
                      {" "}
                      {profileData?.basedLocation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full h-full lg:w-fit lg:justify-end flex-shrink-0">
              {" "}
              {userId == paramid ? (
                <button
                  className={`btn btn-outline btn-primary rounded-sm w-full lg:w-fit ${
                    theme == "black"
                      ? "text-white hover:text-black hover:bg-white"
                      : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                  } shadow-sm flex items-center justify-center`}
                  onClick={() =>
                    document.getElementById("editprofile").showModal()
                  }
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
                    {" "}
                    Edit Profile
                  </p>
                </button>
              ) : (
                <button
                  className={`btn btn-outline btn-primary rounded-sm ${
                    theme == "black"
                      ? "text-white hover:text-black hover:bg-white"
                      : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                  } shadow-sm flex items-center justify-center`}
                  onClick={() => toast("Message functionality not available.")}
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
                    {" "}
                    Message
                  </p>
                </button>
              )}
              <dialog id="editprofile" className="modal">
                <div className="modal-box bg-base-200 overflow-y-auto">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Edit your details</h3>
                  <div className="flex flex-col mt-5 gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Username
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex items-center ${
                          usernameIncorrect ? "border border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          className="focus:outline-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm bg-transparent"
                          placeholder="Enter your username"
                          value={username}
                          onChange={handleUsernameChange}
                          onBlur={onBlurUsername}
                        />
                        {usernameIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
                        )}
                      </div>
                      {usernameIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            username cannot be empty
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Short discription (Max 30 chars)
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex items-center ${
                          shortIncorrect ? "border border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          maxLength="30"
                          className="focus:outline-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm bg-transparent"
                          placeholder="Short discription"
                          value={shortDiscription}
                          onChange={handleShortDiscriptionChange}
                          onBlur={onBlurShort}
                        />
                        {shortIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
                        )}
                      </div>
                      {shortIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            Short description cannot be empty & max 30
                            characters.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Long discription (Max 750 chars)
                      </p>
                      <textarea
                        className={`border-0 focus:border-0 focus:outline-0 textarea bg-base-300 rounded-sm w-full font-subheading text-xs md:text-sm h-24 resize-none ${
                          longIncorrect ? "border border-red-600" : ""
                        }`}
                        maxLength="750"
                        placeholder="Long discription"
                        value={longDiscription}
                        onChange={handleLongDiscriptionChange}
                        onBlur={onBlurLong}
                      />
                      {longIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            Long description cannot be empty & max 750
                            characters.
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend font-heading font-semibold text-sm">
                          Pick a file
                        </legend>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          className={`file-input focus:border-0 focus:outline-0 w-full file-input-sm ${
                            fileIncorrect ? "file-input-error" : ""
                          }`}
                          onChange={handleFileChange}
                        />
                        <label
                          className={`label ${
                            fileIncorrect ? "text-red-700" : ""
                          }`}
                        >
                          <span className="label-text-alt">
                            Max size 1MB (JPG, PNG)
                          </span>
                        </label>
                      </fieldset>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Location (Max 15 chars)
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex items-center ${
                          locationIncorrect ? "border border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          maxLength="15"
                          className="focus:outline-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm bg-transparent"
                          placeholder="Location"
                          value={location}
                          onChange={handleLocationChange}
                          onBlur={onBlurLocation}
                        />
                        {locationIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4 ml-2" />
                        )}
                      </div>
                      {locationIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            Location cannot be empty & max 15 chars.
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      className={`btn btn-outline btn-primary rounded-sm mt-4 ${
                        theme == "black"
                          ? "text-white hover:text-black hover:bg-white"
                          : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                      } shadow-sm flex items-center justify-center`}
                      onClick={editProfile}
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <p className="font-heading text-xs sm:text-sm font-light">
                          Submit
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto mt-8">
          <h2 className="text-lg font-bold mb-4 font-heading">
            {" "}
            {userId == paramid
              ? "My Campaigns"
              : `${profileData?.username}'s Campaigns`}
          </h2>

          {userCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {userCampaigns.map((campaign) => (
                <div key={campaign._id} className="flex flex-col ">
                  {" "}
                  <CampaignComponent campaign={campaign} />
                  {userId == paramid && (
                    <div className="flex gap-2 mt-3 justify-center">
                      <button
                        className={`btn btn-outline btn-primary rounded-sm ${
                          theme == "black"
                            ? "text-white hover:text-black hover:bg-white"
                            : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                        } shadow-sm flex items-center justify-center`}
                        onClick={() => {
                          document.getElementById("update_modal").showModal();
                          setUpdateId(campaign._id);
                        }}
                      >
                        <p className="font-heading text-xs sm:text-sm font-light">
                          Update
                        </p>
                      </button>
                      <Link
                        to={`/edit/${campaign._id}`}
                        className={`btn btn-outline btn-primary rounded-sm ${
                          theme == "black"
                            ? "text-white hover:text-black hover:bg-white"
                            : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                        } shadow-sm flex items-center justify-center`}
                      >
                        <p className="font-heading text-xs sm:text-sm font-light">
                          {" "}
                          Edit
                        </p>
                      </Link>
                      <button
                        className={`btn btn-outline btn-primary rounded-sm ${
                          theme == "black"
                            ? "text-white hover:text-black hover:bg-white"
                            : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                        } shadow-sm flex items-center justify-center`}
                        onClick={() => {
                          setCampaignToDelete(campaign._id);
                          document.getElementById("delete_modal").showModal();
                        }}
                      >
                        <p className="font-heading text-xs sm:text-sm font-light">
                          Delete
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className=" text-xs text-gray-500 font-heading mt-6">
              {" "}
              {userId == paramid
                ? "You haven't created any campaigns yet."
                : `${profileData?.username} hasn't created any campaigns yet.`}
            </p>
          )}
        </div>

        <dialog id="delete_modal" className="modal">
          <div
            className={`modal-box ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setCampaignToDelete(null)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Delete Campaign</h3>{" "}
            <p className="py-4 font-subheading text-sm">
              {" "}
              Are you sure you want to delete this campaign? This action cannot
              be undone.
            </p>
            <div className="flex w-full justify-end gap-2">
              <button
                className={`btn btn-outline btn-primary rounded-sm ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex items-center justify-center`}
                onClick={() => {
                  document.getElementById("delete_modal").close();
                  setCampaignToDelete(null);
                }}
              >
                <p className="font-heading text-xs sm:text-sm font-light">
                  Cancel
                </p>
              </button>
              <button
                className={`btn btn-outline btn-primary rounded-sm ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex items-center justify-center`}
                onClick={handleDeleteCampaign}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <p className="font-heading text-xs sm:text-sm font-light">
                    Delete
                  </p>
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setCampaignToDelete(null)}>close</button>
          </form>
        </dialog>
        <dialog id="update_modal" className="modal">
          <div
            className={`modal-box ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            }`}
          >
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setUpdateDiscriptionError(false);
                  setUpdateTitleError(false);
                  setUpdateId("");
                  SetUpdateDiscription("");
                  SetUpdateTitle("");
                }}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Update Campaign</h3>{" "}
            <div className="flex flex-col mt-4 gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-heading text-md">Title</p>
                <input
                  type="text"
                  className={`focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-200 p-3 font-subheading text-sm ${
           theme == "black" ? "bg-base-200" : "bg-base-300"
         } ${updateTitleError ? "border-1 border-red-600" : ""}`}
                  placeholder="Enter title..."
                  onChange={(e) => {
                    SetUpdateTitle(e.target.value);
                  }}
                  value={updateTitle}
                  onBlur={onBlurUpdateTitle}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-heading text-md">Discription</p>
                <textarea
                  type="text"
                  className={`focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none font-subheading bg-base-200 p-3 h-40 resize-none text-sm rounded-sm ${
           theme == "black" ? "bg-base-200" : "bg-base-300"
         }  ${updateDiscriptionError ? "border-1 border-red-600" : ""}`}
                  placeholder="Enter discription..."
                  onChange={(e) => {
                    SetUpdateDiscription(e.target.value);
                  }}
                  value={updateDiscription}
                  onBlur={onBlurUpdateDiscription}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  className={`btn btn-outline btn-primary rounded-sm ${
                    theme == "black"
                      ? "text-white hover:text-black hover:bg-white"
                      : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                  } shadow-sm flex items-center justify-center`}
                  onClick={() => {
                    document.getElementById("update_modal").close();
                    setUpdateDiscriptionError(false);
                    setUpdateTitleError(false);
                    setUpdateId("");
                    SetUpdateDiscription("");
                    SetUpdateTitle("");
                  }}
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
                    Cancel
                  </p>
                </button>
                <button
                  className={`btn btn-outline btn-primary rounded-sm ${
                    theme == "black"
                      ? "text-white hover:text-black hover:bg-white"
                      : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                  } shadow-sm flex items-center justify-center`}
                  onClick={() => {
                    createUpdate();
                  }}
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
                    Create
                  </p>
                </button>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button
              onClick={() => {
                setUpdateDiscriptionError(false);
                setUpdateTitleError(false);
                setUpdateId("");
                SetUpdateDiscription("");
                SetUpdateTitle("");
              }}
            >
              close
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default UserPage;
