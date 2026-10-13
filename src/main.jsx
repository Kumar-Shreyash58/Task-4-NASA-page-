import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ImageProvider } from "./context/ImageContext";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <App />
      </ImageProvider>
    </BrowserRouter>
  </StrictMode>
);
