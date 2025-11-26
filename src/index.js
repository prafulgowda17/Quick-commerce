import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeModeProvider } from "./context/ThemeModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeModeProvider>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ThemeModeProvider>
);
