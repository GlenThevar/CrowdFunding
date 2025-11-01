import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Origami,
  Menu,
  CirclePlus,
  MessageCircle,
  LogOut,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import ThemeController from "./ThemeController";
import SearchNav from "./SearchNav";
import Slider from "./Slider";
import { AppContext } from "../../../context/AppContext";

import axios from "axios";
import placeholderPhoto from "../../../data/images/placeholderPhoto.jpg";

const NavbarHome = () => {
  const navigate = useNavigate();
  const { theme, userId, SetSearchingByTags, setTagsToSearch } =
    useContext(AppContext);
  const [userprofile, setUserProfile] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth", {
      replace: true,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserProfile(userRes.data.profileUrl);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) getData();
  }, [userId]);

  return (
    <div
      className={`${
        theme == "black" ? "border-b-2" : "border-b-1"
      } border-base-300 shadow-sm`}
    >
      <div className="flex flex-wrap justify-between py-3 px-3">
        <Link
          to="/"
          onClick={() => {
            setTagsToSearch("");
            SetSearchingByTags(false);
          }}
        >
          <div className="flex justify-center items-center gap-2 order-1">
            <Origami strokeWidth={1} className="w-9 h-9 sm:w-12 sm:h-12" />
            <p className="font-logo text-2xl sm:text-3xl font-black">FUND IT</p>
          </div>
        </Link>

        <div className="w-full md:w-[40vw] lg:w-[50vw] mt-5 md:mt-0 order-3 md:order-2">
          <SearchNav />
        </div>
        <div className="flex justify-center gap-4 order-2 md:order-3 items-center">
          <ThemeController />
          <div className="cursor-pointer dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0}>
              <Menu className="w-9 h-9 sm:w-12 sm:h-12" />
            </div>
            <ul
              tabIndex={0}
              className={`dropdown-content menu rounded-lg z-1 mt-2 w-40 lg:w-52 p-2 shadow-sm ${
                theme == "black" ? "bg-base-300" : "bg-base-100"
              }`}
            >
              <li>
                <Link to="/create">
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <CirclePlus />
                    <p className="font-heading">Create</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/chat">
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <MessageCircle />
                    <p className="font-heading">Chat</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`cursor-pointer dropdown dropdown-bottom dropdown-end`}
          >
            <div
              className="w-9 sm:w-12 rounded-full hover:border-2 cursor-pointer"
              tabIndex={1}
            >
              <img
                src={userprofile || placeholderPhoto}
                className={`rounded-full`}
              />
            </div>
            <ul
              tabIndex={1}
              className={`dropdown-content menu rounded-lg z-1 mt-2 w-40 lg:w-52 p-2 shadow-sm ${
                theme == "black" ? "bg-base-300" : "bg-base-100"
              }`}
            >
              <li>
                <Link to={`/profile/${userId}`}>
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <User />
                    <p className="font-heading">Profile</p>
                  </div>
                </Link>
              </li>
              <li>
                <button onClick={logout}>
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <LogOut />
                    <p className="font-heading">Logout</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Slider />
      </div>
    </div>
  );
};

export default NavbarHome;
