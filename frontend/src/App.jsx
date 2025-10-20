import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import LandingPage from "./page/AuthPage";
import Home from "./page/HomePage";
import Layout from "./page/Layout";
import { AppContext } from "./context/AppContext";
import CampaignPage from "./page/CampaignPage";
import CreateCampaignPage from "./page/CreateCampaignPage";
import Chat from "./page/ChatPage";

const App = () => {
  const { theme } = useContext(AppContext);

  return (
    <div data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="campaign" element={<CampaignPage />} />
            <Route path="create" element={<CreateCampaignPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:username" element={<Chat />} />
          </Route>
          <Route path="/auth" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
