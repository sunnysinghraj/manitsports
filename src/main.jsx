import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css"; // Tailwind CSS file
import App from "./App";
import { Toaster } from "react-hot-toast";
import EventState from "./context/EventState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <EventState>
        <Toaster /> {/* Include the Toaster component */}
        <App />
      </EventState>
    </ThemeProvider>
  </React.StrictMode>
);
