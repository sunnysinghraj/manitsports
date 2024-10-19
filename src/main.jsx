import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import './index.css';  // Tailwind CSS file
import App from './App';
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Toaster /> {/* Include the Toaster component */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
