import React from "react";

import SignLogInButtons from "../components/Buttons/buttons/SignLogInButtons";

const Home = () => {

  console.log( import.meta.env.VITE_FRONTEND_URL);
  return (
    <div>
      <SignLogInButtons />
    </div>
  );
};

export default Home;
