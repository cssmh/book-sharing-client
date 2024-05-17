import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./Root/Root.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./AuthProviders/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProviders>
          <RouterProvider router={Root} />
        </AuthProviders>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
