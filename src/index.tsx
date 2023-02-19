import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router/Router";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LOCALES from "./locales";

i18next.use(initReactI18next).init({
  resources: LOCALES,
  lng: "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
