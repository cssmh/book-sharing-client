import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import AuthProviders from "./AuthProviders/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";
import Root from "./PrivateRoute/Root.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={Root} />
      </AuthProviders>
    </HelmetProvider>
  </React.StrictMode>
);
