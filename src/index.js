import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
