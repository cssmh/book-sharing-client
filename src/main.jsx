import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./Root/Root.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./AuthProviders/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={Root} />
      </AuthProviders>
    </HelmetProvider>
  </React.StrictMode>
);
