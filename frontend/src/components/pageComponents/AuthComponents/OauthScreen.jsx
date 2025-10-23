import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const OauthScreen = () => {
  const [loading, setLoading] = useState(false);

  const returnCookie = async () => {
    const data = await axios.get("http://localhost:3000/auth/returncookie");
  };

  useEffect(() => {
    returnCookie();
  }, []);

  return (
    <div className="flex flex-col h-[75vh] items-center justify-center">
      <span className="loading loading-infinity h-20 w-20"></span>
      <p className="font-heading">Wait a minute till it loads</p>
    </div>
  );
};

export default OauthScreen;
