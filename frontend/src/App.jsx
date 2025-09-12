import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Auth from "./page/Auth";
import Home from "./page/Home";
import CallbackPage from "./page/CallBack";
import NotFound from "./page/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
