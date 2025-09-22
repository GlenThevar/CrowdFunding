import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import LandingPage from "./page/LandingPage";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Layout from "./page/Layout";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { theme } = useContext(AppContext);

  return (
    <div data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
