import React, { useEffect, useState } from "react";
import { Origami, Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { passwordStrength } from "check-password-strength";
import isEmail from "validator/lib/isEmail";
import toast, { Toaster } from "react-hot-toast";

import SpotlightCard from "../../reactBits/SpotLight/SpotlightCard";

const SignupAuth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("Too weak");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChecker, setShowPasswordChecker] = useState(false);
  const [passwordDeselected, setPasswordDeselected] = useState(false);
  const [emailDeselected, setEmailDeselected] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (passwordStrength(password).value == "Too weak") {
      setStrength("Too weak");
    } else if (passwordStrength(password).value == "Weak") {
      setStrength("Weak");
    } else if (passwordStrength(password).value == "Medium") {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  }, [password]);

  const submitForm = async () => {
    if (
      passwordStrength(password).value == "Too weak" ||
      !isEmail(email) ||
      username.length == 0
    ) {
      toast.error("Hmm... somethings wrong on your end");
      return;
    }

    const baseurl_1 =
      import.meta.env.MODE === "development"
        ? "http://localhost:3000/auth/checkduplicate"
        : "/auth/checkduplicate";
    try {
      const data = await axios.post(baseurl_1, {
        username,
        email,
      });

      if (data.data.length > 0) {
        toast.error("Hmm.. someone already exists with that username/email");
        return;
      }

      setLoading(true);

      const baseurl_2 =
        import.meta.env.MODE === "development"
          ? "http://localhost:3000/auth/register"
          : "/auth/register";

      const response = await axios.post(baseurl_2, {
        username,
        email,
        password,
        lastLogin: new Date(),
        accountCreated: new Date(),
      });

      setTimeout(() => {
        toast.success("Perfect..now verify & log in");
        setLoading(false);
      }, 1500);
    } catch (err) {
      if (err.status == 406) {
        toast.error("5 users limit, still in developement");
      } else {
        console.error(err);
        toast.error("Hmm.. something went wrong on our end");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full justify-center ">
      <Toaster />
      <SpotlightCard
        className="h-fit w-fit mt-10"
        spotlightColor="rgba(159, 159, 159, 0.2)"
      >
        <div className="w-[300px] sm:w-[400px] md:w-[500px] flex flex-col gap-10 h-fit">
          <div className="flex flex-col w-full items-center gap-4">
            <div className="w-full flex justify-center">
              <Origami strokeWidth={0.5} className="w-15 h-15" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="font-heading font-semibold text-2xl">Sign Up</p>
              <p className="font-heading font-light text-xs">
                Already have an account ?{" "}
                <Link to="/auth/login">
                  <span className="font-semibold hover:border-b-1 cursor-pointer">
                    Log In
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <div
              className={`flex bg-base-300 items-center rounded-md p-3 gap-3 w-full ${
                emailDeselected
                  ? isEmail(email)
                    ? ""
                    : "border-1 border-error"
                  : ""
              }`}
            >
              <Mail strokeWidth={1} />
              <input
                type="email"
                placeholder="email"
                className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
                onChange={emailChange}
                value={email}
                onBlur={() => setEmailDeselected(true)}
              />
            </div>
            <div className="flex bg-base-300 items-center rounded-md p-3 gap-3 w-full">
              <User strokeWidth={1} />
              <input
                type="text"
                placeholder="username"
                className="w-full focus:outline-0  
                   [&::-webkit-search-cancel-button]:appearance-none 
                   [&::-webkit-search-decoration]:appearance-none 
                   [&::-webkit-search-results-button]:appearance-none 
                   [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
                value={username}
                onChange={usernameChange}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div
                className={`flex bg-base-300 items-center rounded-md p-3 gap-3 w-full ${
                  passwordDeselected
                    ? strength == "Too weak"
                      ? "border-1 border-error"
                      : ""
                    : ""
                } `}
              >
                <Lock strokeWidth={1} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  onSelect={() => setShowPasswordChecker(true)}
                  className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm "
                  value={password}
                  onChange={passwordChange}
                  onBlur={() => setPasswordDeselected(true)}
                />
                {showPassword ? (
                  <EyeOff strokeWidth={1} onClick={toggleShowPassword} />
                ) : (
                  <Eye strokeWidth={1} onClick={toggleShowPassword} />
                )}
              </div>
              <div
                className={`w-full flex flex-col gap-1 ${
                  showPasswordChecker ? "" : "hidden"
                }`}
              >
                <p className="text-xs font-heading font-light">
                  passsword strength is{" "}
                  <span
                    className={`font-semibold text-red-400 ${
                      strength == "Too weak"
                        ? "text-error"
                        : strength == "Weak"
                        ? "text-error"
                        : strength == "Medium"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {strength}
                  </span>
                </p>
                <progress
                  className={`progress progress-error ${
                    strength == "Too weak"
                      ? "progress-error"
                      : strength == "Weak"
                      ? "progress-error"
                      : strength == "Medium"
                      ? "progress-warning"
                      : "progress-success"
                  } w-full`}
                  value={
                    strength == "Too weak"
                      ? "0"
                      : strength == "Weak"
                      ? "33"
                      : strength == "Medium"
                      ? "66"
                      : "100"
                  }
                  max="100"
                ></progress>
              </div>
            </div>

            <button
              onClick={submitForm}
              className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light text-xs w-full"
            >
              {loading ? <p>REGISTERING</p> : <p>SIGN UP</p>}
            </button>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default SignupAuth;
