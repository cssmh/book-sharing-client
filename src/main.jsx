import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./Root/Root.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProviders from "./Shared/AuthProviders/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Internet from "./Components/Internet.jsx";
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
    <Internet />
    <Toaster position="bottom-center" reverseOrder={false} />
  </React.StrictMode>
);

// console.log(Object.keys(getFoods).join(","));
