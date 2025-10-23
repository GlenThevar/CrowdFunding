import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Origami, MapPin, CircleX } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import CampaignComponent from "../components/pageComponents/HomeComponents/CampaignComponent";
import { AppContext } from "../context/AppContext";

const UserPage = () => {
  const { theme, userId } = useContext(AppContext);

  const [userdata, setUserData] = useState("");
  const [shortDiscription, setShortDiscription] = useState("");
  const [longDiscription, setlongDiscription] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: paramid } = useParams();

  const [usernameIncorrect, setUsernameIncorrect] = useState(false);
  const [shortIncorrect, setShortIncorrect] = useState(false);
  const [longIncorrect, setLongIncorrect] = useState(false);
  const [locationIncorrect, setLocationIncorrect] = useState(false);
  const [fileIncorrect, setFileIncorrect] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${paramid}`);
        if (res) setUserData(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    setUsername(userdata.username);
    setLocation(userdata.basedLocation);
    setShortDiscription(userdata.shortDiscription);
    setlongDiscription(userdata.longDiscription);
  }, [userdata]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleShortDiscriptionChange = (e) =>
    setShortDiscription(e.target.value);
  const handleLongDiscriptionChange = (e) => setlongDiscription(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const onBlurUsername = () => {
    if (username.length == 0) setUsernameIncorrect(true);
    else setUsernameIncorrect(false);
  };
  const onBlurShort = () => {
    if (shortDiscription.length == 0 || shortDiscription.length >= 30)
      setShortIncorrect(true);
    else setShortIncorrect(false);
  };
  const onBlurLong = () => {
    if (longDiscription.length == 0 || longDiscription.length >= 750)
      setLongIncorrect(true);
    else setLongIncorrect(false);
  };
  const onBlurLocation = () => {
    if (location.length == 0 || location.length >= 15)
      setLocationIncorrect(true);
    else setLocationIncorrect(false);
  };

  const editProfile = async () => {
    if (
      username.length == 0 ||
      location.length == 0 ||
      location.length >= 15 ||
      longDiscription.length == 0 ||
      longDiscription.length >= 750 ||
      shortDiscription.length == 0 ||
      shortDiscription.length >= 30
    ) {
      toast.error("somethings wrong on your end");
      return;
    } else if (file?.size > 1000000) {
      setFileIncorrect(true);
      toast.error("File size cannot exceed");
      setFile(null);
      e.target.value = "";
      return;
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", username);
      formData.append("shortDiscription", shortDiscription);
      formData.append("longDiscription", longDiscription);
      formData.append("basedLocation", location);

      try {
        const result = await axios.post(
          `http://localhost:3000/user/update/${paramid}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (result) {
          toast.success("Data updated");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const placeholderPhoto =
    "https://i.pinimg.com/736x/68/fe/3e/68fe3eb79513b33c207d126f89834166.jpg";

  const [campaigns] = useState([
    { id: 1, title: "Winter is Coming Fundraiser" },
    { id: 2, title: "The North Remembers Campaign" },
    { id: 3, title: "Direwolf Rescue Mission" },
    { id: 4, title: "Winterfell Rebuild" },
  ]);

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
            <div className="flex  gap-4 w-full items-center justify-center">
              <img
                src={userdata?.profileUrl || placeholderPhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white -mt-16 bg-gray-300 object-cover"
              />

              <div className="w-full flex flex-col gap-4">
                <div>
                  <h1 className="font-bold font-heading text-lg">
                    {userdata?.username}
                  </h1>
                  <p className="font-subheading text-sm w-full">
                    {userdata?.shortDiscription}
                  </p>
                </div>
                {!location ? (
                  ""
                ) : (
                  <div className="flex justify-start gap-1">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <p className="font-heading text-xs sm:text-sm">
                      {userdata?.basedLocation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full justify-start lg:w-fit lg:justify-end">
              {userId == paramid ? (
                <button
                  className={`btn btn-outline btn-primary rounded-sm ${
                    theme == "black"
                      ? "text-white hover:text-black hover:bg-white"
                      : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                  } shadow-sm flex items-center justify-center`}
                  onClick={() =>
                    document.getElementById("editprofile").showModal()
                  }
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
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
                >
                  <p className="font-heading text-xs sm:text-sm font-light">
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
                        className={`bg-base-300 p-3 rounded-sm flex  ${
                          usernameIncorrect ? "border-1 border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
                          placeholder="Enter your username"
                          value={username}
                          onChange={handleUsernameChange}
                          onBlur={onBlurUsername}
                        />
                        {usernameIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4" />
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
                        Short discription
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex  ${
                          shortIncorrect ? "border-1 border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
                          placeholder="Short discription"
                          value={shortDiscription}
                          onChange={handleShortDiscriptionChange}
                          onBlur={onBlurShort}
                        />
                        {shortIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4" />
                        )}
                      </div>
                      {shortIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            The short discription has to be within 30 characters
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Long discription
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex  ${
                          longIncorrect ? "border-1 border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
                          placeholder="Long discription"
                          value={longDiscription}
                          onChange={handleLongDiscriptionChange}
                          onBlur={onBlurLong}
                        />
                        {longIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4" />
                        )}
                      </div>
                      {longIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            The long discription has to be within 30 characters
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Pick a file</legend>
                        <input
                          type="file"
                          className="file-input focus:border-0 focus:outline-0 "
                          onChange={handleFileChange}
                        />
                        <label
                          className={`label ${
                            fileIncorrect ? "text-red-700" : ""
                          }`}
                        >
                          Max size 2MB
                        </label>
                      </fieldset>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading font-semibold text-sm">
                        Location
                      </p>
                      <div
                        className={`bg-base-300 p-3 rounded-sm flex  ${
                          locationIncorrect ? "border-1 border-red-600" : ""
                        } `}
                      >
                        <input
                          type="text"
                          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none text-xs md:text-sm"
                          placeholder="Location"
                          value={location}
                          onChange={handleLocationChange}
                          onBlur={onBlurLocation}
                        />
                        {locationIncorrect && (
                          <CircleX className="text-red-500 animate-bounce w-4 h-4" />
                        )}
                      </div>
                      {locationIncorrect && (
                        <div>
                          <p className="label font-heading text-xs text-red-700">
                            Location has to be within 15 chars
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      className={`btn btn-outline btn-primary rounded-sm ${
                        theme == "black"
                          ? "text-white hover:text-black hover:bg-white"
                          : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                      } shadow-sm flex items-center justify-center`}
                      onClick={editProfile}
                    >
                      {loading ? (
                        <span className="loading loading-infinity loading-xl"></span>
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
          <h2 className="text-lg font-bold mb-4 font-heading">My Campaigns</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex flex-col ">
                <CampaignComponent />

                <div className="flex gap-2 mt-3 justify-center">
                  <button
                    className={`btn btn-outline btn-primary rounded-sm ${
                      theme == "black"
                        ? "text-white hover:text-black hover:bg-white"
                        : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                    } shadow-sm flex items-center justify-center`}
                  >
                    <p className="font-heading text-xs sm:text-sm font-light">
                      Edit
                    </p>
                  </button>
                  <button
                    className={`btn btn-outline btn-primary rounded-sm ${
                      theme == "black"
                        ? "text-white hover:text-black hover:bg-white"
                        : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                    } shadow-sm flex items-center justify-center`}
                  >
                    <p className="font-heading text-xs sm:text-sm font-light">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
