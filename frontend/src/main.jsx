import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./main.css";
import App from "./App.jsx";
import {AuthProviderWithNavigate} from "./components/Auth/AuthProviderWithNavigate.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWithNavigate>
        <App />
      </AuthProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);
