import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter } from "react-router-dom";
import SearchResultsProvider from "./ReactContext/SearchResults";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="963875929242-9d1huuplkv85lqkobvu12cha45fl9p13.apps.googleusercontent.com">
      <BrowserRouter>
        <SearchResultsProvider>
          <App />
        </SearchResultsProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
