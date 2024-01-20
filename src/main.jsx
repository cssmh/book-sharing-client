import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/Routes.jsx';
import AuthProviders from './providers/AuthProviders.jsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </HelmetProvider>

  </React.StrictMode>,
)
