import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./page/HomePage";
import HomeLayout from "./page/HomeLayout";
import { AppContext } from "./context/AppContext";
import CampaignPage from "./page/CampaignPage";
import CreateCampaignPage from "./page/CreateCampaignPage";
import Chat from "./page/ChatPage";
import LoginAuth from "./components/pageComponents/AuthComponents/LoginAuth";
import HomeAuth from "./components/pageComponents/AuthComponents/HomeAuth";
import AuthLayout from "./page/AuthLayout";
import SignupAuth from "./components/pageComponents/AuthComponents/SignupAuth";
import Test from "./components/pageComponents/HomeComponents/Test";
import VerifyEmail from "./components/pageComponents/AuthComponents/VerifyEmail";
import OauthScreen from "./components/pageComponents/AuthComponents/OauthScreen";
import UserPage from "./page/UserPage";
import EditCampaignPage from "./page/EditCampaignPage";

const App = () => {
  const { theme } = useContext(AppContext);

  return (
    <div data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="campaign/:id" element={<CampaignPage />} />
            <Route path="create" element={<CreateCampaignPage />} />
            <Route path="edit/:id" element={<EditCampaignPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="user/:id" element={<UserPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<HomeAuth />} />
            <Route path="login" element={<LoginAuth />} />
            <Route path="signup" element={<SignupAuth />} />
            <Route path="verify" element={<VerifyEmail />} />
            <Route path="oauthscreen" element={<OauthScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
