import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { SignupButton } from "./SignupButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

const SignLogInButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          <SignupButton/>
          <br />
          <LoginButton/>
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton/>
        </>
      )}
    </div>
  );
};

export default SignLogInButtons;
