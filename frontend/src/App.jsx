import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import LandingPage from "./page/LandingPage";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LandingPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
