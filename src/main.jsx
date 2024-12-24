import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import "./index.css";

import store from "@/lib/store";

import { AuthProvider } from "@/lib/SessionWrapper";
import { QueryProvider } from "./providers/query-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <QueryProvider>
          <Router basename="/" future={{ v7_startTransition: true }}>
            <App />
          </Router>
        </QueryProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
