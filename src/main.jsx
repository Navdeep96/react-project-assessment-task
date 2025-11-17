import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SelectedProvider } from "./context/SelectedContext";
import "./styles.css";

const Root = () => (
  <SelectedProvider>
    <App />
  </SelectedProvider>
);

createRoot(document.getElementById("root")).render(<Root />);
