import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import "./index.css";

import { GlobalProvider } from "@/lib/GlobalProvider";
import { AuthProvider } from "@/lib/SessionWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <Router basename="/" future={{ v7_startTransition: true }}>
          <App />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);
