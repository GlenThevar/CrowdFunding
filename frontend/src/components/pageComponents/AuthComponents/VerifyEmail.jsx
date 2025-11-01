import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParam] = useSearchParams();

  const emailVerification = async () => {
    const baseurl =
      import.meta.env.MODE === "development"
        ? `http://localhost:3000/auth/verifyemail?token=${searchParam.get(
            "token"
          )}`
        : `/auth/verifyemail?token=${searchParam.get("token")}`;
    try {
      const result = await axios.post(baseurl);
      if (result.status == 200) {
        toast.success("Verification successfull");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not verify");
    }
  };

  useEffect(() => {
    const token = searchParam.get("token");
    if (!token) {
      toast.error("No verification token found");
      return;
    } else {
      emailVerification();
    }
  }, [searchParam]);

  return (
    <div className="flex flex-row justify-center items-center">
      <Toaster />
    </div>
  );
};

export default VerifyEmail;
