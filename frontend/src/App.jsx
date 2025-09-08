import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Auth from "./page/Auth";
import Home from "./page/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <div></div>
        </Routes>
      </Router>
    </>
  );
};

export default App;
