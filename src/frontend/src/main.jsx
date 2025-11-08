import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <CompareProvider>
        <App />
      </CompareProvider>
    </CartProvider>
  </StrictMode>
);

